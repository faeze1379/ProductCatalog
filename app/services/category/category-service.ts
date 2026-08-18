import { apiClient, mapToDataOnly } from "~/services/api-service";

export type ICategory = string;

export default class CategoryService {
  get(): Promise<ICategory[]> {
    return mapToDataOnly<ICategory[]>(
      apiClient.get<ICategory[]>("/products/category-list"),
    );
  }
}
