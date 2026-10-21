import React from 'react';
import { motion } from 'motion/react';
import { FolderInfo, AppId } from '../../types/phone';
import { APPS } from '../../data/appsData';
import { AppIcon } from '../common/AppIcon';
import { X, Plus } from 'lucide-react';

interface FolderPopupProps {
  folder: FolderInfo;
  onClose: () => void;
  onOpenApp: (appId: AppId) => void;
}

export const FolderPopup: React.FC<FolderPopupProps> = ({
  folder,
  onClose,
  onOpenApp,
}) => {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-[320px] bg-white/20 backdrop-blur-2xl border border-white/30 rounded-[28px] p-5 shadow-2xl flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.75, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      >
        {/* Folder Header */}
        <div className="flex items-center justify-between pb-4 px-1 border-b border-white/15">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium text-[17px] tracking-tight">
              {folder.name}
            </span>
            {folder.badge && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#FF3B30] text-white text-[10px] font-bold">
                {folder.badge}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="폴더 닫기"
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white transition-all"
          >
            <X size={15} />
          </button>
        </div>

        {/* Apps Grid Inside Folder (3 Columns) */}
        <div className="grid grid-cols-3 gap-y-5 gap-x-3 pt-5 pb-2">
          {folder.appIds.map((appId) => {
            const app = APPS[appId];
            if (!app) return null;
            return (
              <button
                key={appId}
                type="button"
                onClick={() => {
                  onClose();
                  onOpenApp(appId);
                }}
                className="flex flex-col items-center gap-1.5 group focus:outline-none"
              >
                <div className="group-hover:scale-105 active:scale-90 transition-transform">
                  <AppIcon appId={appId} size="md" badge={app.badge} showBadge={Boolean(app.badge)} />
                </div>
                <span className="text-white text-[12px] font-normal tracking-tight text-center truncate max-w-[70px] drop-shadow-sm">
                  {app.name}
                </span>
              </button>
            );
          })}

          {/* Add app placeholder icon like One UI */}
          <button
            type="button"
            className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity"
          >
            <div className="w-13 h-13 rounded-[15px] border-2 border-dashed border-white/40 flex items-center justify-center text-white">
              <Plus size={20} />
            </div>
            <span className="text-white/70 text-[11px] font-normal">추가</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
