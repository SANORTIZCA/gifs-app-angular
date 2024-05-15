import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './gifs-card.component.html',
})

/* OnInit: Es un método especial de angular del ciclo de vida de los componenetes de Angular, que se ejecuta cuando el componente se ha inicializado */
export class GifsCardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  public ngOnInit(): void {
    if(!this.gif) throw new Error('Gif property is required');
  }
}
