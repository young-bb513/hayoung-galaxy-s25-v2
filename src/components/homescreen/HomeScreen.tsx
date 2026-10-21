import React from 'react';
import { AppId, FolderInfo } from '../../types/phone';
import { APPS, FOLDERS, HOME_GRID, DOCK_APPS } from '../../data/appsData';
import { AppIcon } from '../common/AppIcon';
import { FolderPopup } from './FolderPopup';

interface HomeScreenProps {
  openedFolderId: string | null;
  onOpenApp: (appId: AppId) => void;
  onOpenFolder: (folderId: string) => void;
  onCloseFolder: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  openedFolderId,
  onOpenApp,
  onOpenFolder,
  onCloseFolder,
}) => {
  const activeFolder: FolderInfo | undefined = openedFolderId
    ? FOLDERS[openedFolderId]
    : undefined;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-transparent">
      {/* Main Grid Content Area: 4-Column Grid Faithful to Song Ha-young's Image 3 */}
      <div className="relative z-10 flex-1 px-3 pt-2 pb-1 flex flex-col justify-between overflow-hidden">
        {/* 4-column App & Folder Grid: Perfectly aligned, shifted toward upper portion */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-1 mt-2 mb-auto w-full">
          {HOME_GRID.map((item, index) => {
            if (item.type === 'folder') {
              const folder = FOLDERS[item.folderId];
              if (!folder) return null;
              return (
                <button
                  key={`folder-${item.folderId}-${index}`}
                  type="button"
                  onClick={() => onOpenFolder(item.folderId)}
                  className="w-full flex flex-col items-center justify-start group focus:outline-none"
                >
                  {/* One UI Folder Preview with miniature icons */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-13 h-13 rounded-[15px] bg-white/25 hover:bg-white/35 active:scale-95 backdrop-blur-md border border-white/30 p-1.5 grid grid-cols-2 grid-rows-2 gap-1 items-center justify-items-center shadow-md transition-all group-hover:scale-105">
                      {folder.appIds.slice(0, 4).map((subAppId) => (
                        <AppIcon
                          key={subAppId}
                          appId={subAppId}
                          size="folder-preview"
                        />
                      ))}
                    </div>

                    {/* Red Badge Indicator */}
                    {folder.badge && (
                      <div className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#FF3B30] border-[1.5px] border-white flex items-center justify-center text-white text-[9px] font-bold shadow-md z-10 leading-none">
                        {folder.badge}
                      </div>
                    )}
                  </div>

                  {/* Centered Folder Name */}
                  <div className="w-full mt-1.5 h-4 flex items-center justify-center">
                    <span className="text-white text-[11px] font-normal tracking-tight text-center truncate max-w-[66px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] leading-tight">
                      {folder.name}
                    </span>
                  </div>
                </button>
              );
            }

            // Standalone App Icon
            const app = APPS[item.appId];
            if (!app) return null;
            return (
              <button
                key={`app-${item.appId}-${index}`}
                type="button"
                onClick={() => onOpenApp(item.appId)}
                className="w-full flex flex-col items-center justify-start group focus:outline-none"
              >
                <div className="relative flex items-center justify-center group-hover:scale-105 active:scale-90 transition-transform">
                  <AppIcon
                    appId={item.appId}
                    size="md"
                    badge={app.badge}
                    showBadge={Boolean(app.badge)}
                  />
                </div>

                {/* Centered App Name */}
                <div className="w-full mt-1.5 h-4 flex items-center justify-center">
                  <span className="text-white text-[11px] font-normal tracking-tight text-center truncate max-w-[66px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] leading-tight">
                    {app.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Page Indicator Dots matching Galaxy One UI */}
        <div className="w-full flex items-center justify-center gap-1.5 py-1">
          <div className="w-3.5 h-1 rounded-full bg-white/90 drop-shadow-sm" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
          <div className="w-1 h-1 rounded-full bg-white/40" />
        </div>

        {/* Bottom Fixed Dock Section: Exactly 4 Apps matching Item 3
            전화 → 메모 → 음성기록 → 카카오톡
            Aligned to the exact same 4-column grid with equal comfortable spacing */}
        <div className="w-full pt-1 pb-1">
          <div className="grid grid-cols-4 gap-x-1 w-full items-center">
            {DOCK_APPS.map((appId, idx) => {
              const app = APPS[appId];
              return (
                <button
                  key={`dock-${appId}-${idx}`}
                  type="button"
                  onClick={() => onOpenApp(appId)}
                  aria-label={app?.name || appId}
                  className="w-full flex items-center justify-center hover:scale-105 active:scale-90 transition-transform focus:outline-none"
                >
                  <AppIcon
                    appId={appId}
                    size="md"
                    badge={app?.badge}
                    showBadge={Boolean(app?.badge)}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Opened Folder Popup Modal */}
      {activeFolder && (
        <FolderPopup
          folder={activeFolder}
          onClose={onCloseFolder}
          onOpenApp={onOpenApp}
        />
      )}
    </div>
  );
};
