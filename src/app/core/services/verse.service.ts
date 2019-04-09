import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Verse } from '../models';
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
      verse = {
        title: verse.title.trim(),
        verse: verse.verse.trim(), time: 0 }
      if (verse.title.length > 0 && verse.verse.length > 0) {
        verse['time'] = new Date().getTime();
        this.db.list('/verses').push(verse)
          .then(() => resolve('Verso criado com sucesso'))
          .catch(err => resolve(err));
      } else {
        resolve('Opa! Digite o verso completo');
      }
    });
  }

  update(value: Verse, id: string): Promise<any> {
    return new Promise(resolve => {
      const newVal = {
        title: value.title.trim(),
        verse: value.verse.trim(),
        time: new Date().getTime()
      };
      if (newVal.title.length > 0 && newVal.verse.length > 0) {
        this.db.object(`verses/${id}`).update(newVal)
          .then(() => resolve('Verso editado com sucesso'))
          .catch(err => resolve(err));
      } else {
        resolve('Opa! Digite o verso completo');
      }
    });
  }

  delete(id: string): Promise<any> {
    return new Promise(resolve => {
      this.db.object(`verses/${id}`).remove()
        .then(() => resolve('Verso removido com sucesso'))
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
