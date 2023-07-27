import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Category } from 'src/app/shared/classes/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tags: any[] = [
    {
      tagName: 'Fruits & Vegetables',
      tagImage: '../../../../assets/tagImg/fruitsandvegetables.jpg',
    },
    {
      tagName: 'Dairy & Breakfast',
      tagImage: '../../../../assets/tagImg/dairyandbreakfast.jpg',
    },
    {
      tagName: 'Cold Drinks & Juices',
      tagImage: '../../../../assets/tagImg/colddrinks&juices.jpg',
    },
    {
      tagName: 'Cookies & Cream Biscuits',
      tagImage: '../../../../assets/tagImg/cookiesandcreambiscuits.jpg',
    },
    {
      tagName: 'Dry Fruits, Spices & Oil',
      tagImage: '../../../../assets/tagImg/dryfruitsspicesandoil.jpg',
    },
    {
      tagName: 'Atta, Rice & Dal',
      tagImage: '../../../../assets/tagImg/attarice&dal.jpg',
    },
  ];

  categories: Category[] = [];
  tagObject = new Set();
  selectedTag: string;
  selectedCategory: string;

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
  }

  setNewTag(tag: string) {
    this.productService.setNewTag(tag);
  }

  selectActiveTag(tag: string) {
    this.selectedTag = tag;
    if (this.selectedTag) {
      this.setNewTag(this.selectedTag);
      return true;
    } else return false;
  }

}
