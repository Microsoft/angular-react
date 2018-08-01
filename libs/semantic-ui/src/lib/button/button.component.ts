// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sem-button',
  exportAs: 'semButton',
  template: `
    <Button
      [primary]="primary"
      [secondary]="secondary"
      [disabled]="disabled"
      [loading]="loading"
      [content]="content"
      (onClick)="onClick.emit($event)"
    ></Button>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sem-button' },
})
export class SemButtonComponent {
  @Input() disabled = false;
  @Input() primary = false;
  @Input() secondary = false;
  @Input() loading = false;
  @Input('label') content = '';

  @Output() readonly onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
}
