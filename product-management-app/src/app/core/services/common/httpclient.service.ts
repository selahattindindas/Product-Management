import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly http = inject(HttpClient);

  private buildUrl(requestParams: Partial<RequestParameters>): string {
    if (requestParams.fullEndPoint) {
      return requestParams.fullEndPoint;
    }
    const baseUrl = requestParams.baseUrl || this.BASE_URL;
    const controller = `/${requestParams.controller}`;
    const action = requestParams.action ? `/${requestParams.action}` : '';
    const queryString = requestParams.queryString ? `?${requestParams.queryString}` : '';
    return `${baseUrl}${controller}${action}${queryString}`;
  }

  private buildRequestOptions(requestParams: Partial<RequestParameters>) {
    return {
        headers: requestParams.headers,
        withCredentials: true,
        responseType: (requestParams.responseType as 'json') || 'json'
    };
  }

  get<T>(requestParams: Partial<RequestParameters>, id?: number | string): Observable<T> {
    const url = id ? `${this.buildUrl(requestParams)}/${id}` : this.buildUrl(requestParams);
    return this.http.get<T>(url, this.buildRequestOptions(requestParams));
  }

  post<T>(requestParams: Partial<RequestParameters>, body: T): Observable<T> {
    const url = this.buildUrl(requestParams);
    return this.http.post<T>(url, body, this.buildRequestOptions(requestParams));
  }

  put<T>(requestParams: Partial<RequestParameters>, body: Partial<T>): Observable<T> {
    const url = this.buildUrl(requestParams);
    return this.http.put<T>(url, body, this.buildRequestOptions(requestParams));
  }

  delete<T>(requestParams: Partial<RequestParameters>, id: number | string): Observable<T> {
    const url = `${this.buildUrl(requestParams)}/${id}`;
    return this.http.delete<T>(url, this.buildRequestOptions(requestParams));
  }
}

export class RequestParameters {
    controller?: string;
    action?: string;
    queryString?: string;
    headers?: HttpHeaders;
    baseUrl?: string;
    fullEndPoint?: string;
    withCredentials?: boolean;
    responseType?: string = 'json';
}
