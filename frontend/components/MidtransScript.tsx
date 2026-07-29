'use client';

import Script from 'next/script';
import { useMidtransStore } from '@/stores/midtransStore';
import { useEffect } from 'react';
import { getPaymentConfig } from '@/lib/api/shipping';

export function MidtransScript() {
  const { setConfig, setLoaded, clientKey, snapUrl } = useMidtransStore();

  useEffect(() => {
    // Fetch Midtrans config from our backend
    getPaymentConfig().then((res: any) => {
      if (res.snap_url && res.client_key) {
        setConfig(res.client_key, res.snap_url);
      }
    }).catch(console.error);
  }, [setConfig]);

  if (!clientKey || !snapUrl) {
    return null;
  }

  return (
    <Script
      id="midtrans-snap"
      src={snapUrl}
      data-client-key={clientKey}
      strategy="afterInteractive"
      onLoad={() => {
        setLoaded(true);
      }}
      onError={() => {
        console.error('Failed to load Midtrans Snap script');
      }}
    />
  );
}
