import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
