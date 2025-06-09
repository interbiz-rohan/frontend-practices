import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Match } from '../interfaces/highlights.interface';

@Injectable({
  providedIn: 'root'
})
export class HighlightsApiService {

  constructor(private http: HttpClient) {}


} 