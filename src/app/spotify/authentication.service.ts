import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'querystring';
import 'rxjs/Rx';

const clientId = 'cbe9c021a3f14f53acf2f7727d7591ec';
const redirectUri = 'http://localhost:4200/callback';
@Injectable()
export class AuthenticationService {
  private authToken: string;
  private tokenExpiresAt: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  public getAuthToken(): Observable<any> {
    if (this.authToken) {
      Observable.from([this.authToken]).first().share();
    }
    return this.route.fragment
    .map((fragment: string) => {
      const response = queryString.parse(fragment);
      if (response) {
        this.tokenExpiresAt = response.expires_in + Date.now();
        this.authToken = response.access_token;
      }
      return this.authToken;
    })
    .map(token => {
      if (this.tokenExpiresAt < Date.now()) {
        throw new Error('token_timed_out');
      }
      return token;
    })
    .first()
    .share();
  };

  public getAuthUrl(): string {
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
}
