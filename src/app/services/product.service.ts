import { computed, Injectable, signal, WritableSignal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public productsSignal: WritableSignal<Product[]> = signal([
    { id: 1, name: 'Apple', price: 1000, category: 'smartphone' },
    { id: 2, name: 'Samsung', price: 500, category: 'watch' },
    { id: 3, name: 'One Plus', price: 800, category: 'Tablet' }
  ]);

  updatedProductList = computed(() => this.productsSignal());


  get products() {
    return this.productsSignal();
  }

  addProduct(product: Product) {
    product.id = Math.floor(Math.random() * 1000000);
    this.productsSignal.update(products => [...products, product]);
  }

  updateProduct(updatedProduct: Product) {
    this.productsSignal.update(products =>
      products.map(product => product.id === updatedProduct.id ? updatedProduct : product)
    );
  }

  deleteProduct(productId: number) {
    this.productsSignal.update(products => products.filter(product => product.id !== productId));
  }
}
