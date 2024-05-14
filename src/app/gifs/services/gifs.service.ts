import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchResponse, Gif } from './../interfaces/gifs.interfaces';

/* provideIn: 'root' permite que el modulo este a toda la aplicación */
@Injectable({
  providedIn: 'root',
})
export class GifsService {

  public _gifList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private _apiKey: string = 'qlwxv2euwy4SBuV28SLfpliGurdnfwqY';

  private _http: HttpClient;

  private _serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(http: HttpClient) {
    this._http = http;
  }

  public get tagsHistory(): string[] {
    /* Operador ... spred para pasar una copia por valor y no por referencia */
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      /* Esta función deja pasar a los que son diferentes al tag, el que es igual lo elimina */
      /* Con filter se devuelve un nuevo array */
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    /* Se corta del 0 a la posición 10 */
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', 10)
      .set('q',tag)
    /*
    1. HTTP CLIENT Es un Observable : objeto que a lo largo del tiempo puede emitir valores, entonces se puede subscribir a este observable
    2. Se debe saber la información de la respuesta, para eso se usa quicktype.io
    3. Se debe colocar el tipo de interfaz/contrato de la respuesta en el htpp.get<tipo de respuesta>('url', {params})+
    4. Las interfaces en typescript no fuerzan a que un objeto luzca se esa manera, solo es una guía
    */
    this._http.get<SearchResponse>(`${this._serviceUrl}/search`, {params})
      .subscribe(resp => {
        this._gifList = resp.data;
      });
  }

  private saveLocalStorage():void{
    /* LOCALSTORAGE solo permite guardar strings por lo tanto se usa JSON para transformar esta información de un objeto como un string */
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }
  /*Se pueden realizar promesas como se hace con JS
  public async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    await fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=qlwxv2euwy4SBuV28SLfpliGurdnfwqY&q=Valorant&limit=10'
    )
      .then((resp) => resp.json())
      .then((data) => console.log(data));

    TAMBIEN SE PUEDE HACER ASÍ:
    const resp= await fetch('https://api.giphy.com/v1/gifs/search?api_key=qlwxv2euwy4SBuV28SLfpliGurdnfwqY&q=Valorant&limit=10')
    const data = await resp.json();
    console.log(data);

  }*/
}
