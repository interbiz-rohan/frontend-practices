import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Match, Series } from '../interfaces/series.interface';
import { GlobalConstants } from '../../commons/const/constants';

@Injectable({
  providedIn: 'root'
})
export class SeriesListApiService {
  
  constructor(private http: HttpClient) { }

  getSeriesList(): Observable<ApiResponse<Series[]>> {
    const url = `${GlobalConstants.apiUrl}/series?apikey=${GlobalConstants.apiKey}&offset=0`;
    return this.http.get<ApiResponse<Series[]>>(url);
  }

  searchSeries(searchTerm: string): Observable<ApiResponse<Series[]>> {
    const url = `${GlobalConstants.apiUrl}/series?apikey=${GlobalConstants.apiKey}&offset=0&search=${encodeURIComponent(searchTerm)}`;
    return this.http.get<ApiResponse<Series[]>>(url);
  }

  getMatchesBySeriesId(seriesId: string): Observable<ApiResponse<{ matchList: Match[] }>> {
    const url = `${GlobalConstants.apiUrl}/series_info?apikey=${GlobalConstants.apiKey}&id=${seriesId}`;
    console.log(`Fetching matches for series ID: ${seriesId}`);
    return this.http.post<ApiResponse<{ matchList: Match[] }>>(url, "");
  }
} 