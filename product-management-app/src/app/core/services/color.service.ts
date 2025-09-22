import { inject, Injectable } from "@angular/core";
import { HttpClientService } from "./common/httpclient.service";
import { ListCategory } from "../models/categories/list-category";
import { map, Observable } from "rxjs";
import { ListColor } from "../models/colors/list-color";

@Injectable({
    providedIn: 'root'
})
export class ColorService {
    private httpClientService = inject(HttpClientService);

        getAll(): Observable<ListColor[]> {
        return this.httpClientService.get<ListColor[]>({
            controller: "Color",
        }).pipe(
            map(response => response ?? [])
        );
    }
}