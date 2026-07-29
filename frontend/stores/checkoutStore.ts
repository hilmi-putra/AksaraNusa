import { create } from 'zustand';

export interface CourierOption {
  courier: string;
  courier_name: string;
  service: string;
  description: string;
  cost: number;
  etd: string;
}

interface CheckoutStore {
  currentStep: 1 | 2 | 3;
  setStep: (step: 1 | 2 | 3) => void;
  nextStep: () => void;
  prevStep: () => void;

  shippingMethod: 'delivery' | 'pickup';
  setShippingMethod: (method: 'delivery' | 'pickup') => void;
  
  selectedCourier: CourierOption | null;
  setSelectedCourier: (courier: CourierOption | null) => void;
  
  isInsuranceSelected: boolean;
  setInsuranceSelected: (selected: boolean) => void;
  
  insuranceCost: number;
  setInsuranceCost: (cost: number) => void;

  paymentMethod: string;
  setPaymentMethod: (method: string) => void;

  snapToken: string | null;
  setSnapToken: (token: string | null) => void;

  orderId: number | null;
  setOrderId: (id: number | null) => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  currentStep: 1,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) as 1 | 2 | 3 })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) as 1 | 2 | 3 })),

  shippingMethod: 'delivery',
  setShippingMethod: (method) => set({ shippingMethod: method, selectedCourier: null, isInsuranceSelected: false }),
  
  selectedCourier: null,
  setSelectedCourier: (courier) => set({ selectedCourier: courier }),
  
  isInsuranceSelected: false,
  setInsuranceSelected: (selected) => set({ isInsuranceSelected: selected }),
  
  insuranceCost: 0,
  setInsuranceCost: (cost) => set({ insuranceCost: cost }),

  paymentMethod: 'credit_card',
  setPaymentMethod: (method) => set({ paymentMethod: method }),

  snapToken: null,
  setSnapToken: (token) => set({ snapToken: token }),

  orderId: null,
  setOrderId: (id) => set({ orderId: id }),
}));
