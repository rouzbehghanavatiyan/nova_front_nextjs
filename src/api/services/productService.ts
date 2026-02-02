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
      const response = await baseClient.get("/product/cover");
      return response.data;
    } catch (error) {
      console.error("Error getting main products:", error);
      throw error;
    }
  }

  async getProduct(codeId: number | string): Promise<ApiResponse<Product[]>> {
    try {
      const response = await baseClient.get(`/product/getProduct/${codeId}`);
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

  async getNewProduct(): Promise<ApiResponse<Product[]>> {
    const response = await baseClient.get(`/product/new`);
    return response.data;
  }

  async getPopular(): Promise<ApiResponse<Product[]>> {
    const response = await baseClient.get(`/product/popular`);
    return response.data;
  }
}

export const productService = new ProductService();
