import { baseClient } from "../baseClient";
import {
  ApiResponse,
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "../types/mainTypes";
import { BaseService } from "./baseServices";

export class ProductService extends BaseService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor() {
    super(""); 
  }
  async getMainCover(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await baseClient.get("/cover/mainProduct");
      return response.data;
    } catch (error) {
      console.error("Error getting main products:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();