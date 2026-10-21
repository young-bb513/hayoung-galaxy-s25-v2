import React from 'react';
import { Wifi, Volume2, Shield } from 'lucide-react';

interface StatusBarProps {
  theme?: 'light' | 'dark';
  currentTime: Date;
  batteryLevel?: number;
  showCarrier?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  theme = 'light',
  currentTime,
  batteryLevel = 84,
  showCarrier = false,
}) => {
  const isLight = theme === 'light';
  const textColor = isLight ? 'text-white' : 'text-zinc-900';
  const iconColor = isLight ? '#FFFFFF' : '#18181B';

  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const timeString = `${hours}:${minutes}`;

  return (
    <div
      className={`relative w-full h-8 px-5 flex items-center justify-between text-[13px] font-medium tracking-tight z-40 select-none ${textColor}`}
    >
      {/* Left: Carrier (Lock Screen) or Time (Home/App) and indicators */}
      <div className="flex items-center gap-1.5 pl-1">
        {showCarrier ? (
          <span className="font-semibold text-[12.5px] tracking-tight">SKTelecom</span>
        ) : (
          <span className="font-semibold text-[13.5px]">{timeString}</span>
        )}
      </div>

      {/* Center: Punch-hole camera (Infinity-O cutout for Galaxy S25) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full bg-black ring-1 ring-black/40 shadow-inner flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a1826]/80" />
        </div>
      </div>

      {/* Right: Network & System Status */}
      <div className="flex items-center gap-1.5 pr-1">
        {/* Sound icon */}
        <Volume2 size={13} strokeWidth={2.4} color={iconColor} className="opacity-80" />

        {/* 5G Network Indicator */}
        <div className="flex items-center tracking-tighter text-[10px] font-bold px-0.5 opacity-90">
          5G
        </div>

        {/* Signal bars */}
        <div className="flex items-end gap-[1.5px] h-2.5 opacity-90 pb-[1px]">
          <div className="w-[2px] h-[3px] rounded-xs bg-current" />
          <div className="w-[2px] h-[5px] rounded-xs bg-current" />
          <div className="w-[2px] h-[7px] rounded-xs bg-current" />
          <div className="w-[2px] h-[9px] rounded-xs bg-current" />
        </div>

        {/* Wi-Fi Icon */}
        <Wifi size={13} strokeWidth={2.4} color={iconColor} className="opacity-90 ml-0.5" />

        {/* Battery Percentage */}
        <span className="text-[11.5px] font-semibold ml-0.5">{batteryLevel}%</span>

        {/* Battery Icon */}
        <div className="w-4.5 h-2.5 rounded-[3px] border-[1.5px] border-current p-[1.5px] flex items-center relative ml-0.5">
          <div
            className="h-full rounded-[1px] bg-current"
            style={{ width: `${Math.min(100, Math.max(0, batteryLevel))}%` }}
          />
          <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[1.5px] h-1.5 bg-current rounded-r-xs" />
        </div>
      </div>
    </div>
  );
};
