import React, { useEffect, useRef, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { SavedAddress } from "./SavedAddressesModal";
import { SearchableSelect } from "@/components/ui/SearchableSelect";

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  onSave: (address: any) => Promise<void> | void;
}

export function AddAddressModal({
  isOpen,
  onClose,
  onBack,
  onSave
}: AddAddressModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    label: "",
    recipientName: "",
    phone: "",
    fullAddress: "",
    provinceCode: "",
    provinceName: "",
    regencyCode: "",
    regencyName: "",
    districtCode: "",
    districtName: "",
    villageCode: "",
    villageName: "",
    postalCode: "",
    notes: "",
    isPrimary: false
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [regencies, setRegencies] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);

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

  useEffect(() => {
    import("@/lib/api/wilayah").then(({ getProvinces }) => {
      getProvinces().then((res) => {
        setProvinces(res || []);
      }).catch(console.error);
    });
  }, []);

  useEffect(() => {
    if (formData.provinceCode) {
      import("@/lib/api/wilayah").then(({ getRegencies }) => {
        getRegencies(formData.provinceCode).then((res) => {
          setRegencies(res || []);
        }).catch(console.error);
      });
    } else {
      setRegencies([]);
    }
  }, [formData.provinceCode]);

  useEffect(() => {
    if (formData.regencyCode) {
      import("@/lib/api/wilayah").then(({ getDistricts }) => {
        getDistricts(formData.regencyCode).then((res) => {
          setDistricts(res || []);
        }).catch(console.error);
      });
    } else {
      setDistricts([]);
    }
  }, [formData.regencyCode]);

  useEffect(() => {
    if (formData.districtCode) {
      import("@/lib/api/wilayah").then(({ getVillages }) => {
        getVillages(formData.districtCode).then((res) => {
          setVillages(res || []);
        }).catch(console.error);
      });
    } else {
      setVillages([]);
    }
  }, [formData.districtCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        label: formData.label,
        recipient_name: formData.recipientName,
        phone: formData.phone,
        address: formData.fullAddress,
        province_code: formData.provinceCode,
        province_name: formData.provinceName,
        regency_code: formData.regencyCode,
        regency_name: formData.regencyName,
        district_code: formData.districtCode,
        district_name: formData.districtName,
        village_code: formData.villageCode,
        village_name: formData.villageName,
        postal_code: formData.postalCode,
        notes: formData.notes,
        is_primary: formData.isPrimary,
      };
      
      await onSave(payload);

      // Reset form on success
    setFormData({
      label: "",
      recipientName: "",
      phone: "",
      fullAddress: "",
      provinceCode: "",
      provinceName: "",
      regencyCode: "",
      regencyName: "",
      districtCode: "",
      districtName: "",
      villageCode: "",
      villageName: "",
      postalCode: "",
      notes: "",
      isPrimary: false
    });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm hidden justify-end"
      onClick={onClose}
    >
      <div 
        ref={modalRef}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col translate-x-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex justify-between items-center mb-4">
            {onBack ? (
              <button onClick={onBack} className="flex items-center text-sm font-bold text-[#DB8B00] hover:text-[#b06f00] uppercase tracking-wide">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Addresses
              </button>
            ) : (
              <div />
            )}
            <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors bg-white">
              <X className="w-5 h-5 text-[#171512]" />
            </button>
          </div>
          <h2 className="text-2xl font-black text-[#171512] uppercase tracking-tighter">Add New Address</h2>
          <p className="text-sm text-gray-500 mt-1">Fill in the details below to add a new delivery address</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="add-address-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Label <span className="text-red-500">*</span></label>
              <select name="label" required value={formData.label || ""} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-[#DB8B00] bg-white">
                <option value="" disabled>Select Address Type</option>
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Recipient Name <span className="text-red-500">*</span></label>
              <input type="text" name="recipientName" required value={formData.recipientName} onChange={handleChange} placeholder="Full name of the recipient" className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-[#DB8B00]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+62 812 3456 7890" className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-[#DB8B00]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Full Address <span className="text-red-500">*</span></label>
              <textarea name="fullAddress" required value={formData.fullAddress} onChange={handleChange} placeholder="Street address, building name, etc." rows={3} className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-[#DB8B00] resize-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Province <span className="text-red-500">*</span></label>
                <SearchableSelect 
                  options={provinces.map(p => ({ value: p.code, label: p.name }))}
                  value={formData.provinceCode}
                  onChange={(val) => {
                    const selected = provinces.find(p => p.code === val);
                    setFormData(prev => ({
                      ...prev,
                      provinceCode: val, provinceName: selected?.name || '',
                      regencyCode: '', regencyName: '',
                      districtCode: '', districtName: '',
                      villageCode: '', villageName: ''
                    }));
                  }}
                  placeholder="Select Province"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">City/Regency <span className="text-red-500">*</span></label>
                <SearchableSelect 
                  options={regencies.map(r => ({ value: r.code, label: r.name }))}
                  value={formData.regencyCode}
                  onChange={(val) => {
                    const selected = regencies.find(r => r.code === val);
                    setFormData(prev => ({
                      ...prev,
                      regencyCode: val, regencyName: selected?.name || '',
                      districtCode: '', districtName: '',
                      villageCode: '', villageName: ''
                    }));
                  }}
                  placeholder="Select City"
                  disabled={!formData.provinceCode}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">District <span className="text-red-500">*</span></label>
                <SearchableSelect 
                  options={districts.map(d => ({ value: d.code, label: d.name }))}
                  value={formData.districtCode}
                  onChange={(val) => {
                    const selected = districts.find(d => d.code === val);
                    setFormData(prev => ({
                      ...prev,
                      districtCode: val, districtName: selected?.name || '',
                      villageCode: '', villageName: ''
                    }));
                  }}
                  placeholder="Select District"
                  disabled={!formData.regencyCode}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Village / Sub-district</label>
                <SearchableSelect 
                  options={villages.map(v => ({ value: v.code, label: v.name }))}
                  value={formData.villageCode}
                  onChange={(val) => {
                    const selected = villages.find(v => v.code === val);
                    setFormData(prev => ({
                      ...prev,
                      villageCode: val, villageName: selected?.name || ''
                    }));
                  }}
                  placeholder="Select Village"
                  disabled={!formData.districtCode}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Postal Code <span className="text-red-500">*</span></label>
                <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange} placeholder="40123" className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-[#DB8B00]" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-[#171512] uppercase tracking-wider">Additional Notes</label>
                <input type="text" name="notes" value={formData.notes} onChange={handleChange} placeholder="e.g. Near red gate" className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:border-[#DB8B00]" />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer mt-2">
              <input type="checkbox" name="isPrimary" checked={formData.isPrimary} onChange={handleChange} className="w-4 h-4 accent-black rounded" />
              <span className="text-sm text-gray-600">Set as primary address for future deliveries</span>
            </label>

          </form>
        </div>

        <div className="p-6 border-t border-gray-100 bg-white grid grid-cols-2 gap-4">
          <Button 
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full h-12 rounded-none font-bold tracking-widest uppercase text-xs border-gray-300 text-[#171512] hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#171512] text-white h-12 rounded-none font-bold tracking-widest uppercase text-xs transition-colors hover:bg-[#333]"
          >
            {isSubmitting ? "MENYIMPAN..." : "SAVE ADDRESS"}
          </Button>
        </div>
      </div>
    </div>
  );
}
