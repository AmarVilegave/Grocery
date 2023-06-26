import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/classes/Category';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  categories: Category[];
  selectedCategory: string;
  selectedTag: string;

  constructor(private productService:ProductService) {
    console.log('categories', this.categories)
    let categoryObservable: Observable<Category[]>;
    categoryObservable = this.productService.getAllCategories();
    categoryObservable.subscribe((serverCategories) => {
      this.categories = serverCategories;
      console.log('categories', this.categories)
    });

    let selectedCategoryObservable: Observable<string>;
    selectedCategoryObservable =
      this.productService.getSelectedCategoryObservable();
    selectedCategoryObservable.subscribe((serviceCategory) => {
      this.selectedCategory = serviceCategory;
    });

    let selectedTagObservable: Observable<string>;
    selectedTagObservable = this.productService.getSelectedTagObservable();
    selectedTagObservable.subscribe((serviceTag) => {
      this.selectedTag = serviceTag;
    });
  }

  ngOnInit(): void {
  }

  selectCategoryAndTag(category: string, tag: string) {
    this.productService.selectNewCategory(category);
    this.productService.setNewTag(tag);
  }

  selectActiveCategoryAndTag(category: string, tag: string) {
    // console.log('footer tag', tag), (this.selectedTag = tag);
    this.selectedCategory = category;
    this.selectedTag = tag;

    if (this.selectedTag && this.selectedCategory) {
      // console.log('footer selected tag', this.selectedTag);
      // console.log('footer selected tag', this.selectedTag);
      this.selectCategoryAndTag(this.selectedCategory, this.selectedTag);
      return true;
    } else return false;
  }
}
