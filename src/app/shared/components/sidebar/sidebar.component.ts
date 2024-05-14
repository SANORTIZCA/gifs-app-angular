import { Component } from '@angular/core';

import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  /* Como el servicio es privado no se puede acceder desde el HTMl por lo tanto es necesario un método getter para darselo al HTML*/
  private _gifsService: GifsService;

  constructor(gifsSerive: GifsService){
    this._gifsService = gifsSerive;
  }

  public get tags(): string[]{
    return this._gifsService.tagsHistory;
  }

  public searchTag(tag: string): void{
    this._gifsService.searchTag(tag);
  }
}
