import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class kflHttpClientService {
    baseUrl = "http://localhost:8080";
    constructor(private http: Http, private jsonp: Jsonp) {

    }

    KflJsonP(path, args) {
        if (args) {
            return this.jsonp.request(this.baseUrl + path + '?callback=JSONP_CALLBACK&' + args)
                .map(res => res.json())
        }
        else {
            return this.jsonp.request(this.baseUrl + path + '?callback=JSONP_CALLBACK')
                .map(res => res.json())
        }

    }

    kflGet(path, args) {
        return this.http.get(this.baseUrl + path + "&" + args)
            .map((response: Response) => response.json());
    }





}