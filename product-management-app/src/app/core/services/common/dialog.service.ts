import { inject, Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private modalService = inject(NgbModal);

  openDialog<T = any, R = any>(dialogParameters: DialogParameters<T>): void {
    const defaultOptions: NgbModalOptions = {
      size: 'lg',
      backdrop: true,
      centered: true
    };

    const options: NgbModalOptions = { ...defaultOptions, ...dialogParameters.options };
    const modalRef = this.modalService.open(dialogParameters.componentType, options);

    if (dialogParameters.data && 'data' in modalRef.componentInstance) {
      modalRef.componentInstance.data = dialogParameters.data;
    }

    modalRef.result.then(
      (result) => {
        dialogParameters.afterClosed?.(result);
      },
      (reason) => {
        dialogParameters.afterClosed?.(reason);
      }
    );
  }
}

export interface DialogParameters<T = any> {
  componentType: any;
  data?: T;
  afterClosed?: (result?: any) => void;
  options?: Partial<DialogOptions>;
}

export class DialogOptions {
  size?: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
  backdrop?: boolean | 'static' = 'static';
  centered?: boolean = true;
}
