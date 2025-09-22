import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appValidation]',
  standalone: true
})
export class ValidationDirective implements OnInit, OnDestroy {
  @Input() appValidation: string = ''; 
  @Input() errorMessage?: string; 

  private readonly elementRef = inject(ElementRef);
  private readonly control = inject(NgControl, { optional: true });
  private readonly errorElement = signal<HTMLElement | null>(null);

  ngOnInit(): void {
    this.control ? this.setupValidation() : console.warn('ValidationDirective: NgControl bulunamadı');
  }

  ngOnDestroy(): void {
    this.removeErrorElement();
  }

  private setupValidation(): void {
    this.control?.control ? this.addBlurListener() : null;
  }

  private addBlurListener(): void {
    this.elementRef.nativeElement.addEventListener('blur', () => this.checkValidation());
  }

  private checkValidation(): void {
    const control = this.control?.control;
    if (!control?.touched) return;

    const validationType = this.parseValidationType();
    const isInvalid = this.isValidationInvalid(control, validationType);
    
    isInvalid ? this.showError(validationType) : this.hideError();
  }

  private parseValidationType(): { type: string; value?: number } {
    const parts = this.appValidation.split(':');
    return {
      type: parts[0],
      value: parts[1] ? parseInt(parts[1], 10) : undefined
    };
  }

  private isValidationInvalid(control: any, validation: { type: string; value?: number }): boolean {
    const value = control.value || '';
    
    switch (validation.type) {
      case 'required':
        return control.hasError('required');
      
      case 'email':
        return value && !this.isValidEmail(value);
      
      case 'minlength':
        return value.length < (validation.value || 0);
      
      case 'maxlength':
        return value.length > (validation.value || 0);
      
      case 'min':
        return parseFloat(value) < (validation.value || 0);
      
      case 'max':
        return parseFloat(value) > (validation.value || 0);
      
      default:
        return false;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showError(validation: { type: string; value?: number }): void {
    this.errorElement() ? null : this.createErrorElement(validation);
  }

  private createErrorElement(validation: { type: string; value?: number }): void {
    const errorEl = document.createElement('div');
    errorEl.className = 'invalid-feedback d-block';
    errorEl.textContent = this.getErrorMessage(validation);

    this.elementRef.nativeElement.classList.add('is-invalid');
    this.elementRef.nativeElement.parentNode?.insertBefore(
      errorEl,
      this.elementRef.nativeElement.nextSibling
    );
    
    this.errorElement.set(errorEl);
  }

  private hideError(): void {
    this.errorElement()?.remove();
    this.errorElement.set(null);
    this.elementRef.nativeElement.classList.remove('is-invalid');
  }

  private getErrorMessage(validation: { type: string; value?: number }): string {
    if (this.errorMessage) return this.errorMessage;

    switch (validation.type) {
      case 'required':
        return 'Bu alan zorunludur';
      
      case 'email':
        return 'Geçerli bir email adresi giriniz';
      
      case 'minlength':
        return `En az ${validation.value} karakter olmalıdır`;
      
      case 'maxlength':
        return `En fazla ${validation.value} karakter olmalıdır`;
      
      case 'min':
        return `En az ${validation.value} olmalıdır`;
      
      case 'max':
        return `En fazla ${validation.value} olmalıdır`;
      
      default:
        return 'Geçersiz değer';
    }
  }

  private removeErrorElement(): void {
    this.errorElement()?.remove();
    this.errorElement.set(null);
  }
}


