import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public itemService: ItemService,
              public productosService: ProductosService ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(params => {
        this.itemService.BuscarProducto(params.termino);
        console.log( params.termino );
    });
  }

}
