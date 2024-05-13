import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from './../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  /* #txtTagInput es una referencia local, que hace que el input se conozca así a lo largo de todo el template, ahora se puede usar txtTagInput.value y obtener el valor del input */
  /* (keyup.enter) que funcione el keyup cuando la persona presione enter, esta solución es brindada por angular */
  /* @ViewChild, sirve para tomar una referencia local */
  /* @ViewChildren, sirve en el caso de tener varios elementos html y queramos devolver un arreglo con el */
  template: `
    <h5>Buscar</h5>
    <input
      type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `,
})
export class SearchBoxComponent {
  /* ! Not Null Operator, diciendo que siempre va a tener un valor*/
  /* Estas instrucciones permiten referenciar a un elemento HTML, en este caso al input */
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  private _gifsService: GifsService;

  /* El constructor también se puede declarar de la siguiente manera:
  constructor (private gifsService: GifService){} */

  /* Los servicios siempre se inyectan en el constructor */
  constructor(gifsServices: GifsService){
    this._gifsService = gifsServices;
  }

  /* public searchTag(newTag: string): void  */
  public searchTag(): void {
    /* Ahora tomamos el valor del tagInput que esta arriba para traer la propiedad value */
    const newTag = this.tagInput.nativeElement.value;
    this._gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
