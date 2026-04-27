import { baseClient } from "../baseClient";
import {
  ApiResponse,
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "../types/mainTypes";
import { BaseService } from "./baseServices";

export class AddtionalService extends BaseService<
  Product,
  CreateProductDto,
  UpdateProductDto
> {
  constructor() {
    super("");
  }
  async getMoreImages(): Promise<ApiResponse<Product[]>> {
    try {
      const response = await baseClient.get("/addtional/getMoreImages");
      return response.data;
    } catch (error) {
      console.error("Error getting main products:", error);
      throw error;
    }
  }
}

export const addtionalService = new AddtionalService();
