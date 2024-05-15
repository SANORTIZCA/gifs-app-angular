import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public _url!: string;

  @Input()
  public _alt: string = "";

  public _hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this._url) throw new Error('URL property is required.');
  }

  public onLoad(){
    /* Esto hace que nuestras imagenes siempre se demoren un segundo */
    setTimeout(()=>{
      this._hasLoaded = true;

    }, 1000)
  }
}
