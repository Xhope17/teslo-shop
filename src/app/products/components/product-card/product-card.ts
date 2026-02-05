import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<Product>(); //hace que sea obligatorio mandar un valor al componente

  // imageUrl = computed(() => {
  //   if (this.product().images.length === 0) {
  //     return 'https://via.placeholder.com/150';
  //   }
  //   return `http://localhost:3000/api/files/product/${this.product().images[0]}`;
  // });
}
