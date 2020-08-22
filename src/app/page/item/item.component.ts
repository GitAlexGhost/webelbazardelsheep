import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ItemService } from '../../services/item.service';
import { ItemDescripcionProducto } from 'src/app/interfaces/itemproducto-descripcion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ItemDescripcionProducto;
  id: string;
  constructor(private route: ActivatedRoute, public itemServicio: ItemService) { }

  ngOnInit(): void {

      this.route.params
      .subscribe(parametrosItem => {
        console.log(parametrosItem.id);
        this.itemServicio.obtenerUrl(parametrosItem.id)
        .subscribe((itemproducto: ItemDescripcionProducto) => {
          console.log(itemproducto);
          this.id = parametrosItem.id;
          this.producto = itemproducto;
        });

      });

  }

}
