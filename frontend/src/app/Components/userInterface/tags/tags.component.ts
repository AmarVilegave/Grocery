import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/Services/product.service';
import { Category } from 'src/app/shared/classes/Category';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  categories: Category[] = [];
  tagObject = new Set();
  selectedTag = '';
  serviceTag: string;

  constructor(private productService: ProductService) {
    let categoriesObservable: Observable<Category[]>;
    categoriesObservable = this.productService.getAllCategories();
    categoriesObservable.subscribe((serverCategories) => {
      this.categories = serverCategories;
      this.getTagsFromCategories();
    });

    let tagObservable: Observable<string>;
    tagObservable = this.productService.getSelectedTagObservable();
    tagObservable.subscribe((serviceTag) => {
      this.serviceTag = serviceTag;
    });
   }

  ngOnInit(): void {
  }

  getTagsFromCategories() {
    this.categories.forEach((category) => {
      this.tagObject.add(category.tag);
    });
  }

  setNewTag(tag: string) {
    this.productService.setNewTag(tag);
  }

  selectActiveTag(tag: unknown) {
    this.serviceTag = tag as string;
    if (this.serviceTag) {
      console.log('selected tag', this.serviceTag);
      this.setNewTag(this.serviceTag);
      return true;
    } else return false;
  }

  toggleActiveTag(tag: unknown) {
    if (tag == this.serviceTag) return true;
    else return false;
  }

}
