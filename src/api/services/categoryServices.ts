import { baseClient } from "../baseClient";
import {
  ApiResponse,
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "../types/mainTypes";
import { BaseService } from "./baseServices";

export class CategoryServices extends BaseService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor() {
    super("");
  }

  async getAllCategories(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await baseClient.get("/category/getAllCategories");
      return response.data;
    } catch (error) {
      console.error("Error getting main products:", error);
      throw error;
    }
  }

  async getSubCategories(categoryId: string): Promise<ApiResponse<any[]>> {
    console.log(categoryId);

    try {
      const response = await baseClient.get(
        `/category/${categoryId}/subcategories`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting subcategories:", error);
      throw error;
    }
  }

  async getProductCategory(categoryId: number): Promise<ApiResponse<any[]>> {
    try {
      const response = await baseClient.get(
        `/category/categoryId=${categoryId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting subcategories:", error);
      throw error;
    }
  }
}

export const categoryServices = new CategoryServices();
