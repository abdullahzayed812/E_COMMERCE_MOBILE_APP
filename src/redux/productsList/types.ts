import { PublicProductsDataPropType } from "../home/types";

export interface InitialState {
  loading: boolean;
  productsList: PublicProductsDataPropType[];
}
