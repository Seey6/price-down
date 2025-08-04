import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SelectedProductItem } from '@/types';
import { calculateProductPrice, formatPrice } from '@/utils/priceCalculator';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface SelectedItemsBarProps {
  items: SelectedProductItem[];
  onQuantityChange: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearAll: () => void;
  onNext?: () => void;
  nextButtonText?: string;
  showNextButton?: boolean;
}

export function SelectedItemsBar({
  items,
  onQuantityChange,
  onRemoveItem,
  onClearAll,
  onNext,
  nextButtonText = '下一步',
  showNextButton = true
}: SelectedItemsBarProps) {
  const { colors, mode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  if (items.length === 0) {
    return null;
  }

  const totalValue = items.reduce((sum, item) => {
    const priceInfo = calculateProductPrice(item.product, item.quantity);
    return sum + priceInfo.totalFinalPrice;
  }, 0);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* 遮罩层 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      {/* 底栏 */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed bottom-0 left-0 right-0 border-t shadow-lg z-50 transition-colors duration-300 ${
          mode === 'dark'
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        }`}
      >
        {/* 展开的商品列表 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className={`overflow-hidden border-b transition-colors duration-300 ${
                mode === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <motion.h3
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        mode === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      已选商品
                    </motion.h3>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsExpanded(false)}
                      className={`transition-colors duration-300 ${
                        mode === 'dark'
                          ? 'text-gray-400 hover:text-gray-200'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      ✕
                    </motion.button>
                  </div>
                  <div className="space-y-3">
                    <AnimatePresence>
                      {items.map((item, index) => {
                        const priceInfo = calculateProductPrice(item.product, item.quantity);
                        return (
                          <motion.div 
                            key={item.product.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.1 }}
                            className={`rounded-lg p-3 shadow-sm transition-colors duration-300 ${
                              mode === 'dark' ? 'bg-gray-700' : 'bg-white'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <h4 className={`font-medium transition-colors duration-300 ${
                                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>{item.product.name}</h4>
                                <p className={`text-sm transition-colors duration-300 ${
                                  mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                }`}>{item.product.description}</p>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onRemoveItem(item.product.id)}
                                className="ml-2 transition-colors duration-300"
                                style={{ color: colors.error }}
                              >
                                删除
                              </motion.button>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-3">
                                <span className={`text-sm transition-colors duration-300 ${
                                  mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>数量:</span>
                                <div className="flex items-center space-x-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm transition-colors duration-300 ${
                                      mode === 'dark'
                                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                                    }`}
                                    disabled={item.quantity <= 1}
                                  >
                                    -
                                  </motion.button>
                                  <motion.span
                                    className={`w-8 text-center font-medium transition-colors duration-300`}
                                    style={{ color: colors.primary }}
                                    key={item.quantity}
                                    initial={{ scale: 1.3 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {item.quantity}
                                  </motion.span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-sm transition-colors duration-300 ${
                                      mode === 'dark'
                                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
                                    }`}
                                  >
                                    +
                                  </motion.button>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-sm transition-colors duration-300 ${
                                  mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {formatPrice(priceInfo.unitFinalPrice)} × {item.quantity}
                                </div>
                                <motion.div
                                  className="font-semibold"
                                  style={{ color: colors.success }}
                                  key={priceInfo.totalFinalPrice}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  {formatPrice(priceInfo.totalFinalPrice)}
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 底栏主体 */}
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-2 transition-colors duration-300"
                style={{ color: colors.primary }}
              >
                <div className="relative">
                  <motion.div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.primary}20` }}
                    whileHover={{ rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    🛒
                  </motion.div>
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {totalItems > 99 ? '99+' : totalItems}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="text-left hidden sm:block">
                  <div className={`text-sm font-medium transition-colors duration-300 ${
                    mode === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    <motion.span
                      key={items.length}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`transition-colors duration-300 ${
                        mode === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {items.length}
                    </motion.span>
                    种商品
                  </div>
                  <div className={`text-xs transition-colors duration-300 ${
                    mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    共
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`transition-colors duration-300 ${
                        mode === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {totalItems}
                    </motion.span>
                    件
                  </div>
                </div>
              </motion.button>
              
              <div className="text-center sm:text-right">
                <div className={`text-sm transition-colors duration-300 ${
                  mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>总价值</div>
                <motion.div
                  className="text-lg font-bold"
                  style={{ color: colors.success }}
                  key={totalValue}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatPrice(totalValue)}
                </motion.div>
              </div>
            </div>

            <div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-end">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearAll}
                >
                  清空
                </Button>
              </motion.div>
              {showNextButton && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    size="sm"
                    onClick={onNext}
                    disabled={items.length === 0}
                  >
                    {nextButtonText}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 为底栏留出空间 */}
      <div className="h-20"></div>
    </>
  );
}