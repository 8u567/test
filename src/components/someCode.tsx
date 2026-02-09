'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PublicKey } from '@solana/web3.js';

export default function ReferralHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const addy = searchParams.get('referral');
    if (!addy) return;

    try {
      const address = new PublicKey(addy);
      sessionStorage.setItem('code', address.toBase58());
    } catch (err) {
      console.warn('Invalid referral address', addy);
    }
  }, [searchParams]);

  return null; 
}
