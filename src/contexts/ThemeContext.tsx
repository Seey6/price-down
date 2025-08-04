import React, { createContext, useContext, useState, useEffect } from 'react';

// 主题色配置
export const themeColors = {
  pink: {
    name: '粉红',
    primary: '#fe48a9',
    primaryLight: '#ff7bc4',
    primaryDark: '#e91e63',
    secondary: '#fce4ec',
    accent: '#ff4081',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  blue: {
    name: '蓝色',
    primary: '#2196f3',
    primaryLight: '#64b5f6',
    primaryDark: '#1976d2',
    secondary: '#e3f2fd',
    accent: '#03a9f4',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  green: {
    name: '绿色',
    primary: '#4caf50',
    primaryLight: '#81c784',
    primaryDark: '#388e3c',
    secondary: '#e8f5e8',
    accent: '#66bb6a',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  purple: {
    name: '紫色',
    primary: '#9c27b0',
    primaryLight: '#ba68c8',
    primaryDark: '#7b1fa2',
    secondary: '#f3e5f5',
    accent: '#e91e63',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  },
  orange: {
    name: '橙色',
    primary: '#ff9800',
    primaryLight: '#ffb74d',
    primaryDark: '#f57c00',
    secondary: '#fff3e0',
    accent: '#ff5722',
    success: '#4caf50',
    warning: '#ff9800',
    error: '#f44336',
  }
};

export type ThemeColorKey = keyof typeof themeColors;
export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  colorTheme: ThemeColorKey;
  mode: ThemeMode;
  colors: typeof themeColors[ThemeColorKey];
  setColorTheme: (theme: ThemeColorKey) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorTheme, setColorTheme] = useState<ThemeColorKey>('pink');
  const [mode, setMode] = useState<ThemeMode>('light');

  // 从localStorage加载主题设置
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('colorTheme') as ThemeColorKey;
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    
    if (savedColorTheme && themeColors[savedColorTheme]) {
      setColorTheme(savedColorTheme);
    }
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // 保存主题设置到localStorage
  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    localStorage.setItem('themeMode', mode);
    
    // 更新CSS变量
    const root = document.documentElement;
    const colors = themeColors[colorTheme];
    
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-light', colors.primaryLight);
    root.style.setProperty('--color-primary-dark', colors.primaryDark);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-error', colors.error);
    
    // 设置暗色模式
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [colorTheme, mode]);

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const value: ThemeContextType = {
    colorTheme,
    mode,
    colors: themeColors[colorTheme],
    setColorTheme,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}