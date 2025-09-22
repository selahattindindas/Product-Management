import { inject, Injectable } from '@angular/core';
import { HttpClientService } from './common/httpclient.service';
import { ListProduct } from '../models/products/list.product';
import { map, Observable } from 'rxjs';
import { CreateProduct } from '../models/products/create-product';
import { UpdateProduct } from '../models/products/update.product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClientService = inject(HttpClientService);

  getAll(): Observable<ListProduct[]> {
    return this.httpClientService.get<ListProduct[]>({
      controller: "Product",
    }).pipe(
      map(response => response ?? [])
    );
  }

  // Sayfalama ile ürün listesi getirir (DataGrid için)
  getProductPaginated(page: number, size: number): Observable<{ totalCount: number, products: ListProduct[] }> {
    return this.httpClientService.get<{ totalCount: number, products: ListProduct[] }>({
      controller: "Product",
      action: "paginated",
      queryString: `page=${page}&size=${size}`
    }).pipe(
      map(response => ({
        totalCount: response.totalCount,
        products: response.products || []
      })
      ));
  }

  getById(id: number): Observable<ListProduct> {
    return this.httpClientService.get<ListProduct>({
      controller: "Product"
    }, id).pipe(
      map(response => response)
    );
  }

  create(body: CreateProduct): Observable<CreateProduct> {
    return this.httpClientService.post<CreateProduct>({
      controller: "Product",
    }, body).pipe(
      map(res => res)
    );
  }

  update(body: UpdateProduct): Observable<UpdateProduct> {
    return this.httpClientService.put<UpdateProduct>({
      controller: "Product",
    }, body);
  }

  delete(id: number): Observable<ListProduct> {
    return this.httpClientService.delete<ListProduct>({
      controller: "Product"
    }, id).pipe(map(res => res));
  }
}
