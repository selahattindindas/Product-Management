import { inject, Injectable } from "@angular/core";
import { HttpClientService } from "./common/httpclient.service";
import { ListCategory } from "../models/categories/list-category";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private httpClientService = inject(HttpClientService);

    getAll(): Observable<ListCategory[]> {
        return this.httpClientService.get<ListCategory[]>({
            controller: "Category",
        }).pipe(
            map(response => response ?? [])
        );
    }
}