import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';

import { AuthenticationService } from './authentication.service';
import { IUser } from './IUser';

const spotifyUrl = 'https://api.spotify.com';

@Injectable()
export class SpotifyService {
  private userObservable: Observable<IUser>;

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) {
    this.userObservable = this.getUser();
  }

  public searchFor(search: string): Observable<any> {
    return this.getOptions()
    .switchMap(options => {
      return this.http.get(spotifyUrl + `/v1/search?type=artist,track,playlist,album&q=${search}`, options);
    })
    .map(response => {
      return response.json();
    });
  }

  public getUser(): Observable<IUser> {
    return this.getOptions()
    .switchMap(options => {
      return this.http.get(spotifyUrl + '/v1/me', options);
    })
    .map(response => response.json())
    .catch(error => {
      return [{}];
    });
  }

  private getOptions(): Observable<RequestOptions> {
    return this.authenticationService.getAuthToken()
    .map(token => {
      if (!token) {
        return null;
      }

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', `Bearer ${token}`);

      return new RequestOptions({
        headers: headers
      });
    });
  }
}
