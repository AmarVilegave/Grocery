import { Injectable } from '@angular/core';
import {
  CATEGORIES_URL,
  CATEGORY_BY_ID_URL,
  PRODUCTS_URL,
  PRODUCT_BY_ID_URL,
} from '../shared/constants/urls';
import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/classes/Category';
import { databaseCategory } from '../shared/interfaces/databaseCategory';
import { databaseProduct } from '../shared/interfaces/databaseProduct';
import { Product } from '../shared/classes/Product';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  getAllCategoriesBySearchTerm(searchTerm: string) {}

  addNewCategoryAndTag(newCategoryAndTag: databaseCategory) {
    this.http
      .post<Category>(CATEGORIES_URL, newCategoryAndTag)
      .subscribe((newCategoryAndTag) => {});
  }

  updateCategoryAndTag(
    categoryId: string,
    updatedCategoryAndTag: databaseCategory
  ) {
    this.http
      .put<Category>(CATEGORY_BY_ID_URL + categoryId, updatedCategoryAndTag)
      .subscribe((data) => {});
  }

  removeCategoryAndTag(categoryId: string) {
    this.http
      .delete<Category>(CATEGORY_BY_ID_URL + categoryId)
      .subscribe((data) => {});
  }

  addNewProduct(newProduct: databaseProduct): void {
    this.http
      .post<Product>(PRODUCTS_URL, newProduct)
      .subscribe((newProduct) => {});
  }

  updateProduct(productId: string, updatedProduct: databaseProduct): void {
    this.http
      .put<Product>(PRODUCT_BY_ID_URL + productId, updatedProduct)
      .subscribe((data) => {});
  }

  removeProduct(productId: string) {
    this.http
      .delete<Product>(PRODUCT_BY_ID_URL + productId)
      .subscribe((data) => {});
  }
}
