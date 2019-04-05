import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService, VerseService, About, Verse } from '../core';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  about: About;
  verse: Verse = { title: '', verse: '', time: 0 };
  verses: Array<Verse>;
  editing = false;
  id = this.route.snapshot.paramMap.get('id');
  verseId: string;

  constructor(private user: UserService,
    private vrse: VerseService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.user.getAll().subscribe((a: About) => {
      this.about = a;
    });
    this.vrse.getAll().pipe(first()).subscribe((a: Verse[]) => {
      if (this.id) {
        this.verseId = Object.keys(a).reverse()[this.id];
        this.vrse.getOne(this.verseId)
          .pipe(first()).subscribe((v: Verse) => this.verse = v);
      } else {
        this.verses = Object.values(a).reverse();
      }
    });
  }

  edit(): void {
    if (this.editing) {
      this.user.update(this.about)
        .then(() => this.editing = false);
    } else {
      this.editing = true;
    }
  }

  editV(): void {
    this.vrse.update(this.verse, this.verseId)
      .then(err => console.log(err));
  }

  delV(): void {
    this.vrse.delete(this.verseId)
      .then(err => console.log(err));
  }

  versar(): void {
    this.vrse.create(this.verse)
      .then(err => {
        if (err === null) {
          this.vrse = null;
        } else {
          console.log(err);
        }
      });
  }

}
