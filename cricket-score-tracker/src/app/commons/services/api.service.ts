// write here

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse, Series, Match } from "../interfaces/cricket.interface";
import { GlobalConstants } from "../const/constants";

@Injectable({ providedIn: "root" })
export class ApiService {

  constructor(private http: HttpClient) { }


  getSelectedMatchData(id: string): Observable<ApiResponse<Match>> {
    const url = `${GlobalConstants.apiUrl}/match_scorecard?apikey=${GlobalConstants.apiKey}&id=${id}`;
    return this.http.get<ApiResponse<Match>>(url);
  }
}