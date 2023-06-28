import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ValidationErrors,
} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { ProductService } from 'src/app/Services/product.service';
import { Category } from 'src/app/shared/classes/Category';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  category: Category = new Category();
  categories: Category[] = [];
  tagObject = new Set();
  isAddCategory: boolean = true;
  searchTerm: '';

  constructor(private fb:FormBuilder,    private productService: ProductService,
    private adminService: AdminService, private activatedRoute:ActivatedRoute
    ) {
      let categoriesObservable: Observable<Category[]>;
    categoriesObservable = this.productService.getAllCategories();
    categoriesObservable.subscribe((serverCategories) => {
      this.categories = serverCategories;
      this.getTagsFromCategory();
    });

    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.isAddCategory = false;
        productService.getCategoryById(params.id).subscribe((category) => {
          this.category = category;
          this.defaultFormValues();
        });
      }
    });
     }

  categoryTagDetailsForm = this.fb.group({
    tag: ['', [Validators.required]],
    category: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  checkFormErrors(dataObj: FormGroup) {
    let controlErrors: ValidationErrors = [];
    Object.keys(dataObj.controls || {}).forEach((key) => {
      if (typeof dataObj.get(key).value !== 'object') {
        if (dataObj.get(key).errors) {
          controlErrors.push(dataObj.get(key).errors);
        }
      } else if (typeof dataObj.get(key).value === 'object') {
        this.checkFormErrors(dataObj.get(key) as FormGroup);
      }
    });
    if (controlErrors.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  defaultFormValues() {
    this.categoryTagDetailsForm.setValue({
      category: this.category.category,
      tag: this.category.tag,
    });
  }


  getTagsFromCategory() {
    this.categories.forEach((category) => {
      this.tagObject.add(category.tag);
    });
    console.log(this.tagObject);
  }

  addNewCategoryAndTag() {
    const newCategoryAndTag = {
      category: this.categoryTagDetailsForm.get('category').value,
      tag: this.categoryTagDetailsForm.get('tag').value,
    };
    console.log(this.category);
    this.adminService.addNewCategoryAndTag(newCategoryAndTag);
    alert('New category added successfully');
    window.location.reload();
  }

  updateCategoryAndTag(categoryId: string) {
    const updatedCategoryAndTag = {
      tag: this.categoryTagDetailsForm.get('tag').value,
      category: this.categoryTagDetailsForm.get('category').value,
    };
    this.category.category = this.categoryTagDetailsForm.get('category').value;
    this.category.tag = this.categoryTagDetailsForm.get('tag').value;

    console.log(updatedCategoryAndTag);
    this.adminService.updateCategoryAndTag(
      categoryId,
      updatedCategoryAndTag
    );
    alert('Category updated successfully');
  }

}
