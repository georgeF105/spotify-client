import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
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
    private router: Router,
    private location: Location
  ) { }

  public extractAuthToken(): Observable<void> {
    return this.route.fragment.first().map(fragment => {
      const response = queryString.parse(fragment);
      if (response) {
        this.tokenExpiresAt = parseInt(response.expires_in, 0) + Date.now();
        this.authToken = response.access_token;
      }
      return;
    });
  }

  public getAuthToken(): Observable<any> {
    if (this.authToken) {
      return Observable.from([this.authToken]).first().share();
    } else {
      this.fetchAuthToken();
    }
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
}
