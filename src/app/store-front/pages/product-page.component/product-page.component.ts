import { Component, inject, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop'; //importar rxResource
import { ActivatedRoute } from '@angular/router';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page.component',
  imports: [ProductCarousel],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  // productIdSlug = input.required<Product>();

  activateRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);

  productIdSlug = this.activateRoute.snapshot.params['idSlug'];

  hola: string = 'men_chill_quarter_zip_pullover_-_white';
  //para obtener el resultado de búsqueda y para ver los estados de carga
  productsResource = rxResource({
    //rxResource es un manejador de estados para datos asíncronos
    //dispara la carga de datos
    request: () => ({ idSlug: this.productIdSlug }),


    //carga los datos
    loader: ({ request }) => {
      return this.productsService.getProductByIdSlug(request.idSlug); //llama al servicio para obtener el producto por idSlug
      // this.productsService.getProductByIdSlug(request.idSlug);
      console.log(request.idSlug);
    },
  });

  // has un trycatch para el metodo de arriba


}
