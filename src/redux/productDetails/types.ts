export interface ProductAttributesValues {
  id: number;
  title: string;
  quantity: number;
}

export interface ProductAttributesPropType {
  values: ProductAttributesValues[];
}

export interface ProductDetailsPropType {
  id: number | undefined;
  title: string;
  image: string;
  images: { id: number | undefined; image: string }[] | undefined;
  video: string;
  bundle_deal: { title: string };
  brand: { title: string };
  refundable: number | undefined;
  selling: number | undefined;
  offered: number | undefined;
  attribute: ProductAttributesPropType[];
  inventory: {
    product_id: number;
    inventory_attributes: { inventory_id: number }[];
  }[];
}

export interface InitialState {
  loading: boolean;
  productDetails: ProductDetailsPropType;
}
