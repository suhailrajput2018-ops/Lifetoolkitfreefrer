'use client';

import { useEffect, useState } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'leaderboard' | 'skyscraper';
  layout?: 'in-article' | 'in-feed' | 'fixed';
  className?: string;
}

export function AdUnit({ slot, format = 'auto', layout = 'fixed', className = '' }: AdUnitProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Mark ad as loaded for styling purposes
    setLoaded(true);
    
    // Push ads to Google AdSense queue when available
    if (typeof window !== 'undefined' && (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle) {
      try {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle = (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
      } catch (e) {
        // AdSense not loaded yet
      }
    }
  }, []);

  return (
    <div
      className={`ad-container ${className}`}
      data-ad-client="ca-pub-5554704158829427"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5554704158829427"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdPlaceholder({ type = 'banner', className = '' }: { type?: 'banner' | 'sidebar' | 'inline'; className?: string }) {
  const configs = {
    banner: { slot: '1234567890', format: 'auto' as const, className: 'my-8' },
    sidebar: { slot: '0987654321', format: 'auto' as const, className: 'sticky top-20' },
    inline: { slot: '1122334455', format: 'auto' as const, className: 'my-6' },
  };

  const config = configs[type];

  return (
    <div className={`${config.className} ${className}`}>
      <AdUnit slot={config.slot} format={config.format} />
    </div>
  );
}
