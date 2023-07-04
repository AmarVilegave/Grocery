import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { AdminService } from 'src/app/Services/admin.service';
import { LoginService } from 'src/app/Services/login.service';
import { Category } from 'src/app/shared/classes/Category';
import { Observable } from 'rxjs';
import { databaseAdmin } from 'src/app/shared/interfaces/databaseAdmin';
@Component({
  selector: 'app-admin-categories-page',
  templateUrl: './admin-categories-page.component.html',
  styleUrls: ['./admin-categories-page.component.css'],
})
export class AdminCategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  categoriesFilter: Category[] = [];
  searchTerm: string = '';
  admin!:databaseAdmin

  constructor(
    private productService: ProductService,
    private adminService: AdminService,
    private loginService: LoginService
  ) {
    let categoriesObservable: Observable<Category[]>;
    categoriesObservable = this.productService.getAllCategories();
    categoriesObservable.subscribe((serverCategories) => {
      this.categories = serverCategories;
      this.categoriesFilter = this.categories;
    });

    this.loginService.getAdminObservable().subscribe((sessionAdmin) => {
      this.admin = sessionAdmin;
    });
  }

  removeCategoryAndTag(categoryId: string) {
    this.adminService.removeCategoryAndTag(categoryId);
    alert('Product Removed Successfully');
    window.location.reload()
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
