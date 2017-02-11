import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'querystring';
import 'rxjs/Rx';

import { ISpotifyToken } from './ISpotifyToken';

const clientId = 'cbe9c021a3f14f53acf2f7727d7591ec';
const redirectUri = 'http://localhost:4200/callback';

@Injectable()
export class AuthenticationService {
  private authToken: string;
  private tokenExpiresAt: number;
  private spotifyToken: ISpotifyToken;

  private extractAuthTokenObservable: Observable<ISpotifyToken>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.extractAuthTokenObservable = this.extractAuthToken().share();
  }

  public extractAuthToken(): Observable<ISpotifyToken> {
    // Pull token from url
    this.extractAuthTokenObservable = this.route.fragment.first().map(fragment => {
      const response = queryString.parse(fragment);
      if (response && response.access_token) {
        const expiresAt = parseInt(response.expires_in, 0) * 1000 + Date.now();
        const token = response.access_token;
        this.spotifyToken = {
          token,
          expiresAt
        };
        return this.spotifyToken;
      }
      return;
    })
    // Has side effects??? not sure how to fix
    .map((spotifyToken: ISpotifyToken) => {
      if (this.isValidToken(spotifyToken)) {
        this.saveToken(this.spotifyToken);
        this.redirectToHome();
        return spotifyToken;
      }
      const savedToken = this.fetchToken();
      if (this.isValidToken(savedToken)) {
        this.spotifyToken = savedToken;
        return savedToken;
      }
      return savedToken;
    })
    .share();
    return this.extractAuthTokenObservable;
  }

  public getAuthToken(): Observable<string> {
    if (this.isValidToken(this.spotifyToken)) {
      return Observable.from([this.spotifyToken])
      .map((spotifyToken: ISpotifyToken) => {
        return spotifyToken.token;
      });
    }
    return this.extractAuthTokenObservable
    .map((spotifyToken: ISpotifyToken) => {
      return spotifyToken.token;
    }).first();
  };

  public hasValidAuthToken(): boolean {
    return this.authToken && this.tokenExpiresAt > Date.now();
  }

  public fetchAuthToken(): void {
    const url = this.getAuthUrl();

    // TODO: ugly! find a better way.
    window.location.href = url;
  }

  private getAuthUrl(): string {
    const parsedRedirectUri = encodeURIComponent(redirectUri);
    const options = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'token',
      show_dialog: false
    };
    const parsedOptions = queryString.stringify(options);
    return `https://accounts.spotify.com/authorize?${parsedOptions}`;
  }

  private redirectToHome(): void {
    this.router.navigate(['']);
  }

  private isValidToken(spotifyToken: ISpotifyToken): boolean {
    return spotifyToken && spotifyToken.token && spotifyToken.expiresAt > Date.now();
  }

  private saveToken(spotifyToken: ISpotifyToken): void {
    if (this.isValidToken(spotifyToken)) {
      localStorage.setItem('spotifyToken', JSON.stringify(spotifyToken));
    }
  }

  private fetchToken(): ISpotifyToken {
    return JSON.parse(localStorage.getItem('spotifyToken'));
  }
}
