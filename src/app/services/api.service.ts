import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  /**
   * Creates an instance of ApiService
   * @param http - HTTP service to call the APIS
   * */
  constructor(private http: HttpClient) {}

  get(url, options = {}) {
    return this.http.get(url, options);
  }

  post(url, data, httpOptions = {}) {
    return this.http.post(url, data, httpOptions);
  }

  put(url, data, httpOptions = {}) {
    return this.http.put(url, data, httpOptions);
  }

  delete(url, httpOptions = {}) {
    return this.http.delete(url, httpOptions);
  }
}
