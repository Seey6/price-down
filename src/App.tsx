import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SelectedProductItem } from '@/types';
import { ProductSelector } from '@/components/ProductSelector';
import { ExchangeComparison } from '@/components/ExchangeComparison';
import { ThemeSettings } from '@/components/ThemeSettings';
import { useTheme } from '@/contexts/ThemeContext';
import { sampleProducts } from '@/data/sampleProducts';

type Step = 'offer' | 'request' | 'compare';

function App() {
  const { colors, mode } = useTheme();
  const [currentStep, setCurrentStep] = useState<Step>('offer');
  const [offerItems, setOfferItems] = useState<SelectedProductItem[]>([]);
  const [requestItems, setRequestItems] = useState<SelectedProductItem[]>([]);
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  const steps = [
    { key: 'offer', title: '选择我的商品', description: '选择你要用来交换的商品' },
    { key: 'request', title: '选择想要的商品', description: '选择你想要获得的商品' },
    { key: 'compare', title: '价值比较', description: '查看交换价值分析结果' }
  ];

  const currentStepIndex = steps.findIndex(step => step.key === currentStep);

  const handleNext = () => {
    if (currentStep === 'offer') {
      setCurrentStep('request');
    } else if (currentStep === 'request') {
      setCurrentStep('compare');
    }
  };

  const handlePrevious = () => {
    if (currentStep === 'request') {
      setCurrentStep('offer');
    } else if (currentStep === 'compare') {
      setCurrentStep('request');
    }
  };

  const handleStepClick = (step: Step) => {
    // 只允许向前跳转到已完成的步骤
    if (step === 'offer') {
      setCurrentStep('offer');
    } else if (step === 'request' && offerItems.length > 0) {
      setCurrentStep('request');
    } else if (step === 'compare' && offerItems.length > 0 && requestItems.length > 0) {
      setCurrentStep('compare');
    }
  };

  const resetAll = () => {
    setOfferItems([]);
    setRequestItems([]);
    setCurrentStep('offer');
  };

  // 页面切换动画变体
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.5
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
    }`}>

      {/* 头部 */}
      <motion.header 
        className={`shadow-sm border-b transition-colors duration-300 ${
          mode === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <motion.h1 
                className={`text-2xl font-bold transition-colors duration-300 ${
                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                我要换素龙！
              </motion.h1>
              <motion.p 
                className={`text-sm mt-1 transition-colors duration-300 ${
                  mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                汪苏泷粉丝专属周边交换平台，智能价值评估，公平交换
              </motion.p>
            </div>
            <div className="flex items-center space-x-2">
              {/* 主题设置按钮 */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowThemeSettings(!showThemeSettings)}
                className={`p-2 rounded-md transition-all duration-300 ${
                  mode === 'dark'
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                ⚙️
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetAll}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  mode === 'dark'
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                    : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                重新开始
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 主题设置面板 */}
      <AnimatePresence>
        {showThemeSettings && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-40"
          >
            <div className={`border-b transition-colors duration-300 ${
              mode === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <ThemeSettings onClose={() => setShowThemeSettings(false)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 步骤指示器 */}
      <motion.div 
        className={`border-b transition-colors duration-300 ${
          mode === 'dark' 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center overflow-x-auto">
            <ol className="flex items-center space-x-4 sm:space-x-8 py-4 min-w-max">
              {steps.map((step, index) => {
                const isActive = step.key === currentStep;
                const isCompleted = index < currentStepIndex;
                const isAccessible =
                  step.key === 'offer' ||
                  (step.key === 'request' && offerItems.length > 0) ||
                  (step.key === 'compare' && offerItems.length > 0 && requestItems.length > 0);

                return (
                  <li key={step.key} className="flex items-center">
                    <motion.button
                      onClick={() => handleStepClick(step.key as Step)}
                      disabled={!isAccessible}
                      className={`flex items-center space-x-3 ${
                        isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`}
                      whileHover={isAccessible ? { scale: 1.05 } : {}}
                      whileTap={isAccessible ? { scale: 0.95 } : {}}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <motion.div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300`}
                        style={{
                          borderColor: isActive || isCompleted ? colors.primary : (mode === 'dark' ? '#4b5563' : '#d1d5db'),
                          backgroundColor: isActive || isCompleted ? colors.primary : 'transparent',
                          color: isActive || isCompleted ? 'white' : (mode === 'dark' ? '#9ca3af' : '#6b7280')
                        }}
                        animate={{
                          scale: isActive ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                          scale: { duration: 0.3, repeat: isActive ? Infinity : 0, repeatDelay: 2 },
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {isCompleted ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              transition={{ duration: 0.3 }}
                            >
                              ✓
                            </motion.span>
                          ) : (
                            <motion.span
                              key="number"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {index + 1}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      {/* 桌面端显示文字 */}
                      <div className="text-left hidden sm:block">
                        <motion.div
                          className={`text-sm font-medium transition-colors duration-300`}
                          style={{
                            color: isActive || isCompleted ? colors.primary : (mode === 'dark' ? '#9ca3af' : '#6b7280')
                          }}
                        >
                          {step.title}
                        </motion.div>
                        <div className={`text-xs transition-colors duration-300 ${
                          mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </div>
                      </div>
                    </motion.button>
                    {index < steps.length - 1 && (
                      <motion.div
                        className={`w-4 sm:w-8 h-0.5 ml-2 sm:ml-4 transition-colors duration-300`}
                        style={{
                          backgroundColor: index < currentStepIndex ? colors.primary : (mode === 'dark' ? '#4b5563' : '#d1d5db'),
                          originX: 0
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </motion.div>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'offer' && (
            <motion.div
              key="offer"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ProductSelector
                title="选择我的商品"
                products={sampleProducts}
                selectedItems={offerItems}
                onItemsChange={setOfferItems}
                onNext={handleNext}
                nextButtonText="下一步：选择想要的商品"
                showNextButton={true}
              />
            </motion.div>
          )}

          {currentStep === 'request' && (
            <motion.div
              key="request"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                      mode === 'dark'
                        ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    ← 上一步
                  </motion.button>
                </div>
                <ProductSelector
                  title="选择想要的商品"
                  products={sampleProducts}
                  selectedItems={requestItems}
                  onItemsChange={setRequestItems}
                  onNext={handleNext}
                  nextButtonText="下一步：查看价值比较"
                  showNextButton={true}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 'compare' && (
            <motion.div
              key="compare"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <motion.button
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrevious}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                      mode === 'dark'
                        ? 'text-gray-300 bg-gray-700 hover:bg-gray-600'
                        : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    ← 上一步
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetAll}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-all duration-300`}
                    style={{ backgroundColor: colors.primary }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    开始新的比较
                  </motion.button>
                </div>
                <ExchangeComparison
                  offerItems={offerItems}
                  requestItems={requestItems}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
