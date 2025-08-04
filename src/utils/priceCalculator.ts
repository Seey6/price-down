import type { Product, ProductPriceInfo, ExchangeGroup, ExchangeComparison, SelectedProductItem } from '@/types';

/**
 * 计算商品的价格信息（包含数量）
 */
export function calculateProductPrice(product: Product, quantity: number = 1): ProductPriceInfo {
  const unitOriginalPrice = product.originalPrice;
  const unitPremiumAmount = product.premiumAmount;
  const unitFinalPrice = unitOriginalPrice + unitPremiumAmount;
  
  const totalOriginalPrice = unitOriginalPrice * quantity;
  const totalPremiumAmount = unitPremiumAmount * quantity;
  const totalFinalPrice = unitFinalPrice * quantity;

  return {
    product,
    quantity,
    unitOriginalPrice,
    unitPremiumAmount,
    unitFinalPrice,
    totalOriginalPrice,
    totalPremiumAmount,
    totalFinalPrice
  };
}

/**
 * 计算多个商品的总价值
 */
export function calculateGroupValue(items: SelectedProductItem[], groupName: string): ExchangeGroup {
  const productPrices = items.map(item => calculateProductPrice(item.product, item.quantity));
  
  const totalOriginalPrice = productPrices.reduce((sum, item) => sum + item.totalOriginalPrice, 0);
  const totalPremiumAmount = productPrices.reduce((sum, item) => sum + item.totalPremiumAmount, 0);
  const totalFinalPrice = productPrices.reduce((sum, item) => sum + item.totalFinalPrice, 0);

  return {
    id: `group-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name: groupName,
    items,
    totalOriginalPrice,
    totalPremiumAmount,
    totalFinalPrice
  };
}

/**
 * 比较两个交换组合的价值
 */
export function compareExchangeGroups(
  offerItems: SelectedProductItem[],
  requestItems: SelectedProductItem[],
  offerGroupName: string = '我的商品',
  requestGroupName: string = '想要的商品'
): ExchangeComparison {
  const offerGroup = calculateGroupValue(offerItems, offerGroupName);
  const requestGroup = calculateGroupValue(requestItems, requestGroupName);
  
  const valueDifference = offerGroup.totalFinalPrice - requestGroup.totalFinalPrice;
  const exchangeRatio = requestGroup.totalFinalPrice > 0 
    ? offerGroup.totalFinalPrice / requestGroup.totalFinalPrice 
    : 0;

  return {
    offerGroup,
    requestGroup,
    valueDifference,
    exchangeRatio
  };
}

/**
 * 格式化价格显示
 */
export function formatPrice(price: number): string {
  return `¥${price.toFixed(2)}`;
}

/**
 * 格式化百分比显示
 */
export function formatPercentage(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

/**
 * 获取交换建议文本
 */
export function getExchangeSuggestion(comparison: ExchangeComparison): string {
  const { valueDifference } = comparison;
  
  if (Math.abs(valueDifference) < 1) {
    return '价值相当，这是一个公平的交换！';
  } else if (valueDifference > 0) {
    return `你的商品价值更高，多出 ${formatPrice(valueDifference)}`;
  } else {
    return `对方商品价值更高，多出 ${formatPrice(Math.abs(valueDifference))}`;
  }
}

/**
 * 计算溢价率（用于显示）
 */
export function calculatePremiumRate(product: Product): number {
  if (product.originalPrice === 0) return 0;
  return (product.premiumAmount / product.originalPrice) * 100;
}