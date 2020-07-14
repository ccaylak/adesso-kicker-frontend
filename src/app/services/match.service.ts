import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Match} from '../models/match';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  constructor(private http: HttpClient) {
  }

  addMatch(match: Match) {
    return this.http.post<any>(`${environment.BASE_PATH}/matched/add`, match);
  }
}
