import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themeColors, type ThemeColorKey } from '@/contexts/ThemeContext';

interface ThemeSettingsProps {
  onClose?: () => void;
}

export function ThemeSettings({ onClose }: ThemeSettingsProps = {}) {
  const { colorTheme, mode, setColorTheme, toggleMode } = useTheme();

  // 如果有onClose属性，说明是内联模式
  if (onClose) {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <motion.h3
            className={`text-lg font-semibold transition-colors duration-300 ${
              mode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            主题设置
          </motion.h3>
          <motion.button
            onClick={onClose}
            className={`p-1 rounded-md transition-colors duration-300 ${
              mode === 'dark'
                ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* 显示模式 */}
          <div>
            <motion.h4
              className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              显示模式
            </motion.h4>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => mode !== 'light' && toggleMode()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all text-sm ${
                  mode === 'light'
                    ? 'border-gray-400 bg-gray-100 text-gray-900'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <span>☀️</span>
                <span>浅色</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => mode !== 'dark' && toggleMode()}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all text-sm ${
                  mode === 'dark'
                    ? 'border-gray-600 bg-gray-700 text-white'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <span>🌙</span>
                <span>深色</span>
              </motion.button>
            </div>
          </div>

          {/* 主题色 */}
          <div>
            <motion.h4
              className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              主题色彩
            </motion.h4>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(themeColors).map(([key, theme], index) => (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setColorTheme(key as ThemeColorKey)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    colorTheme === key
                      ? 'border-white shadow-lg scale-110'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: theme.primary }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: colorTheme === key ? 1.1 : 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  title={theme.name}
                >
                  {colorTheme === key && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-white text-xs flex items-center justify-center h-full"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // 原来的悬浮面板模式
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 设置按钮 */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        style={{ backgroundColor: mode === 'dark' ? '#1f2937' : 'white' }}
      >
        ⚙️
      </motion.button>

      {/* 设置面板 */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* 遮罩层 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* 设置面板 */}
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                {/* 标题 */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">主题设置</h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </motion.button>
                </div>

                {/* 亮暗模式切换 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">显示模式</h3>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => mode !== 'light' && toggleMode()}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                        mode === 'light'
                          ? 'border-gray-400 bg-gray-100 text-gray-900'
                          : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <span>☀️</span>
                      <span>浅色</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => mode !== 'dark' && toggleMode()}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                        mode === 'dark'
                          ? 'border-gray-600 bg-gray-700 text-white'
                          : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500'
                      }`}
                    >
                      <span>🌙</span>
                      <span>深色</span>
                    </motion.button>
                  </div>
                </div>

                {/* 主题色选择 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">主题色</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(themeColors).map(([key, theme]) => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setColorTheme(key as ThemeColorKey)}
                        className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                          colorTheme === key
                            ? 'border-2 shadow-md'
                            : 'border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                        }`}
                        style={{
                          borderColor: colorTheme === key ? theme.primary : undefined,
                          backgroundColor: colorTheme === key ? `${theme.primary}10` : undefined
                        }}
                      >
                        <div
                          className="w-6 h-6 rounded-full shadow-sm"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {theme.name}
                        </span>
                        {colorTheme === key && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto text-sm"
                            style={{ color: theme.primary }}
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* 预览区域 */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">预览</h3>
                  <div className="space-y-3">
                    <div 
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: themeColors[colorTheme].primary }}
                    >
                      主色调按钮
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg border-2 font-medium"
                      style={{ 
                        borderColor: themeColors[colorTheme].primary,
                        color: themeColors[colorTheme].primary,
                        backgroundColor: themeColors[colorTheme].secondary
                      }}
                    >
                      次要按钮
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: themeColors[colorTheme].accent }}
                    >
                      强调色按钮
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}