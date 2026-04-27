import { baseClient } from "../baseClient";
import {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from "../types/mainTypes";

export abstract class BaseService<T, CreateDto, UpdateDto> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(params?: PaginationParams & any): Promise<PaginatedResponse<T>> {
    try {
      const response = await baseClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Error getting ${this.endpoint}:`, error);
      throw error;
    }
  }

  async getById(id: number): Promise<ApiResponse<T>> {
    try {
      const response = await baseClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting ${this.endpoint} by id ${id}:`, error);
      throw error;
    }
  }

  async create(data: CreateDto): Promise<ApiResponse<T>> {
    try {
      const response = await baseClient.post(this.endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error creating ${this.endpoint}:`, error);
      throw error;
    }
  }

  async update(id: number, data: UpdateDto): Promise<ApiResponse<T>> {
    try {
      const response = await baseClient.patch(`${this.endpoint}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating ${this.endpoint} ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<ApiResponse<void>> {
    try {
      const response = await baseClient.delete(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting ${this.endpoint} ${id}:`, error);
      throw error;
    }
  }
}
