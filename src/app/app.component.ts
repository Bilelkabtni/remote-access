import { Component, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { ProductTitleComponent } from './components/product-title/product-title.component';
import { DynamicWrapperComponent } from './components/dynamic-wrapper/dynamic-wrapper.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicWrapperComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'external-cmp';
  constructor(private injector: Injector) {
  }
}
