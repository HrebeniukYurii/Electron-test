declare global {
  interface Window {
    electronAPI: {
      saveStringValue: (value: string) => Promise<void>;
      getStringValue: () => Promise<string>;
    };
  }
}

export const { saveStringValue, getStringValue } = window.electronAPI;
