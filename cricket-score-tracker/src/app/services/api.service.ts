// write here

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse, Series, Match } from "../interfaces/cricket.interface";

@Injectable({ providedIn: "root" })
export class ApiService {

  private apiUrl = 'https://api.cricapi.com/v1';
  private apiKey = 'f7e229ff-5f36-483d-8c47-5e2a028ae189';

  constructor(private http: HttpClient) { }

  getSeriesList(): Observable<ApiResponse<Series[]>> {
    const url = `${this.apiUrl}/series?apikey=${this.apiKey}&offset=0`;
    return this.http.get<ApiResponse<Series[]>>(url);
  }

  searchSeries(searchTerm: string): Observable<ApiResponse<Series[]>> {
    const url = `${this.apiUrl}/series?apikey=${this.apiKey}&offset=0&search=${encodeURIComponent(searchTerm)}`;
    return this.http.get<ApiResponse<Series[]>>(url);
  }

  getMatchesBySeriesId(seriesId: string): Observable<ApiResponse<{ matchList: Match[] }>> {
    const url = `${this.apiUrl}/series_info?apikey=${this.apiKey}&id=${seriesId}`;
    console.log(`Fetching matches for series ID: ${seriesId}`);
    return this.http.post<ApiResponse<{ matchList: Match[] }>>(url, "");
  }

  getSelectedMatchData(id: string): Observable<ApiResponse<Match>> {
    const url = `${this.apiUrl}/match_scorecard?apikey=${this.apiKey}&id=${id}`;
    return this.http.get<ApiResponse<Match>>(url);
  }
}