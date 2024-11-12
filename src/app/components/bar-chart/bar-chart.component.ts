import { Component, effect, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { BarChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BarChartModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {

  productService = inject(ProductService)

  chartData: { name: string; value: number }[] = [];
  productsList = this.productService.updatedProductList;

  constructor() {
    this.updateChartData();
    effect(() => this.updateChartData());
  }

  ngOnInit() {
  }

  updateChartData() {
    // console.log('bar chart', this.productsList());
    this.chartData = this.productsList().map((product) => ({
      name: product.name,
      value: product.price,
    }));
  }

}
