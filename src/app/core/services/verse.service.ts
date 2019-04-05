import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Verse } from '../models';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerseService {
  // array containing each day, starting with Domingo.
  weekDays = [
    'Dom', 'Seg', 'Ter', 'Qua',
    'Qui', 'Sex', 'Sáb'
  ];
  verses: Observable<any>;

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.object('/verses').valueChanges();
  }

  getOne(id: string) {
    return this.db.object(`/verses/${id}`).valueChanges();
  }

  create(verse: Verse): Promise<any> {
    return new Promise(resolve => {
      verse['time'] = new Date().getTime();
      this.db.list('/verses').push(verse)
        .then(() => resolve('null'))
        .catch(err => resolve(err));
    });
  }

  update(value: Verse, id: string): Promise<any> {
    return new Promise(resolve => {
      const newVal = {
        title: value.title.trim(),
        verse: value.verse.trim(),
        time: new Date().getTime()
      };
      this.db.object(`verses/${id}`).update(newVal)
        .then(() => resolve(null))
        .catch(() => resolve('error'));
    });
  }

  delete(id: string): Promise<void> {
    return new Promise(resolve => {
      this.db.object(`verses/${id}`).remove()
        .then(() => resolve(null))
        .catch(err => resolve(err));
    });
  }

  /*
  * Transforma de timestamp para dd/mm/aaaa
  * @param time = timestamp do verse
  **/
  getDate(time: number): string {
    const timePost = new Date(time);
    // params de formatação
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    };
    // diaSemana + formatado
    return this.weekDays[timePost.getDay()] + ', ' +
      timePost.toLocaleDateString(undefined, options);
  }

}
