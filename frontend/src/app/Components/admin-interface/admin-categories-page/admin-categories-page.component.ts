import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { AdminService } from 'src/app/Services/admin.service';
import { Category } from 'src/app/shared/classes/Category';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-categories-page',
  templateUrl: './admin-categories-page.component.html',
  styleUrls: ['./admin-categories-page.component.css'],
})
export class AdminCategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  categoriesFilter: Category[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
  ) {
    let categoriesObservable: Observable<Category[]>;
    categoriesObservable = this.productService.getAllCategories();
    categoriesObservable.subscribe((serverCategories) => {
      this.categories = serverCategories;
      this.categoriesFilter = this.categories;
    });
  }

  removeCategoryAndTag(categoryId: string) {
    this.adminService.removeCategoryAndTag(categoryId);
    alert('Product Removed Successfully');
  }

  searchCategoryAndTag(term: string) {
    if (term) {
      this.categoriesFilter = this.categories.filter(
        (object) =>
          object.category.toLowerCase().includes(term.toLowerCase()) ||
          object.tag.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      this.categoriesFilter = this.categories;
    }
  }

  ngOnInit(): void {}
}
