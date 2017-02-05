import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';

import { AuthenticationService } from './authentication.service';

const spotifyUrl = 'https://api.spotify.com';

@Injectable()
export class SpotifyService {

  constructor(
    private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  public searchFor(search: string): Observable<any> {
    return this.authenticationService.getAuthToken()
    .switchMap(token => {
      const options = this.getOptions(token);
      return this.http.get(spotifyUrl + `/v1/search?type=artist,track,playlist,album&q=${search}`, options);
    })
    .map(thing => {
      return thing.json();
    });
  }

  private getOptions(token: string): any {
    const headers = new Headers({
        'Authorization': `Bearer ${token}`
      });
      return new RequestOptions({
        headers: headers
      });
  }
}
