// import { ProductCard } from '@/app/products/components/product-card/product-card';
// import { ProductCard } from '@/products/components/product-card/product-card';
import { Component, inject } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
// import { ProductCard } from "../../../products/components/product-card/product-card";
import { ProductsService } from '../../../products/services/products.service';

import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '@shared/components/pagination/pagination'; //importar rxResource
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page.component',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  productsService = inject(ProductsService);

  paginationService = inject(PaginationService);
  // ActivatedRoute = inject(ActivatedRoute);

  // currentPage = toSignal(
  //   this.ActivatedRoute.queryParamMap.pipe(
  //     map((params) => (params.get('page') ? +params.get('page')! : 1)),
  //     map((page) => (isNaN(page) ? 1 : page)),
  //   ),
  //   {
  //     initialValue: 1,
  //   },
  // );

  //para cargar la información de productos usando rxResource - para ver el estado de la carga
  productsResource = rxResource({
    //rxResource es un manejador de estados para datos asíncronos
    //dispara la carga de datos
    request: () => ({ page: this.paginationService.currentPage() - 1 }),

    //carga los datos
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: request.page * 9,
      });
    },
  });
}
