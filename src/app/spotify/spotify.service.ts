import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
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
    this.authenticationService.getAuthToken().subscribe(thing => {
      console.log('thing', thing);
    });
    return this.http.get(spotifyUrl + `/v1/search?type=artist,track,playlist,album&q=${search}`)
    .map(result => {
      return result.json();
    });
  }
}
