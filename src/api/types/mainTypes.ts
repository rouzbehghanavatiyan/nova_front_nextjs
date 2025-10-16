// lib/api/types/common.ts
export interface ApiResponse<T = any> {
  success: boolean;
  code: number;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BaseEntity {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

// lib/api/types/product.ts

export interface Product extends BaseEntity {
  code: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  images?: string[];
  categoryId: number;
  isActive: boolean;
}

export interface CreateProductDto {
  code: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  categoryId: number;
  images?: string[];
}

export interface UpdateProductDto extends Partial<CreateProductDto> {
  isActive?: boolean;
}

export interface ProductFilterParams {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  isActive?: boolean;
  search?: string;
}

export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  role: "admin" | "user" | "moderator";
  isActive: boolean;
  lastLogin?: Date;
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone?: string;
  role?: "admin" | "user" | "moderator";
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  role?: "admin" | "user" | "moderator";
  isActive?: boolean;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
