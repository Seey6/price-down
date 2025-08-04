import { motion, AnimatePresence } from 'framer-motion';
import type { SelectedProductItem } from '@/types';
import { compareExchangeGroups, formatPrice, getExchangeSuggestion } from '@/utils/priceCalculator';
import { useTheme } from '@/contexts/ThemeContext';

interface ExchangeComparisonProps {
  offerItems: SelectedProductItem[];
  requestItems: SelectedProductItem[];
}

export function ExchangeComparison({ offerItems, requestItems }: ExchangeComparisonProps) {
  const { colors, mode } = useTheme();
  
  if (offerItems.length === 0 && requestItems.length === 0) {
    return (
      <motion.div
        className={`rounded-lg p-6 text-center transition-colors duration-300 ${
          mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className={`transition-colors duration-300 ${
            mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          请选择要交换的商品进行价值比较
        </motion.p>
      </motion.div>
    );
  }

  if (offerItems.length === 0 || requestItems.length === 0) {
    return (
      <motion.div
        className={`border rounded-lg p-6 text-center transition-colors duration-300 ${
          mode === 'dark'
            ? 'bg-yellow-900 border-yellow-700'
            : 'bg-yellow-50 border-yellow-200'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className={`transition-colors duration-300 ${
            mode === 'dark' ? 'text-yellow-300' : 'text-yellow-700'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          请同时选择交换物和被交换物才能进行比较
        </motion.p>
      </motion.div>
    );
  }

  const comparison = compareExchangeGroups(offerItems, requestItems);
  const suggestion = getExchangeSuggestion(comparison);

  const getTotalQuantity = (items: SelectedProductItem[]) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <motion.div
      className={`border rounded-lg p-6 space-y-6 transition-colors duration-300 ${
        mode === 'dark'
          ? 'bg-gray-900 border-gray-700'
          : 'bg-white border-gray-200'
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className={`text-2xl font-bold text-center transition-colors duration-300 ${
          mode === 'dark' ? 'text-white' : 'text-gray-900'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        交换价值分析
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* 我的商品 */}
        <motion.div
          className="rounded-lg p-4 transition-colors duration-300"
          style={{ backgroundColor: `${colors.primary}10` }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h3
            className="text-lg font-semibold mb-3 transition-colors duration-300"
            style={{ color: colors.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            我的商品 ({comparison.offerGroup.items.length}种，共{getTotalQuantity(comparison.offerGroup.items)}件)
          </motion.h3>
          <div className="space-y-2">
            <AnimatePresence>
              {comparison.offerGroup.items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  className="text-sm transition-colors duration-300"
                  style={{ color: colors.primaryDark }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  • {item.product.name} × {item.quantity}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.div
            className="mt-4 space-y-2 border-t pt-3 transition-colors duration-300"
            style={{ borderColor: `${colors.primary}40` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between text-sm">
              <span className={`transition-colors duration-300 ${
                mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>原价总计:</span>
              <motion.span
                className={`transition-colors duration-300 ${
                  mode === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                key={comparison.offerGroup.totalOriginalPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatPrice(comparison.offerGroup.totalOriginalPrice)}
              </motion.span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={`transition-colors duration-300 ${
                mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>溢价总计:</span>
              <motion.span
                className="transition-colors duration-300"
                style={{ color: colors.warning }}
                key={comparison.offerGroup.totalPremiumAmount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                +{formatPrice(comparison.offerGroup.totalPremiumAmount)}
              </motion.span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2 transition-colors duration-300"
                 style={{ borderColor: `${colors.primary}40` }}>
              <span className={`transition-colors duration-300 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>总价值:</span>
              <motion.span
                className="transition-colors duration-300"
                style={{ color: colors.success }}
                key={comparison.offerGroup.totalFinalPrice}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {formatPrice(comparison.offerGroup.totalFinalPrice)}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>

        {/* 想要的商品 */}
        <motion.div
          className="rounded-lg p-4 transition-colors duration-300"
          style={{ backgroundColor: `${colors.success}10` }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h3
            className="text-lg font-semibold mb-3 transition-colors duration-300"
            style={{ color: colors.success }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            想要的商品 ({comparison.requestGroup.items.length}种，共{getTotalQuantity(comparison.requestGroup.items)}件)
          </motion.h3>
          <div className="space-y-2">
            <AnimatePresence>
              {comparison.requestGroup.items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  className="text-sm transition-colors duration-300"
                  style={{ color: `${colors.success}CC` }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  • {item.product.name} × {item.quantity}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <motion.div
            className="mt-4 space-y-2 border-t pt-3 transition-colors duration-300"
            style={{ borderColor: `${colors.success}40` }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between text-sm">
              <span className={`transition-colors duration-300 ${
                mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>原价总计:</span>
              <motion.span
                className={`transition-colors duration-300 ${
                  mode === 'dark' ? 'text-gray-200' : 'text-gray-800'
                }`}
                key={comparison.requestGroup.totalOriginalPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatPrice(comparison.requestGroup.totalOriginalPrice)}
              </motion.span>
            </div>
            <div className="flex justify-between text-sm">
              <span className={`transition-colors duration-300 ${
                mode === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>溢价总计:</span>
              <motion.span
                className="transition-colors duration-300"
                style={{ color: colors.warning }}
                key={comparison.requestGroup.totalPremiumAmount}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                +{formatPrice(comparison.requestGroup.totalPremiumAmount)}
              </motion.span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2 transition-colors duration-300"
                 style={{ borderColor: `${colors.success}40` }}>
              <span className={`transition-colors duration-300 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>总价值:</span>
              <motion.span
                className="transition-colors duration-300"
                style={{ color: colors.success }}
                key={comparison.requestGroup.totalFinalPrice}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                {formatPrice(comparison.requestGroup.totalFinalPrice)}
              </motion.span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 比较结果 */}
      <motion.div
        className={`rounded-lg p-4 transition-colors duration-300 ${
          mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <motion.h3
          className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            mode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          交换分析
        </motion.h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
          >
            <div className={`text-sm transition-colors duration-300 ${
              mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>价值差异</div>
            <motion.div
              className="text-xl font-bold"
              style={{
                color: comparison.valueDifference > 0 ? colors.primary :
                       comparison.valueDifference < 0 ? colors.error : colors.success
              }}
              key={comparison.valueDifference}
              initial={{ scale: 1.5, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {comparison.valueDifference > 0 ? '+' : ''}
              {formatPrice(comparison.valueDifference)}
            </motion.div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
          >
            <div className={`text-sm transition-colors duration-300 ${
              mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>交换比率</div>
            <motion.div
              className={`text-xl font-bold transition-colors duration-300 ${
                mode === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              key={comparison.exchangeRatio}
              initial={{ scale: 1.5, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {comparison.exchangeRatio.toFixed(2)}:1
            </motion.div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1 }}
          >
            <div className={`text-sm transition-colors duration-300 ${
              mode === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>公平程度</div>
            <motion.div
              className="text-lg font-semibold"
              style={{
                color: Math.abs(comparison.valueDifference) < 100 ? colors.success :
                       Math.abs(comparison.valueDifference) < 500 ? colors.warning : colors.error
              }}
              initial={{ scale: 1.3, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              {Math.abs(comparison.valueDifference) < 100 ? '非常公平' :
               Math.abs(comparison.valueDifference) < 500 ? '基本公平' : '不太公平'}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 建议 */}
      <motion.div
        className="rounded-lg p-4 border transition-colors duration-300"
        style={{
          backgroundColor: Math.abs(comparison.valueDifference) < 100
            ? `${colors.success}10`
            : Math.abs(comparison.valueDifference) < 500
            ? `${colors.warning}10`
            : `${colors.error}10`,
          borderColor: Math.abs(comparison.valueDifference) < 100
            ? `${colors.success}40`
            : Math.abs(comparison.valueDifference) < 500
            ? `${colors.warning}40`
            : `${colors.error}40`
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <motion.h3
          className={`font-semibold mb-2 transition-colors duration-300 ${
            mode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          交换建议
        </motion.h3>
        <motion.p
          className="transition-colors duration-300"
          style={{
            color: Math.abs(comparison.valueDifference) < 100
              ? colors.success
              : Math.abs(comparison.valueDifference) < 500
              ? colors.warning
              : colors.error
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          {suggestion}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}