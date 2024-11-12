import { Component } from '@angular/core';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductTableComponent, BarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crudApp';
}
