import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: any[] = [];
  cargando = true;
  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( ( resolvex , reject) => {
          this.http.get('https://elbazardelsheep.firebaseio.com/productos_idx.json')
        .subscribe((resp: any[]) => {
          console.log('Servicio de productos ');
          this.cargando = false;
          this.productos = resp;
          console.log(resp);
          resolvex();
        });
    } );
  }
}
