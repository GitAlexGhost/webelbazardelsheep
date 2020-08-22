import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemDescripcionProducto, DatosProducto } from '../interfaces/itemproducto-descripcion';
import { promise } from 'protractor';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  productos: any[] = [];
  setItemsProductos: DatosProducto[] = [];
  productofiltro: DatosProducto[] = [];
  nose: any[] = [1, 2 , 3 , 4];
  lala: ItemDescripcionProducto[] = [];

  constructor(private http: HttpClient) {
    this.obtenerProductos();
    this.obtenerProductos_item();
  }

  private obtenerProductos() {
    this.http.get('https://elbazardelsheep.firebaseio.com/productos_idx.json')
    .subscribe((resp: any[]) => {
      this.productos = resp;
      console.log('obtener productos');
      console.log(resp);
      });
  }
  private obtenerProductos_item() {

    return new Promise( (resolve, reject) => {
      this.http.get('https://elbazardelsheep.firebaseio.com/productos_idx.json')
    .subscribe((resp: ItemDescripcionProducto[]) => {
      this.setItemsProductos = resp;
      console.log(resp);
      resolve();
      });
    });
  }
  obtenerUrl(id: string){
  return this.http.get(`https://elbazardelsheep.firebaseio.com/productos/${ id }.json`);
  }
  BuscarProducto(termino: string){
    console.log(this.setItemsProductos.length);
    if (this.setItemsProductos.length === 0){
    this.obtenerProductos_item().then( () => {
      this.filtrarProductos( termino );
      console.log('si');
    });
    }else{
      this.filtrarProductos( termino );
      console.log('no');
    }
    /*this.productofiltro = Object.values(this.setItemsProductos).filter( producto => {
      return true;
    });*/
  }
  private filtrarProductos( termino: string){
    this.productofiltro = [];
    this.setItemsProductos.forEach( prod => {
      const terminoTmp = termino.toLocaleLowerCase();
      const tituloTmp = prod.titulo.toLocaleLowerCase();
      const catTemp = prod.categoria.toLocaleLowerCase();
      if ( catTemp.indexOf( terminoTmp ) >= 0 || tituloTmp.indexOf( terminoTmp ) >= 0 ){
        this.productofiltro.push(prod);
      }
    });
  }
}
