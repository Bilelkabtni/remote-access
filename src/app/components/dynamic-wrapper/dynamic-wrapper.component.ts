import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  inject,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ComponentRegistryService } from '../registry.service';

@Component({
  selector: 'dynamic-wrapper',
  standalone: true,
  template: `<ng-container #container></ng-container>`,
})
export class DynamicWrapperComponent implements OnInit, OnChanges {
  @Input() componentName!: string;
  @Input() componentInputs: Record<string, any> = {};

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private registry = inject(ComponentRegistryService);
  private elRef = inject(ElementRef);

  ngOnInit() {
    // Read inputs from attributes if inputs are not provided
    if (!this.componentName) {
      this.componentName = this.elRef.nativeElement.getAttribute('componentName');
    }

    if (!this.componentInputs || Object.keys(this.componentInputs).length === 0) {
      const raw = this.elRef.nativeElement.getAttribute('componentInputs');
      if (raw) {
        try {
          this.componentInputs = JSON.parse(raw);
        } catch (err) {
          console.error('Invalid JSON for componentInputs:', raw);
        }
      }
    }

    this.loadComponent();
  }

  ngOnChanges(changes: SimpleChanges) {
    // If inputs change, reload the component
    if (changes['componentName'] || changes['componentInputs']) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    if (!this.componentName) {
      console.warn('No componentName specified');
      return;
    }

    const component = this.registry.getComponent(this.componentName);
    if (!component) {
      console.warn(`Component "${this.componentName}" not found in registry.`);
      return;
    }
    // Clear previous components before creating a new one
    this.container.clear();
    const compRef = this.container.createComponent(component);
    Object.entries(this.componentInputs || {}).forEach(([key, value]) => {
      (compRef.instance as any)[key] = value;
    });
  }
}
