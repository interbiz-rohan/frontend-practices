// write here

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiService {

  private apiUrl = 'https://api.cricapi.com/v1';
  private apiKey = '22cee765-6249-4f97-ab41-7bb5332a0df6';

  constructor(private http: HttpClient) { }

  getSeriesList(): Observable<any> {
    const url = `${this.apiUrl}/series?apikey=${this.apiKey}&offset=`+0;
    return this.http.get<any>(url);
  }

  getMatchesBySeriesId(seriesId: string): Observable<any> {
    const url = `${this.apiUrl}/series_info?apikey=${this.apiKey}&id=${seriesId}`;
    console.log(`Fetching matches for series ID: ${seriesId}`);
    return this.http.post<any>(url, "");
  }

  getSelectedMatchData(id:any): Observable<any> {
    const url = `${this.apiUrl}/match_scorecard?apikey=${this.apiKey}&id=${id}`;
    return this.http.get<any>(url);
  }
}