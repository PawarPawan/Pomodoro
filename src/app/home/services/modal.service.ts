import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {SettingsComponent} from '../settings/settings.component';
import {ModalConfig} from '../models/modal.interface';

@Injectable()
export class ModalService {
  componentRef: ComponentRef<SettingsComponent>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
  ) {
  }

  open(value: ModalConfig) {
    if (!this.componentRef) {
      this.componentRef = this._appendComponentToBody(SettingsComponent);
      this.componentRef.instance.setConfirm(value);
      this.componentRef.instance.dismiss
        .subscribe(() => this._removeComponentFromBody());
    }
  }

  private _appendComponentToBody(component: any): ComponentRef<any> {
    const componentRef = this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);
    return componentRef;
  }

  private _removeComponentFromBody() {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = null;
  }
}
