import { apiClient, mapToDataOnly } from "~/services/api-service";

export interface IProduct {
  id: number;
  title: string;
  description?: string;
  category: string;
  brand?: string;
  price: number;
  rating: number;
  stock?: number;
  thumbnail: string;
  images?: string[];
}

export interface IProductsResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export type IProductSortOrder = "asc" | "desc";

export interface IProductsQueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  q?: string;
  sortBy?: "price";
  order?: IProductSortOrder;
}

export default class ProductService {
  getById(id: number): Promise<IProduct> {
    return mapToDataOnly<IProduct>(apiClient.get<IProduct>(`/products/${id}`));
  }

  get(params?: IProductsQueryParams): Promise<IProductsResponse> {
    return mapToDataOnly<IProductsResponse>(
      apiClient.get<IProductsResponse>("/products", { params }),
    );
  }

  getByCategory(
    category: string,
    params?: IProductsQueryParams,
  ): Promise<IProductsResponse> {
    return mapToDataOnly<IProductsResponse>(
      apiClient.get<IProductsResponse>(
        `/products/category/${encodeURIComponent(category)}`,
        { params },
      ),
    );
  }

  search(params?: IProductsQueryParams): Promise<IProductsResponse> {
    return mapToDataOnly<IProductsResponse>(
      apiClient.get<IProductsResponse>("/products/search", { params }),
    );
  }
}
