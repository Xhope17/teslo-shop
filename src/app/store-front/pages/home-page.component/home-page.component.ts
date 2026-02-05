// import { ProductCard } from '@/app/products/components/product-card/product-card';
// import { ProductCard } from '@/products/components/product-card/product-card';
import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
// import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductsService } from '../../../products/services/products.service';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { Observable } from 'rxjs';

import { rxResource } from '@angular/core/rxjs-interop'; //importar rxResource

@Component({
  selector: 'app-home-page.component',
  imports: [ProductCard],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productsService = inject(ProductsService);

  //para cargar la información de productos usando rxResource - para ver el estado de la carga
  productsResource = rxResource({
    //rxResource es un manejador de estados para datos asíncronos
    //dispara la carga de datos
    request: () => ({}),

    //carga los datos
    loader: ({ request }) => {
      return this.productsService.getProducts({});
    },
  });
}
