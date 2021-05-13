import { kebabCase } from './kebab-case';

/**
 * Gets the data attributes on an `HTMLElement`.
 *
 * @example
```keepDataPrefix === false```:
```html
<div data-service="Foo" data-service-type="bar"></div> -> { 'service': 'Foo', 'service-type': 'Bar' }
```

```keepDataPrefix === true```:
```html
<div data-service="Foo" data-service-type="bar"></div> -> { 'data-service': 'Foo', 'data-service-type': 'Bar' }
```
 */
export function getDataAttributes<T extends HTMLElement>(
  element: T,
  keepDataPrefix: boolean = false
): Record<string, string> {
  return Object.entries(element.dataset).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [calculateKey(key, keepDataPrefix)]: value,
    }),
    {}
  );
}

function calculateKey(key: string, keepDataPrefix: boolean): string {
  return `${keepDataPrefix && 'data-'}${kebabCase(key)}`;
}
