import { Component, OnInit } from '@angular/core';
import { VerseService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  verses: Array<any>;

  constructor(private verse: VerseService) {}

  ngOnInit() {
    this.verse.getAll().subscribe(all => {
      this.verses = Object.values(all).reverse();
    });
  }
}
