import { Injectable } from '@angular/core';
import {
  CATEGORY_BY_ID_URL,
  PRODUCT_BY_CATEGORY_URL,
  PRODUCT_BY_TAG_URL,
  CATEGORIES_URL,
  PRODUCTS_URL,
  PRODUCT_BY_ID_URL,
} from './../shared/constants/urls';
import { Product } from '../shared/classes/Product';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../shared/classes/Category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedTag: string = '';
  selectedCategory: string = '';
  tagSubject = new BehaviorSubject(this.selectedTag);
  categorySubject = new BehaviorSubject(this.selectedCategory);
  products: Product = this.getProductFromLocalStorage();
  productSubject: BehaviorSubject<Product> = new BehaviorSubject(this.products);

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(CATEGORIES_URL);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL);
  }

  getProductById(productId: string): Observable<Product> {
    return this.http.get<Product>(PRODUCT_BY_ID_URL + productId);
  }

  getProductsByTag(tag: string): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_BY_TAG_URL + tag);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_BY_CATEGORY_URL + category);
  }

  getCategoryById(categoryId: string) {
    return this.http.get<Category>(CATEGORY_BY_ID_URL + categoryId);
  }

  getProductObservable() {
    return this.productSubject.asObservable();
  }

  getSelectedTagObservable() {
    return this.tagSubject.asObservable();
  }

  getSelectedCategoryObservable() {
    return this.categorySubject.asObservable();
  }

  getProductFromLocalStorage(): Product {
    const productJson = localStorage.getItem('Products');
    return productJson ? JSON.parse(productJson) : new Product();
  }

  setNewTag(tag: string) {
    console.log('service set new tag', tag);
    this.selectedTag = tag;
    this.tagSubject.next(tag);
    console.log('service select tag', this.selectedTag);
  }

  selectNewCategory(category: string) {
    console.log('service category', category);
    this.selectedCategory = category;
    this.categorySubject.next(category);
    console.log('service selected category', this.selectedCategory);
  }

}
