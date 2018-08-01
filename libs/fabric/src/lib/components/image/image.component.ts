import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { IImageProps, ImageLoadState } from 'office-ui-fabric-react/lib/Image';

@Component({
  selector: 'fab-image',
  exportAs: 'fabImage',
  template: `
      <Image
        #reactNode

        [alt]="alt"
        [crossOrigin]="crossOrigin"
        [height]="height"
        [sizes]="sizes"
        [src]="src"
        [srcSet]="srcSet"
        [useMap]="useMap"
        [width]="width"

        [styles]="styles"
        [theme]="theme"
        [className]="className"
        [shouldFadeIn]="shouldFadeIn"
        [shouldStartVisible]="shouldStartVisible"
        [imageFit]="imageFit"
        [errorSrc]="errorSrc"
        [maximizeFrame]="maximizeFrame"
        (onLoadingStateChange)="onLoadingStateChange.emit($event)"
        [coverStyle]="coverStyle">
      </Image>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabImageComponent extends ReactWrapperComponent<IImageProps> {
  @Input() alt?: IImageProps['alt'];
  @Input() crossOrigin?: IImageProps['crossOrigin'];
  @Input() height?: IImageProps['height'];
  @Input() sizes?: IImageProps['sizes'];
  @Input() src?: IImageProps['src'];
  @Input() srcSet?: IImageProps['srcSet'];
  @Input() useMap?: IImageProps['useMap'];
  @Input() width?: IImageProps['width'];

  @Input() styles?: IImageProps['styles'];
  @Input() theme?: IImageProps['theme'];
  @Input() className?: IImageProps['className'];
  @Input() shouldFadeIn?: IImageProps['shouldFadeIn'];
  @Input() shouldStartVisible?: IImageProps['shouldStartVisible'];
  @Input() imageFit?: IImageProps['imageFit'];
  @Input() errorSrc?: IImageProps['errorSrc'];
  @Input() maximizeFrame?: IImageProps['maximizeFrame'];
  @Input() coverStyle?: IImageProps['coverStyle'];

  @Output() readonly onLoadingStateChange = new EventEmitter<ImageLoadState>();

  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);
  }
}
