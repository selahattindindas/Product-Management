import { Injectable, signal, computed, inject, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ListProduct } from '../models/products/list.product';

@Injectable({ providedIn: 'root' })
export class TitleService implements OnDestroy {
  private router = inject(Router);
  private subscription?: Subscription;
  
  private _title = signal('Ana Sayfa');
  private _selectedProduct = signal<ListProduct | null>(null);
  public title = this._title.asReadonly();
  public selectedProduct = this._selectedProduct.asReadonly();
  public formattedTitle = computed(() => `${this._title()} - Admin Panel`);
  
  // Breadcrumb title - ürün seçildiğinde "Ürünler/Detay/Ürün Adı" formatında
  public breadcrumbTitle = computed(() => {
    const baseTitle = this._title();
    const product = this._selectedProduct();
    
    if (product && baseTitle.includes('Ürün')) {
      return `${baseTitle}/Detay/${product.name}`;
    }
    
    return baseTitle;
  });

  private readonly titleMap: Record<string, string> = {
    'products': 'Ürünler',
    'create': 'Yeni Ürün',
    'update': 'Ürün Düzenle',
    'detail': 'Ürün Detayı',
    'categories': 'Kategoriler',
    'colors': 'Renkler',
    'login': 'Giriş Yap',
    'register': 'Kayıt Ol'
  };

  constructor() {
    this.updateTitleFromCurrentRoute();
    this.listenRouteChanges();
  }

  // Sayfa başlığını değiştirir
  setTitle(title: string): void {
    this._title.set(title);
  }

  // Ürün seçildiğinde breadcrumb için
  setSelectedProduct(product: ListProduct | null): void {
    this._selectedProduct.set(product);
  }

  private updateTitleFromCurrentRoute(): void {
    const segments = this.router.url.split('/').filter(Boolean);
    const title = this.extractTitle(segments);
    this._title.set(title);
  }

  // Sayfa değişince başlığı otomatik günceller
  private listenRouteChanges(): void {
    this.subscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const segments = event.urlAfterRedirects.split('/').filter(Boolean);
        const title = this.extractTitle(segments);
        this._title.set(title);
      });
  }

  private extractTitle(segments: string[]): string {
    if (segments.length === 0) return 'Ana Sayfa';
    
    const isAdminRoute = segments[0] === 'admin';
    const pageSegment = isAdminRoute ? segments[1] : segments[segments.length - 1];
    
    return this.titleMap[pageSegment] ?? this.capitalizeFirst(pageSegment);
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
