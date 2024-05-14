import { Injectable } from '@angular/core';

/* provideIn: 'root' permite que el modulo este a toda la aplicación */
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];

  constructor() {}

  public get tagsHistory(): string[] {
    /* Operador ... spred para pasar una copia por valor y no por referencia */
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    if(this._tagsHistory.includes(tag)){
      /* Esta función deja pasar a los que son diferentes al tag, el que es igual lo elimina */
      /* Con filter se devuelve un nuevo array */
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    /* Se corta del 0 a la posición 10 */
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
  }
}
