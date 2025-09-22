import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appColorFill]',
  standalone: true
})
export class ColorFillDirective implements OnInit, OnChanges {
  @Input() appColorFill: string = '';

  private colorMap: { [key: string]: string } = {};

  constructor(private elementRef: ElementRef) {
    this.initializeColorMap();
  }

  ngOnInit(): void {
    this.applyColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appColorFill']) {
      this.applyColor();
    }
  }

  private initializeColorMap(): void {
    this.colorMap = {
      'kırmızı': '#dc2626',
      'kirmizi': '#dc2626',
      'red': '#dc2626',
      'mavi': '#2563eb',
      'blue': '#2563eb',
      'yeşil': '#16a34a',
      'yesil': '#16a34a',
      'green': '#16a34a',
      'turuncu': '#ea580c',
      'orange': '#ea580c',
      'pembe': '#ec4899',
      'pink': '#ec4899',
      'mor': '#9333ea',
      'purple': '#9333ea',
      'kahverengi': '#A0522D',
      'brown': '#a3a3a3',
      'gri': '#6b7280',
      'gray': '#6b7280',
      'gris': '#6b7280',
      'siyah': '#000000',
      'black': '#000000',
      'beyaz': '#ffffff',
      'white': '#ffffff',
      'sarı': '#eab308',
      'sari': '#eab308',
      'yellow': '#eab308',
      'lacivert': '#1e40af',
      'navy': '#1e40af',
      'turkuaz': '#06b6d4',
      'cyan': '#06b6d4',
      'altın': '#f59e0b',
      'altin': '#f59e0b',
      'gold': '#f59e0b',
      'gümüş': '#9ca3af',
      'gumus': '#9ca3af',
      'silver': '#9ca3af',
      'bordo': '#991b1b',
      'maroon': '#991b1b',
      'lime': '#84cc16',
      'indigo': '#4f46e5',
      'violet': '#8b5cf6',
      'teal': '#14b8a6',
      'emerald': '#10b981',
      'rose': '#f43f5e',
      'amber': '#f59e0b',
      'sky': '#0ea5e9',
      'slate': '#64748b',
      'zinc': '#71717a',
      'neutral': '#737373',
      'stone': '#78716c'
    };
  }

  private applyColor(): void {
    if (!this.appColorFill) return;

    const element = this.elementRef.nativeElement;
    const colorName = this.appColorFill.toLowerCase().trim();
    
    let colorCode = this.colorMap[colorName];
    
    if (!colorCode) {
      const partialMatch = this.findPartialMatch(colorName);
      colorCode = partialMatch || this.generateColorFromName(colorName);
    }
    
    element.style.backgroundColor = colorCode;
    
    const textColor = this.getContrastColor(colorCode);
    element.style.color = textColor;
  }

  private findPartialMatch(colorName: string): string | null {
    for (const [key, value] of Object.entries(this.colorMap)) {
      if (key.includes(colorName) || colorName.includes(key)) {
        return value;
      }
    }
    return null;
  }

  private generateColorFromName(colorName: string): string {
    let hash = 0;
    for (let i = 0; i < colorName.length; i++) {
      hash = colorName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash) % 360;
    const saturation = 70 + (Math.abs(hash) % 30);
    const lightness = 45 + (Math.abs(hash) % 20);
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  private getContrastColor(hexColor: string): string {
    const rgb = this.hexToRgb(hexColor);
    if (!rgb) return '#000000';
    
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    return luminance > 0.5 ? '#000000' : '#ffffff';
  }

  private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}