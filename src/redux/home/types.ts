export interface SliderItemDataPropType {
  id: number | undefined;
  image: string;
  title: string;
}

export interface SliderDataPropType {
  main: SliderItemDataPropType[];
  right_top: SliderItemDataPropType;
  right_bottom: SliderItemDataPropType;
}

export interface CategoryItemDataPropType {
  id: number | undefined;
  title: string;
  slug: string;
}

export interface FeaturedCategoriesDataPropType {
  id: number | undefined;
  title: string;
  image: string;
  status: number | undefined;
  slug: string;
  meta_title: string;
  meta_description: string;
  category: CategoryItemDataPropType;
}

export interface PublicProductsDataPropType {
  id: number | undefined;
  product_id: number | undefined;
  flash_sale_id: number | undefined;
  price: number | undefined;
  created_at: string;
  updated_at: string;
  title: string;
  badge: null;
  selling: number | undefined;
  offered: number | undefined;
  image: string;
  review_count: number | undefined;
  rating: number | undefined;
}

export interface FlashSalesDataPropType {
  id: number | undefined;
  title: string;
  public_products: PublicProductsDataPropType[];
}

export interface ProductCollectionsDataPropType {
  created_at: string;
  updated_at: string;
  product_collection_id: number | undefined;
  product_id: null | undefined;
  id: number | undefined;
  title: string;
  badge: string;
  selling: number | undefined;
  offered: number | undefined;
  image: string;
  review_count: number | undefined;
  rating: number | undefined;
  shipping_rule_id: number | undefined;
  price: null;
  end_time: null;
}

export interface CollectionsDataPropType {
  id: number | undefined;
  title: string;
  product_collections: ProductCollectionsDataPropType[];
}

export interface HomeDataPropType {
  slider: SliderDataPropType;
  banners: SliderItemDataPropType[];
  featured_categories: FeaturedCategoriesDataPropType[];
  flash_sales: FlashSalesDataPropType[];
  time_zone: string;
  collections: CollectionsDataPropType[];
  featured_brands: SliderItemDataPropType[];
}

export interface InitialState {
  loading: boolean;
  data: HomeDataPropType;
}
