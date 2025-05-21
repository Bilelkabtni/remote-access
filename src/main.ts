import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { createCustomElement } from '@angular/elements';
import { DynamicWrapperComponent } from './app/components/dynamic-wrapper/dynamic-wrapper.component';


bootstrapApplication(AppComponent, appConfig)
.then((moduleRef) => {
  const injector = moduleRef.injector;
  console.log('okkkkk')
  const element = createCustomElement(DynamicWrapperComponent, { injector });
  customElements.define('dynamic-wrapper', element);
}).catch((err) => console.error(err));
