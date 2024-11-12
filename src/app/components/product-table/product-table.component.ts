import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {

  productService = inject(ProductService);
  fb = inject(FormBuilder);

  products: Product[] = [];
  productForm: FormGroup;
  displayDialog = false;
  // selectedProduct: Product | null = null;

  productsList = this.productService.updatedProductList;

  constructor() {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
    });
  }

  ngOnInit() {
    // debugger;
  }

  //region same dialog for add & edit the product
  showDialog(type: string, product?: Product) {
    this.productForm.reset();
    if (type === 'addProduct') {
      this.displayDialog = true;
      this.productForm.patchValue({ name: '', price: 0, category: '' });
    } else {
      this.displayDialog = true;
      if (product) {
        this.productForm.patchValue(product);
      }
    }
  }

  saveProduct() {
    const product = this.productForm.value;

    product.id
      ? this.productService.updateProduct(product)
      : this.productService.addProduct(product);
    this.displayDialog = false;
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
