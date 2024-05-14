import { Component } from '@angular/core';

import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

 private _gifsService: GifsService;

  constructor(gifsService: GifsService) {
    this._gifsService = gifsService;
  }

  public get gifs():Gif[]{
    return this._gifsService._gifList
  }
}
