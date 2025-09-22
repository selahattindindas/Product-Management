import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective implements OnChanges {
  @Input() appLoading: boolean = false;
  @Input() loadingText: string = 'Yükleniyor...';

  private originalContent = '';
  private originalDisabled = false;
  private isInitialized = false;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('LoadingDirective: ngOnChanges called', changes);
    
    if (!this.isInitialized) {
      this.saveOriginalState();
      this.isInitialized = true;
    }
    
    if (changes['appLoading']) {
      this.appLoading ? this.showLoading() : this.hideLoading();
    }
  }

  private saveOriginalState(): void {
    const element = this.elementRef.nativeElement;
    if (element.tagName === 'BUTTON') {
      this.originalContent = element.textContent || '';
      this.originalDisabled = element.disabled;
    }
  }

  private showLoading(): void {
    const element = this.elementRef.nativeElement;
    
    if (element.tagName === 'BUTTON') {
      element.disabled = true;
      element.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        ${this.loadingText}
      `;
    }
  }

  private hideLoading(): void {
    const element = this.elementRef.nativeElement;
    
    if (element.tagName === 'BUTTON') {
      element.disabled = this.originalDisabled;
      element.textContent = this.originalContent;
    }
  }
}
