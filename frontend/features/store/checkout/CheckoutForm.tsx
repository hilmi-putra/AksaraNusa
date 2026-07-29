"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { USER_COOKIE } from "@/lib/api";
import { getAddresses, createAddress } from "@/lib/api/user";
import { toast } from "sonner";
import { formatRupiah } from "@/lib/utils";
import { SavedAddressesModal, SavedAddress } from "@/components/organisms/SavedAddressesModal";
import { AddAddressModal } from "@/components/organisms/AddAddressModal";
import { SearchableSelect } from "@/components/ui/SearchableSelect";
import { useCheckoutStore, CourierOption } from "@/stores/checkoutStore";
import { Package, Clock, Store } from "lucide-react";

export function CheckoutForm() {
  // Shipping Store
  const { 
    shippingMethod, 
    setShippingMethod, 
    selectedCourier, 
    setSelectedCourier,
    isInsuranceSelected,
    setInsuranceSelected,
    insuranceCost,
    nextStep
  } = useCheckoutStore();

  // Shipping Form State
  const [shippingForm, setShippingForm] = useState({
    province_code: "",
    province_name: "",
    regency_code: "",
    regency_name: "",
    district_code: "",
    district_name: "",
    village_code: "",
    village_name: "",
    address: "",
    zip: ""
  });

  // Modal & Address State
  const [user, setUser] = useState<any>(null);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Dynamic Shipping Data
  const [provinces, setProvinces] = useState<any[]>([]);
  const [regencies, setRegencies] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);
  const [couriers, setCouriers] = useState<CourierOption[]>([]);
  const [loadingRates, setLoadingRates] = useState(false);

  useEffect(() => {
    const userStr = Cookies.get(USER_COOKIE);
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {}
    }

    import("@/lib/api/wilayah").then(({ getProvinces }) => {
        getProvinces().then((res) => {
            setProvinces(res || []);
        }).catch(console.error);
    });

    const fetchAddr = async () => {
      try {
        const res = await getAddresses();
        const mapped: SavedAddress[] = (res || []).map((a: any) => ({
          id: a.id.toString(),
          label: a.label,
          isPrimary: !!a.is_primary,
          recipientName: a.recipient_name,
          phone: a.phone,
          fullAddress: a.address,
          province: a.province_code,
          provinceName: a.province_name,
          regencyCode: a.regency_code,
          regencyName: a.regency_name,
          districtCode: a.district_code || "",
          districtName: a.district_name || "",
          villageCode: a.village_code || "",
          villageName: a.village_name || "",
          postalCode: a.postal_code,
          notes: a.notes || "",
        }));
        setSavedAddresses(mapped);
        
        const primary = mapped.find(a => a.isPrimary) || mapped[0];
        if (primary) {
          handleAddressSelect(primary);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAddr();
  }, []);

  // Fetch Regencies when province changes
  useEffect(() => {
    if (shippingForm.province_code) {
        import("@/lib/api/wilayah").then(({ getRegencies }) => {
            getRegencies(shippingForm.province_code).then((res) => {
                setRegencies(res || []);
            }).catch(console.error);
        });
    } else {
        setRegencies([]);
    }
  }, [shippingForm.province_code]);

  useEffect(() => {
    if (shippingForm.regency_code) {
        import("@/lib/api/wilayah").then(({ getDistricts }) => {
            getDistricts(shippingForm.regency_code).then((res) => {
                setDistricts(res || []);
            }).catch(console.error);
        });
    } else {
        setDistricts([]);
    }
  }, [shippingForm.regency_code]);

  useEffect(() => {
    if (shippingForm.district_code) {
        import("@/lib/api/wilayah").then(({ getVillages }) => {
            getVillages(shippingForm.district_code).then((res) => {
                setVillages(res || []);
            }).catch(console.error);
        });
    } else {
        setVillages([]);
    }
  }, [shippingForm.district_code]);

  // Fetch shipping rates when village changes
  useEffect(() => {
    if (shippingForm.village_code && shippingMethod === 'delivery') {
        setLoadingRates(true);
        const destinationInfo = {
            province_name: shippingForm.province_name,
            regency_name: shippingForm.regency_name,
            district_name: shippingForm.district_name,
            village_code: shippingForm.village_code,
            village_name: shippingForm.village_name
        };
        import("@/lib/api/shipping").then(({ getShippingCost }) => {
            getShippingCost(destinationInfo, 1500).then((res) => {
                setCouriers(res || []);
                setSelectedCourier(null);
            }).catch(console.error)
            .finally(() => setLoadingRates(false));
        });
    } else {
        setCouriers([]);
        setSelectedCourier(null);
    }
  }, [shippingForm.village_code, shippingForm.province_name, shippingForm.regency_name, shippingForm.district_name, shippingForm.village_name, shippingMethod, setSelectedCourier]);

  const handleAddressSelect = (addr: SavedAddress) => {
    setSelectedAddressId(Number(addr.id));
    setShippingForm({
      province_code: addr.provinceCode,
      province_name: addr.provinceName,
      regency_code: addr.regencyCode,
      regency_name: addr.regencyName,
      district_code: addr.districtCode,
      district_name: addr.districtName,
      village_code: addr.villageCode,
      village_name: addr.villageName,
      address: addr.fullAddress,
      zip: addr.postalCode
    });
    // Set this address id to a store if we need it in step 2. We can save it in localStorage or Zustand.
    if (typeof window !== 'undefined') {
        localStorage.setItem('checkout_address_id', addr.id.toString());
    }
    setIsSavedModalOpen(false);
  };

  const handleAddNewAddress = async (payload: any) => {
    try {
      const res = await createAddress(payload);
      
      const newAddr: SavedAddress = {
        id: res.address.id.toString(),
        label: res.address.label,
        isPrimary: res.address.is_primary,
        recipientName: res.address.recipient_name,
        phone: res.address.phone,
        fullAddress: res.address.address,
        provinceCode: res.address.province_code,
        provinceName: res.address.province_name,
        regencyCode: res.address.regency_code,
        regencyName: res.address.regency_name,
        districtCode: res.address.district_code,
        districtName: res.address.district_name,
        villageCode: res.address.village_code,
        villageName: res.address.village_name,
        postalCode: res.address.postal_code,
      };

      setSavedAddresses(prev => [newAddr, ...prev]);
      setIsAddModalOpen(false);
      handleAddressSelect(newAddr);
      toast.success("Alamat berhasil ditambahkan!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Gagal menambahkan alamat");
    }
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type !== 'checkbox') {
      setShippingForm(prev => ({ ...prev, [name]: value }));
    }
  };
    
  const handleSelectChange = (value: string, type: 'province' | 'regency' | 'district' | 'village', nameLabel: string) => {
    setShippingForm(prev => {
       let newData = { ...prev };
       if (type === 'province') {
           newData.province_code = value;
           newData.province_name = nameLabel;
           newData.regency_code = ''; newData.regency_name = '';
           newData.district_code = ''; newData.district_name = '';
           newData.village_code = ''; newData.village_name = '';
       }
       if (type === 'regency') {
           newData.regency_code = value;
           newData.regency_name = nameLabel;
           newData.district_code = ''; newData.district_name = '';
           newData.village_code = ''; newData.village_name = '';
       }
       if (type === 'district') {
           newData.district_code = value;
           newData.district_name = nameLabel;
           newData.village_code = ''; newData.village_name = '';
       }
       if (type === 'village') {
           newData.village_code = value;
           newData.village_name = nameLabel;
       }
       return newData;
    });
  };

  const handleContinue = () => {
    if (shippingMethod === 'delivery' && (!selectedCourier || !shippingForm.village_code)) {
        alert("Pilih alamat sampai tingkat Kelurahan (Sub-district) dan kurir pengiriman terlebih dahulu.");
        return;
    }
    nextStep();
  };

  return (
    <div className="flex flex-col pr-0 lg:pr-10 border-r-0 lg:border-r border-gray-200 min-h-[50vh]">
      
      {/* 1. Information */}
      <section className="mb-12">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-light text-[#171512]">Information</h2>
          {!user && (
            <span className="text-xs text-gray-500">
              Already have an account? <Link href="/login" className="text-black underline font-medium">Log in</Link>
            </span>
          )}
        </div>
        
        <h3 className="text-sm font-semibold mb-6 text-[#171512]">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
          <input type="text" value={user?.name?.split(' ')[0] || ''} readOnly placeholder="First name" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
          <input type="text" value={user?.name?.split(' ').slice(1).join(' ') || ''} readOnly placeholder="Last name" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
          <input type="tel" value={user?.phone || ''} readOnly placeholder="Phone number" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
          <input type="email" value={user?.email || ''} readOnly placeholder="Email" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors" />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-semibold text-[#171512]">Shipping Information</h3>
          <button 
            type="button" 
            onClick={() => setIsSavedModalOpen(true)}
            className="text-xs font-bold text-gradient-primary hover:text-[#b06f00] hover:underline uppercase tracking-wide transition-colors"
          >
            Use Saved Address
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-6">
          <div className="md:col-span-1 border-b border-gray-300 pb-2">
              <SearchableSelect 
                options={provinces.map(p => ({ value: p.code, label: p.name }))}
                value={shippingForm.province_code}
                onChange={() => {}}
                disabled={true}
                placeholder="Select Province"
              />
          </div>

          <div className="md:col-span-1 border-b border-gray-300 pb-2">
              <SearchableSelect 
                options={regencies.map(r => ({ value: r.code, label: r.name }))}
                value={shippingForm.regency_code}
                onChange={() => {}}
                disabled={true}
                placeholder="Select City/Regency"
              />
          </div>

          <div className="md:col-span-1 border-b border-gray-300 pb-2">
              <SearchableSelect 
                options={districts.map(d => ({ value: d.code, label: d.name }))}
                value={shippingForm.district_code}
                onChange={() => {}}
                disabled={true}
                placeholder="Select District"
              />
          </div>

          <div className="md:col-span-1 border-b border-gray-300 pb-2">
              <SearchableSelect 
                options={villages.map(v => ({ value: v.code, label: v.name }))}
                value={shippingForm.village_code}
                onChange={() => {}}
                disabled={true}
                placeholder="Select Village"
              />
          </div>

          <input type="text" name="zip" value={shippingForm.zip} onChange={() => {}} disabled={true} placeholder="Zip / Postal code" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors md:col-span-2 cursor-not-allowed opacity-70" />
          <input type="text" name="address" value={shippingForm.address} onChange={() => {}} disabled={true} placeholder="Full Address" className="w-full bg-transparent border-b border-gray-300 pb-2 text-sm focus:outline-none focus:border-black transition-colors md:col-span-2 cursor-not-allowed opacity-70" />
        </div>
      </section>

      {/* 2. Shipping Services */}
      <section className="mb-12 border-t border-gray-300 pt-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#171512] flex items-center uppercase">
            <Package className="w-5 h-5 mr-3" strokeWidth={2.5} />
            Shipping Services
          </h2>
          
          <div className="flex border border-gray-300 rounded-md overflow-hidden bg-white">
            <button 
              type="button"
              className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors ${shippingMethod === 'delivery' ? 'bg-[#171512] text-white border-2 border-[#171512]' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => setShippingMethod('delivery')}
            >
              Delivery
            </button>
            <button 
              type="button"
              className={`px-4 py-2 text-sm font-semibold flex items-center gap-2 transition-colors ${shippingMethod === 'pickup' ? 'bg-[#171512] text-white border-2 border-[#171512]' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => setShippingMethod('pickup')}
            >
              Pickup at Store
            </button>
          </div>
        </div>

        {shippingMethod === 'delivery' ? (
          <div className="flex flex-col gap-6">
            {!shippingForm.village_code ? (
                <div className="p-4 text-center border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm">
                    Please select your address up to Village (Kelurahan) level to see available shipping methods.
                </div>
            ) : loadingRates ? (
                <div className="flex justify-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : couriers.length === 0 ? (
                <div className="p-4 text-center border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm">
                    No shipping methods found.
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                {couriers.map((courier, idx) => (
                    <label 
                    key={idx}
                    className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedCourier?.courier === courier.courier && selectedCourier?.service === courier.service 
                        ? 'border-[#171512] ring-1 ring-[#171512] bg-gray-50/50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    >
                    <input 
                        type="radio" 
                        name="courier" 
                        value={`${courier.courier}-${courier.service}`} 
                        checked={selectedCourier?.courier === courier.courier && selectedCourier?.service === courier.service}
                        onChange={() => setSelectedCourier(courier)}
                        className="w-4 h-4 accent-black" 
                    />
                    <div className="flex-1 flex justify-between items-center">
                        <div className="flex flex-col">
                        <span className="font-bold text-sm text-[#171512] uppercase">{courier.courier_name} - {courier.service}</span>
                        <span className="text-xs text-gray-500">{courier.description} ({courier.etd} Hari)</span>
                        </div>
                        <span className="font-semibold text-[#171512]">
                        {courier.cost === 0 ? "Free" : formatRupiah(courier.cost)}
                        </span>
                    </div>
                    </label>
                ))}
                </div>
            )}

            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider text-center mt-2 mb-2">
              Shipping fee is calculated based on total weight and destination
            </p>

            <div className="border-t border-gray-200 pt-6">
              <label className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${isInsuranceSelected ? 'border-[#171512] ring-1 ring-[#171512] bg-gray-50/50' : 'border-gray-300 hover:border-gray-400'}`}>
                <input 
                  type="checkbox" 
                  checked={isInsuranceSelected}
                  onChange={(e) => setInsuranceSelected(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-black rounded-sm" 
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-[#171512] uppercase">Tambah Asuransi Pengiriman (Rekomendasi)</span>
                    <span className="font-semibold text-gradient-primary">{formatRupiah(insuranceCost)}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Melindungi pesanan Anda 100% dari potensi kerusakan atau kehilangan yang disebabkan oleh kelalaian kurir saat pengiriman. Karena produk yang Anda beli bernilai tinggi, kami sangat menyarankan untuk menyertakan asuransi ini.
                  </p>
                </div>
              </label>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="p-6 border border-[#171512] rounded-lg bg-gray-50/50">
              <div className="flex items-start gap-4">
                <Store className="w-6 h-6 mt-1 text-[#171512]" />
                <div>
                  <h4 className="font-bold text-[#171512] uppercase text-sm mb-2">aksaranusa Flagship Store</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Jl. Gatot Subroto No. 289, Cibangkong, Batununggal<br />
                    Bandung, Jawa Barat 40273
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gradient-primary font-semibold">
                    <Clock className="w-4 h-4" />
                    Buka Hari Ini: 09:00 - 21:00
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic text-center">
              Anda akan menerima email konfirmasi ketika pesanan siap diambil.
            </p>
          </div>
        )}
      </section>

      {/* Button Continue */}
      <button 
        type="button" 
        onClick={handleContinue}
        disabled={shippingMethod === 'delivery' && (!selectedCourier || !shippingForm.village_code)}
        className="w-full bg-[#171512] text-white py-5 font-bold uppercase tracking-wider text-sm hover:bg-[#333] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Payment
      </button>

      {/* Modals */}
      <SavedAddressesModal 
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        addresses={savedAddresses}
        onSelect={handleAddressSelect}
        onAddNew={() => {
          setIsSavedModalOpen(false);
          setIsAddModalOpen(true);
        }}
      />

      <AddAddressModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddNewAddress}
      />
    </div>
  );
}
