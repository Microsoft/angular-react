import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { IBreadcrumbItem, IBreadcrumbProps } from 'office-ui-fabric-react/lib/Breadcrumb';

@Component({
  selector: 'fab-breadcrumb',
  exportAs: 'fabBreadcrumb',
  template: `
    <Breadcrumb
      #reactNode
      [componentRef]="componentRef"
      [items]="items"
      [className]="className"
      [dividerAs]="dividerAs"
      [maxDisplayedItems]="maxDisplayedItems"
      [ariaLabel]="ariaLabel"
      [overflowAriaLabel]="overflowAriaLabel"
      [overflowIndex]="overflowIndex"
      [styles]="styles"
      [theme]="theme"
      [RenderItem]="renderItem && onRenderItem"
      [ReduceData]="onReduceData"
      >
    </Breadcrumb>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabBreadcrumbComponent extends ReactWrapperComponent<IBreadcrumbProps> implements OnInit {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: IBreadcrumbProps['componentRef'];
  @Input() items: IBreadcrumbProps['items'];
  @Input() className?: IBreadcrumbProps['className'];
  @Input() dividerAs?: IBreadcrumbProps['dividerAs'];
  @Input() maxDisplayedItems?: IBreadcrumbProps['maxDisplayedItems'];
  @Input() ariaLabel?: IBreadcrumbProps['ariaLabel'];
  @Input() overflowAriaLabel?: IBreadcrumbProps['overflowAriaLabel'];
  @Input() overflowIndex?: IBreadcrumbProps['overflowIndex'];
  @Input() styles?: IBreadcrumbProps['styles'];
  @Input() theme?: IBreadcrumbProps['theme'];

  @Input() renderItem?: InputRendererOptions<IBreadcrumbItem>;
  @Input('reduceData') onReduceData?: IBreadcrumbProps['onReduceData'];

  onRenderItem: (props?: IBreadcrumbItem, defaultRender?: JsxRenderFunc<IBreadcrumbItem>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);
  }

  ngOnInit() {
    this.onRenderItem = this.createRenderPropHandler(this.renderItem);
  }
}
