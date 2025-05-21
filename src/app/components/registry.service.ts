import { Injectable, Type } from "@angular/core";
import { ProductDetailsComponent } from "./product-details/product-details.component";
import { ProductTitleComponent } from "./product-title/product-title.component";

@Injectable({ providedIn: 'root' })
export class ComponentRegistryService {
  private registry: Record<string, any> = {
    'app-product-title': ProductTitleComponent,
    'app-product-details': ProductDetailsComponent,
  };

  getComponent(name: string): Type<unknown> | null {
    return this.registry[name] || null;
  }
}
