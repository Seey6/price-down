import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product, SelectedProductItem } from '@/types';
import { ProductCard } from './ProductCard';
import { SelectedItemsBar } from './SelectedItemsBar';
import { useTheme } from '@/contexts/ThemeContext';

interface ProductSelectorProps {
  title: string;
  products: Product[];
  selectedItems: SelectedProductItem[];
  onItemsChange: (items: SelectedProductItem[]) => void;
  onNext?: () => void;
  nextButtonText?: string;
  showNextButton?: boolean;
}

export function ProductSelector({ 
  title, 
  products, 
  selectedItems, 
  onItemsChange,
  onNext,
  nextButtonText = '下一步',
  showNextButton = true
}: ProductSelectorProps) {
  const { colors, mode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 获取所有分类
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // 过滤商品
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectProduct = (product: Product, quantity: number) => {
    const existingItem = selectedItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // 更新数量
      const updatedItems = selectedItems.map(item =>
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      onItemsChange(updatedItems);
    } else {
      // 添加新商品
      onItemsChange([...selectedItems, { product, quantity }]);
    }
  };

  const handleRemoveProduct = (product: Product) => {
    onItemsChange(selectedItems.filter(item => item.product.id !== product.id));
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      onItemsChange(selectedItems.filter(item => item.product.id !== productId));
      return;
    }
    
    const updatedItems = selectedItems.map(item =>
      item.product.id === productId 
        ? { ...item, quantity }
        : item
    );
    onItemsChange(updatedItems);
  };

  const handleRemoveItem = (productId: string) => {
    onItemsChange(selectedItems.filter(item => item.product.id !== productId));
  };

  const clearAll = () => {
    onItemsChange([]);
  };

  const getSelectedQuantity = (productId: string): number => {
    const item = selectedItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const isProductSelected = (productId: string): boolean => {
    return selectedItems.some(item => item.product.id === productId);
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <motion.h2
          className={`text-xl font-bold transition-colors duration-300 ${
            mode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>
      </div>

      {/* 搜索和筛选 */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex-1">
          <motion.input
            type="text"
            placeholder="搜索商品名称或描述..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
              mode === 'dark'
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
            style={{
              '--tw-ring-color': colors.primary
            } as React.CSSProperties}
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <motion.select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
            mode === 'dark'
              ? 'bg-gray-800 border-gray-600 text-white'
              : 'bg-white border-gray-300 text-gray-900'
          }`}
          style={{
            '--tw-ring-color': colors.primary
          } as React.CSSProperties}
          whileFocus={{ scale: 1.02 }}
        >
          <option value="all">所有分类</option>
          {categories.slice(1).map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </motion.select>
      </motion.div>

      {/* 商品列表 */}
      <div>
        <motion.h3
          className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
            mode === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          可选商品 ({filteredProducts.length})
        </motion.h3>
        
        <AnimatePresence mode="wait">
          {filteredProducts.length === 0 ? (
            <motion.div 
              key="no-products"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`text-center py-8 transition-colors duration-300 ${
                mode === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              没有找到匹配的商品
            </motion.div>
          ) : (
            <motion.div
              key="products-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.3,
                      layout: { duration: 0.3 }
                    }}
                  >
                    <ProductCard
                      product={product}
                      isSelected={isProductSelected(product.id)}
                      selectedQuantity={getSelectedQuantity(product.id)}
                      onSelect={handleSelectProduct}
                      onRemove={handleRemoveProduct}
                      onQuantityChange={handleQuantityChange}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 底栏购物车 */}
      <SelectedItemsBar
        items={selectedItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        onClearAll={clearAll}
        onNext={onNext}
        nextButtonText={nextButtonText}
        showNextButton={showNextButton}
      />
    </motion.div>
  );
}