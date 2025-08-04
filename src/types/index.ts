// 商品接口定义
export interface Product {
  id: string;
  name: string;
  originalPrice: number; // 原价
  premiumAmount: number; // 溢价金额（固定金额）
  category: string;
  description?: string;
  imageUrl?: string;
}

// 选中的商品项（包含数量）
export interface SelectedProductItem {
  product: Product;
  quantity: number;
}

// 计算后的商品价格信息
export interface ProductPriceInfo {
  product: Product;
  quantity: number;
  unitOriginalPrice: number;
  unitPremiumAmount: number;
  unitFinalPrice: number; // 单价（原价 + 溢价）
  totalOriginalPrice: number; // 总原价
  totalPremiumAmount: number; // 总溢价
  totalFinalPrice: number; // 总价格
}

// 交换组合
export interface ExchangeGroup {
  id: string;
  name: string;
  items: SelectedProductItem[];
  totalOriginalPrice: number;
  totalPremiumAmount: number;
  totalFinalPrice: number;
}

// 交换比较结果
export interface ExchangeComparison {
  offerGroup: ExchangeGroup; // 交换物（我提供的）
  requestGroup: ExchangeGroup; // 被交换物（我想要的）
  valueDifference: number; // 价值差异（正数表示我的更值钱，负数表示对方的更值钱）
  exchangeRatio: number; // 交换比率
}

// 商品分类
export const ProductCategory = {
  ELECTRONICS: 'electronics',
  CLOTHING: 'clothing',
  BOOKS: 'books',
  FURNITURE: 'furniture',
  SPORTS: 'sports',
  OTHER: 'other'
} as const;

export type ProductCategoryType = typeof ProductCategory[keyof typeof ProductCategory];