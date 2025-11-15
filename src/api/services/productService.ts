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

  async getDescription(desId: number): Promise<ApiResponse<Product[]>> {
    try {
      const response = await baseClient.get(`/product/getDesById/${desId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting main products:", error);
      throw error;
    }
  }

  async getFeaturesFromProduct(
    productId: number
  ): Promise<ApiResponse<Product[]>> {
    try {
      const response = await baseClient.get(
        `/feature/getFeaturesFromProduct/${productId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting main products:", error);
      throw error;
    }
  }

  async productBySearching(
    productTitle: string | null,
    productModel: number | null
  ): Promise<ApiResponse<Product[]>> {
    try {
      const response = await baseClient.get(
        `/product/productBySearching/${productTitle}/productModel/${productModel}`
      );
      return response.data;
    } catch (error) {
      console.error("Error getting main products:", error);
      throw error;
    }
  }
}

export const productService = new ProductService();
