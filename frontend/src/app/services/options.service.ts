import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppService } from "../app.service";
import { Options } from "../model/types";
import  *  as  example_request  from  '../example-request.json';


@Injectable({
    providedIn: 'root'
})
export class OptionsService extends AppService{

    private endPoint = '/calcular';
    private json: Options;

    constructor(public httpCliente: HttpClient) {
        super(httpCliente);
        this.json = (example_request as any).default;
    }

    getOptions(): Observable<any> {
        return this.httpCliente.post<any>(this.api + this.endPoint, this.json);
    }
}
