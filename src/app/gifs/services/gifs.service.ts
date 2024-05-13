import { Injectable } from '@angular/core';

/* provideIn: 'root' permite que el modulo este a toda la aplicación */
@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  public get tagsHistory() {
    /* Operador ... spred para pasar una copia por valor y no por referencia */
    return [...this._tagsHistory];
  };

  public searchTag(tag:string):void{
    this._tagsHistory.unshift(tag);
  };
}
