import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable} from 'rxjs';
import { AdminService } from 'src/app/Services/admin.service';
import { ProductService } from 'src/app/Services/product.service';
import { Category } from 'src/app/shared/classes/Category';
import { Product } from 'src/app/shared/classes/Product';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {
  product: Product = new Product();
  categories: Category[] = [];
  tagObject = new Set();
  categoryObject: Category[];
  isAddProduct: boolean = true;

  constructor(private fb:FormBuilder,
    private adminService: AdminService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    ) {
      let categoriesObservable: Observable<Category[]>;
    categoriesObservable = productService.getAllCategories();
    categoriesObservable.subscribe((serverCategories) => {
      this.categories = serverCategories;
      console.log(this.categories);
      this.getTagsFromCategory();
    });
    this.productDetailsForm
      .get('categoryObject.tag')
      .valueChanges.subscribe((x) => {
        this.productDetailsForm.get('categoryObject.category').setValue(null);
        this.updateCategoryObject(x);
      });
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.isAddProduct = false;
        productService.getProductById(params.id).subscribe((product) => {
          this.product = product;
          this.defaultFormValues();
        });
      }
    });
    }

  productDetailsForm = this.fb.group({
    productName: ['', [Validators.required]],
    categoryObject: this.fb.group({
      category: ['', [Validators.required]],
      tag: ['', Validators.required],
    }),
    price: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    quantity: ['', [Validators.required, Validators.pattern('^[0-9]{2}$')]],
    image: ['', [Validators.required]],
    description: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  checkFormErrors(dataObj: FormGroup) {
    let controlErrors: ValidationErrors = [];
    Object.keys(dataObj.controls || {}).forEach((key) => {
      if (typeof dataObj.get(key).value !== 'object') {
        // console.log(dataObj.get(key).errors);
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
    this.productDetailsForm.setValue({
      productName: this.product.name,
      categoryObject: {
        category: this.product.category.category,
        tag: this.product.category.tag,
      },
      price: this.product.price.toString(),
      weight: this.product.weight,
      quantity: this.product.quantity.toString(),
      image: this.product.image[0],
      description: this.product.description,
    });
  }

  getTagsFromCategory() {
    this.categories.forEach((category) => {
      this.tagObject.add(category.tag);
    });
  }

  addNewProduct() {
    const obj = this.categories.find(
      (ele) =>
        ele.category ===
        this.productDetailsForm.get('categoryObject.category').value
    );
    const newProduct = {
      name: this.productDetailsForm.get('productName').value,
      categoryId: obj._id,
      price: parseInt(this.productDetailsForm.get('price').value),
      quantity: parseInt(this.productDetailsForm.get('quantity').value),
      weight: this.productDetailsForm.get('weight').value,
      image: [this.productDetailsForm.get('image').value],
      description: this.productDetailsForm.get('description').value,
    };
    this.adminService.addNewProduct(newProduct);
    window.location.reload();
    alert('New Product Added Successfully');
  }

  updateProduct(productId: string) {
    const obj = this.categories.find(
      (ele) =>
        ele.category ===
        this.productDetailsForm.get('categoryObject.category').value
    );
    const updatedProduct = {
      name: this.productDetailsForm.get('productName').value,
      price: parseInt(this.productDetailsForm.get('price').value),
      quantity: parseInt(this.productDetailsForm.get('quantity').value),
      weight: this.productDetailsForm.get('weight').value,
      categoryId: obj._id,
      image: this.product.image,
      description: this.productDetailsForm.get('description').value,
    };
    this.product.name = this.productDetailsForm.get('productName').value;
    this.product.price = parseInt(this.productDetailsForm.get('price').value);
    this.product.quantity = parseInt(
      this.productDetailsForm.get('quantity').value
    );
    this.product.weight = this.productDetailsForm.get('weight').value;
    this.product.description = this.productDetailsForm.get('description').value;

    this.adminService.updateProduct(productId, updatedProduct);
    alert('Product updated Successfully');
  }

  updateCategoryObject(tagName: string) {
    this.categoryObject = this.categories.filter((val) => val.tag === tagName);
  }

  onSubmit(productId: string) {
    this.updateProduct(productId);
  }

}
