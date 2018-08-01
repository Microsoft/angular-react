import { Injectable, Renderer2, RendererStyleFlags2, RendererType2 } from '@angular/core';
import { EventManager, ɵDomRendererFactory2, ɵDomSharedStylesHost } from '@angular/platform-browser';
import * as ReactDOM from 'react-dom';

import { isReactNode, ReactNode } from './react-node';

const DEBUG = false;

@Injectable()
export class AngularReactRendererFactory extends ɵDomRendererFactory2 {
  private readonly defaultReactRenderer: ReactRenderer;

  // Collection of ReactNodes that can be evaluated and flushed at the
  // end of Render.  This is necessary as the flow of element creation
  // and update goes from "create" > "insert" > "update" property/attribute.
  // React elements cannot be "inserted" and later have their props
  // updated, so the "insert", or React.Render, can only be done once the
  // element has been fully defined.  Only the topmost [root] nodes are added here.
  public reactRootNodes: Array<ReactNode> = [];

  private isRenderPending: boolean;
  // This flag can only be set to true from outside.  It can only be reset
  // to false from inside.  This value is reset on "end" when the pending
  // renders are flushed.
  public setRenderPendingCallback = () => {
    this.isRenderPending = true;
  };

  constructor(eventManager: EventManager, sharedStylesHost: ɵDomSharedStylesHost) {
    super(eventManager, sharedStylesHost);

    this.defaultReactRenderer = new ReactRenderer(this);
  }

  createRenderer(element: any, type: RendererType2 | null): Renderer2 {
    if (type && type.styles.length && type.styles[0] === 'react-renderer') {
      return this.defaultReactRenderer;
    }

    return super.createRenderer(element, type);
  }

  begin() {}

  end() {
    if (DEBUG) {
      console.log(
        'RootRenderer > end > isRenderPending:',
        this.isRenderPending,
        'reactRootNodes:',
        this.reactRootNodes
      );
    }
    // Flush any pending React element render updates.  This cannot be done
    // earlier (as is done for DOM elements) because React element props
    // are ReadOnly.

    // Workaround for ReactNodes inside ReactContent being added to the root of the VDOM and not removed from the VDOM when unmounted from the DOM.
    for (let i = 0; i < this.reactRootNodes.length; i++) {
      const node = this.reactRootNodes[i];
      if (
        !isReactNode(node.parent) &&
        !document.contains(node.parent) &&
        ReactDOM.unmountComponentAtNode(node.parent)
      ) {
        this.reactRootNodes.splice(i--, 1);
      }
    }

    if (this.isRenderPending) {
      // Remove root nodes that are pending destroy after render.
      this.reactRootNodes = this.reactRootNodes.filter(node => !node.render().destroyPending);
      this.isRenderPending = false;
    }
  }
}

class ReactRenderer implements Renderer2 {
  readonly data: StringMap<any> = Object.create(null);

  constructor(private rootRenderer: AngularReactRendererFactory) {}

  destroy(): void {}

  destroyNode(node: ReactNode): void {
    if (DEBUG) {
      console.error('Renderer > destroyNode > node:', node.toString());
    }
    node.destroyNode();
  }

  createElement(name: string, namespace?: string): ReactNode {
    if (DEBUG) {
      console.error('Renderer > createElement > name:', name, namespace ? 'namespace:' : '', namespace);
    }
    return new ReactNode(name);
  }

  createComment(value: string): ReactNode {
    if (DEBUG) {
      console.error('Renderer > createComment > value:', value.trim());
    }
    return new ReactNode().asComment(value);
  }

  createText(value: string): ReactNode {
    if (DEBUG) {
      console.error('Renderer > createText > value:', value.trim());
    }
    return new ReactNode().asText(value);
  }

  appendChild(parent: HTMLElement | ReactNode, node: ReactNode): void {
    // Only append a child if there is a child.
    if (!node) {
      return;
    }

    // Don't append empty text nodes.
    if (!node.shouldRender) {
      return;
    }

    // Provide a parent element reference to the ReactNode.  This will be used later
    // once the ReactNode is fully defined and it is subsequently rendered.
    if (!isReactNode(parent)) {
      if (DEBUG) {
        console.warn('Renderer > appendChild > asDOM > parent:', parent.toString(), 'node:', node.toString());
      }
      node.setRenderPendingCallback = this.rootRenderer.setRenderPendingCallback;
      this.rootRenderer.reactRootNodes.push(node);
      node.parent = parent;
      return;
    }

    if (DEBUG) {
      console.warn('Renderer > appendChild > asReact > parent:', parent.toString(), 'node:', node.toString());
    }
    node.setRenderPendingCallback = () => parent.setRenderPending();
    parent.addChild(node);
    node.parent = parent;
  }

  insertBefore(parent: HTMLElement | void, node: ReactNode, refChild: any): void {
    // Only insert a child if there is a parent.
    if (!parent) {
      return;
    }

    // Provide a parent element reference to the ReactNode.  This will be used later
    // once the ReactNode is fully defined and it is subsequently rendered.  In this
    // case, React cannot "insertBefore".  Instead, we have to create a target element
    // where the ReactNode can be rendered later.
    if (DEBUG) {
      console.warn(
        'Renderer > insertBefore > asDOM > parent:',
        parent.toString(),
        'node:',
        node.toString(),
        'refChild:',
        refChild.toString()
      );
    }
    const target = document.createElement('div');
    parent.insertBefore(target, refChild);
    node.parent = target;
    node.setRenderPendingCallback = this.rootRenderer.setRenderPendingCallback;
  }

  removeChild(parent: HTMLElement | ReactNode | void, node: ReactNode): void {
    // Only insert a child if there is a parent.
    if (!parent) {
      return;
    }

    // Remove a parent element reference from the ReactNode.  This will be later
    // result in the ReactNode unloading itself.
    if (!isReactNode(parent)) {
      if (DEBUG) {
        console.warn('Renderer > removeChild > asDOM > parent:', parent.toString(), 'node:', node.toString());
      }
      node.parent = null;
      return;
    }

    if (DEBUG) {
      console.warn('Renderer > removeChild > asReact > parent:', parent.toString(), 'node:', node.toString());
    }
    parent.removeChild(node);
  }

  selectRootElement(selectorOrNode: string | any): any {
    if (DEBUG) {
      console.log('NOT IMPLEMENTED - Renderer > selectRootElement > selectorOrNode:', selectorOrNode);
    }
  }

  parentNode(node: ReactNode): any {
    if (DEBUG) {
      console.log('NOT IMPLEMENTED - Renderer > parentNode > node:', node.toString());
    }
  }

  nextSibling(node: any): any {
    if (DEBUG) {
      console.log('NOT IMPLEMENTED - Renderer > nextSibling > node:', node.toString());
    }
  }

  setAttribute(node: ReactNode, name: string, value: string, namespace?: string): void {
    if (DEBUG) {
      console.log(
        'Renderer > setAttribute > node:',
        node.toString(),
        'name:',
        name,
        'value:',
        value,
        namespace ? 'namespace:' : '',
        namespace
      );
    }
    node.setProperty(name, value);
  }

  removeAttribute(node: ReactNode, name: string, namespace?: string): void {
    if (DEBUG) {
      console.log(
        'Renderer > removeAttribute > node:',
        node.toString(),
        'name:',
        name,
        namespace ? 'namespace:' : '',
        namespace
      );
    }
    node.removeProperty(name);
  }

  addClass(node: ReactNode, name: string): void {
    if (DEBUG) {
      console.log('Renderer > addClass > node:', node.toString(), 'name:', name);
    }

    // Update the virtual node.
    // TODO: This may only support a single class name, but might work if property name is a single
    //       comma-delimited list of classes...
    node.setProperty('className', name);
  }

  removeClass(node: ReactNode, name: string): void {
    if (DEBUG) {
      console.log('Renderer > removeClass > node:', node.toString(), 'name:', name);
    }

    // Update the virtual node.
    // TODO: This may not work correctly to remove a single name from a comma-delimited list.
    node.removeProperty('className');
  }

  setStyle(node: ReactNode, style: string, value: any, flags: RendererStyleFlags2): void {
    // if (DEBUG) { console.log('Renderer > setStyle > node: ', node.toString(), 'style:', style, 'value:', value, 'flags:', flags); }
    if (flags & RendererStyleFlags2.DashCase) {
      node.setProperty('style', { style: value + !!(flags & RendererStyleFlags2.Important) ? ' !important' : '' });
    } else {
      node.setProperty('style', { style: value });
    }
  }

  removeStyle(node: ReactNode, style: string, flags: RendererStyleFlags2): void {
    if (DEBUG) {
      console.log('Renderer > removeStyle > node:', node.toString(), 'style:', style, 'flags:', flags);
    }
    node.removeProperty('style', style);
  }

  setProperty(node: ReactNode, name: string, value: any): void {
    if (DEBUG) {
      console.log('Renderer > setProperty > node:', node.toString(), 'name:', name, 'value:', value);
    }
    node.setProperty(name, value);
  }

  setValue(node: ReactNode, value: string): void {
    if (DEBUG) {
      console.log('Renderer > setValue > node:', node.toString(), 'value:', value);
    }
    node.setProperty('value', value);
  }

  listen(target: ReactNode, event: string, callback: (event: any) => boolean): () => void {
    if (DEBUG) {
      console.log('Renderer > listen > target:', target, 'event:', event);
    }
    target.setProperty(event, callback);

    // NEEDS WORK: Implement prevent default callback behavior.
    // return <() => void>this.eventManager.addEventListener(
    //            target, event, decoratePreventDefault(callback)) as() => void;

    // tslint:disable-next-line:no-unused-expression
    return () => null;
  }
}
