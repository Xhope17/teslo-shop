import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'; //importar rxResource
import { ProductsService } from '@products/services/products.service';
import { ProductCard } from '@products/components/product-card/product-card';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '@shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page.component',
  imports: [ProductCard, Pagination],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  paginationService = inject(PaginationService);

  gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  //para cargar la información de productos usando rxResource - para ver el estado de la carga
  productsResource = rxResource({
    //rxResource es un manejador de estados para datos asíncronos
    //dispara la carga de datos
    request: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }), //aquí se pone una señal para cuando cambie

    //carga los datos
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page * 9,
      });
    },
  });
}
