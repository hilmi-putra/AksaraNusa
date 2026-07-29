import React, { useEffect, useRef } from "react";
import { X, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export interface SavedAddress {
  id: string;
  label: string;
  isPrimary: boolean;
  recipientName: string;
  phone: string;
  fullAddress: string;
  provinceCode: string;
  provinceName: string;
  regencyCode: string;
  regencyName: string;
  districtCode: string;
  districtName: string;
  villageCode: string;
  villageName: string;
  postalCode: string;
  notes?: string;
}

interface SavedAddressesModalProps {
  isOpen: boolean;
  onClose: () => void;
  addresses: SavedAddress[];
  onSelect: (address: SavedAddress) => void;
  onAddNew: () => void;
}

export function SavedAddressesModal({
  isOpen,
  onClose,
  addresses,
  onSelect,
  onAddNew
}: SavedAddressesModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: "flex" });
      gsap.to(modalRef.current, { x: 0, duration: 0.4, ease: "power3.out" });
    } else {
      document.body.style.overflow = "";
      gsap.to(modalRef.current, { x: "100%", duration: 0.3, ease: "power3.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: "none", delay: 0.1 });
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm hidden justify-end"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col translate-x-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#171512] uppercase tracking-wider">Saved Addresses</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-[#171512]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-gray-50/50">
          {addresses.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No saved addresses found.</p>
            </div>
          ) : (
            addresses.map((addr) => (
              <div 
                key={addr.id}
                onClick={() => onSelect(addr)}
                className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:border-[#DB8B00] hover:shadow-md transition-all group"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#171512] uppercase tracking-wide">{addr.label}</span>
                    {addr.isPrimary && (
                      <span className="bg-[#DB8B00]/10 text-[#DB8B00] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Primary
                      </span>
                    )}
                  </div>
                  <div className="w-4 h-4 rounded-full border border-gray-300 group-hover:border-[#DB8B00] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#DB8B00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                <p className="font-semibold text-[#171512] text-sm mb-1">{addr.recipientName}</p>
                <p className="text-sm text-gray-600 mb-2">{addr.phone}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {addr.fullAddress}<br/>
                  {addr.villageName && `${addr.villageName}, `}{addr.districtName && `${addr.districtName}, `}{addr.regencyName}<br/>
                  {addr.provinceName} {addr.postalCode ? `, ${addr.postalCode}` : ''}
                </p>
                {addr.notes && (
                  <p className="text-xs text-gray-400 mt-2 italic">Note: {addr.notes}</p>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-100 bg-white">
          <Button 
            onClick={onAddNew} 
            className="w-full bg-[#171512] hover:bg-black text-white h-12 rounded-none font-bold tracking-widest uppercase text-xs transition-colors"
          >
            Add New Address
          </Button>
        </div>
      </div>
    </div>
  );
}
