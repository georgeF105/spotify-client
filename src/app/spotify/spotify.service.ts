import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

const spotifyUrl = 'https://api.spotify.com';

@Injectable()
export class SpotifyService {

  constructor(
    private http: Http
  ) { }

  public searchForArtist(artist: string): any {
    this.http.get(spotifyUrl + `/v1/search?type=artist&q=${artist}`);
  }
}
