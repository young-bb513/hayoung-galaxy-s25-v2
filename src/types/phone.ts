export type AppId =
  | 'kakaotalk'
  | 'chrome'
  | 'phone'
  | 'contacts'
  | 'instagram'
  | 'fromm'
  | 'gallery'
  | 'calendar'
  | 'nol'
  | 'camera'
  | 'messages'
  | 'settings'
  | 'chatgpt'
  | 'spellcheck'
  | 'memo'
  | 'voice_record';

export interface AppInfo {
  id: AppId;
  name: string;
  category?: 'social' | 'tool' | 'media' | 'utility';
  badge?: number | string;
}

export interface FolderInfo {
  id: string;
  name: string;
  badge?: number | string;
  appIds: AppId[];
}

export type GridItem =
  | { type: 'app'; appId: AppId }
  | { type: 'folder'; folderId: string };

export type ScreenState = 'lock' | 'home' | 'app';

export interface PhoneContextState {
  screen: ScreenState;
  activeAppId: AppId | null;
  openedFolderId: string | null;
  currentTime: Date;
  batteryLevel: number;
  isLocked: boolean;
  unlock: () => void;
  lockPhone: () => void;
  openApp: (appId: AppId) => void;
  closeApp: () => void;
  goHome: () => void;
  goBack: () => void;
  openFolder: (folderId: string) => void;
  closeFolder: () => void;
}
