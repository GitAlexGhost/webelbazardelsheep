import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina, InfoEquipo } from '../interfaces/info-pagina.interface';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;
  equipo2: any[] = [];
  equipo: InfoEquipo = {};
  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
    this.cargarEquipoForma2();
  }

  private cargarInfo() {

    console.log('Servicio infopagina');
    this.http.get('assets/data/data-pagina.json')
    .subscribe((resp: InfoPagina) => {
      this.cargada = true;
      this.info = resp;
      console.log(resp);
    });
  }

  private cargarEquipo() {
    this.http.get('https://elbazardelsheep.firebaseio.com/equipo.json')
    .subscribe((resp: InfoEquipo) => {
      console.log('Servicio Equipo');
      this.equipo = resp;
      console.log(resp);
    });
  }
  // es una forma directa de obtener datos sin ser validados por el constructor o interface
  private cargarEquipoForma2() {
    this.http.get('https://elbazardelsheep.firebaseio.com/equipo.json')
    .subscribe((resp: any) => {
      console.log('Servicio Equipo 2');
      this.equipo2 = resp;
      console.log(resp);
    });
  }
}

