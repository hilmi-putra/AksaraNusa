import { create } from 'zustand';

interface MidtransState {
  isLoaded: boolean;
  clientKey: string;
  snapUrl: string;
  setLoaded: (loaded: boolean) => void;
  setConfig: (clientKey: string, snapUrl: string) => void;
}

export const useMidtransStore = create<MidtransState>((set) => ({
  isLoaded: false,
  clientKey: '',
  snapUrl: '',
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setConfig: (clientKey, snapUrl) => set({ clientKey, snapUrl }),
}));
