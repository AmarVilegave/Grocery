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
      .subscribe((newCategoryAndTag) => {
        console.log(newCategoryAndTag);
      });
  }

  updateCategoryAndTag(
    categoryId: string,
    updatedCategoryAndTag: databaseCategory
  ) {
    this.http
      .put<Category>(CATEGORY_BY_ID_URL + categoryId, updatedCategoryAndTag)
      .subscribe((data) => {
        console.log(data);
      });
  }

  removeCategoryAndTag(categoryId: string) {
    this.http
      .delete<Category>(CATEGORY_BY_ID_URL + categoryId)
      .subscribe((data) => {
        console.log(data);
      });
  }

  addNewProduct(newProduct: databaseProduct): void {
    this.http
      .post<Product>(PRODUCTS_URL, newProduct)
      .subscribe((newProduct) => {
        console.log(newProduct);
      });
  }

  updateProduct(productId: string, updatedProduct: databaseProduct): void {
    this.http
      .put<Product>(PRODUCT_BY_ID_URL + productId, updatedProduct)
      .subscribe((data) => {
        console.log(data);
      });
  }

  removeProduct(productId: string) {
    this.http
      .delete<Product>(PRODUCT_BY_ID_URL + productId)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
