const fs = require('fs');

const BASE_URL = 'https://your-cdn.com/your-app/main.js';

const components = [
  {
    name: 'product-tile',
    selector: 'dynamic-wrapper',
    inputs: {
      componentName: 'product-tile',
      componentInputs: {
      }
    }
  },
  {
    name: 'user-card',
    selector: 'dynamic-wrapper',
    inputs: {
      componentName: 'user-card',
      componentInputs: {
      }
    }
  },
  {
    name: 'promotion-banner',
    selector: 'dynamic-wrapper',
    inputs: {
      componentName: 'promotion-banner',
      componentInputs: {
      }
    }
  }
];

const registry = {
  components: components.map(component => ({
    name: component.name,
    container: true,
    url: BASE_URL,
    selector: component.selector,
    inputs: component.inputs
  }))
};

fs.writeFileSync('registry.json', JSON.stringify(registry, null, 2));
console.log('✅ registry.json has been generated!');
