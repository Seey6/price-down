import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';
import { calculateProductPrice, formatPrice, calculatePremiumRate } from '@/utils/priceCalculator';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  selectedQuantity?: number;
  onSelect: (product: Product, quantity: number) => void;
  onRemove: (product: Product) => void;
  onQuantityChange?: (productId: string, quantity: number) => void;
}

export function ProductCard({ 
  product, 
  isSelected, 
  selectedQuantity = 1,
  onSelect, 
  onRemove,
  onQuantityChange 
}: ProductCardProps) {
  const { colors, mode } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const currentQuantity = isSelected ? selectedQuantity : quantity;
  const priceInfo = calculateProductPrice(product, currentQuantity);
  const premiumRate = calculatePremiumRate(product);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 0) return;
    
    if (isSelected) {
      if (newQuantity === 0) {
        onRemove(product);
      } else if (onQuantityChange) {
        onQuantityChange(product.id, newQuantity);
      }
    } else {
      if (newQuantity > 0) {
        setQuantity(newQuantity);
      }
    }
  };

  const handleSelect = () => {
    onSelect(product, quantity);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{
        y: -4,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`border rounded-lg p-4 transition-all duration-300 ${
        mode === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
      style={{
        borderColor: isSelected ? colors.primary : (mode === 'dark' ? '#374151' : '#e5e7eb'),
        backgroundColor: isSelected
          ? `${colors.primary}10`
          : (mode === 'dark' ? '#1f2937' : 'white'),
        boxShadow: isSelected ? `0 4px 12px ${colors.primary}20` : undefined
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <motion.h3 
            className={`font-semibold text-lg transition-colors duration-300 ${
              mode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {product.name}
          </motion.h3>
          <motion.p 
            className={`text-sm mt-1 transition-colors duration-300 ${
              mode === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {product.description}
          </motion.p>
          <motion.span 
            className={`inline-block px-2 py-1 text-xs rounded mt-2 transition-colors duration-300 ${
              mode === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-100 text-gray-700'
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            {product.category}
          </motion.span>
        </div>
      </div>

      <motion.div 
        className="space-y-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between items-center">
          <span className={`text-sm transition-colors duration-300 ${
            mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>单价:</span>
          <motion.span 
            className={`font-medium transition-colors duration-300 ${
              mode === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            key={priceInfo.unitOriginalPrice}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatPrice(priceInfo.unitOriginalPrice)}
          </motion.span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm transition-colors duration-300 ${
            mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>溢价:</span>
          <motion.span 
            className="font-medium"
            style={{ color: colors.warning }}
            key={priceInfo.unitPremiumAmount}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            +{formatPrice(priceInfo.unitPremiumAmount)} ({premiumRate.toFixed(1)}%)
          </motion.span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm transition-colors duration-300 ${
            mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>单品价值:</span>
          <motion.span 
            className="font-medium"
            style={{ color: colors.success }}
            key={priceInfo.unitFinalPrice}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {formatPrice(priceInfo.unitFinalPrice)}
          </motion.span>
        </div>

        {/* 已选商品显示总价值 */}
        <AnimatePresence>
          {isSelected && currentQuantity > 1 && (
            <motion.div 
              className="border-t pt-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <span className={`font-semibold transition-colors duration-300 ${
                  mode === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>总价值:</span>
                <motion.span 
                  className="font-bold text-lg"
                  style={{ color: colors.success }}
                  key={priceInfo.totalFinalPrice}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatPrice(priceInfo.totalFinalPrice)}
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 按钮区域 */}
      <div className="flex gap-2">
        <AnimatePresence mode="wait">
          {isSelected ? (
            <motion.div
              key="quantity-controls"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className={`flex-1 flex items-center justify-center space-x-3 rounded-md py-2 transition-all duration-300 ${
                mode === 'dark' ? 'bg-gray-700' : 'bg-white'
              }`}
              style={{ borderColor: colors.primary, borderWidth: '1px' }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(currentQuantity - 1)}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  mode === 'dark'
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                -
              </motion.button>
              <motion.span
                className={`w-8 text-center font-bold transition-colors duration-300`}
                style={{ color: colors.primary }}
                key={currentQuantity}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {currentQuantity}
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuantityChange(currentQuantity + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  mode === 'dark'
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                +
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="select"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleSelect}
                className="w-full"
              >
                选择
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}