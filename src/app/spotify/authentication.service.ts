import { Injectable } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as queryString from 'querystring';
import 'rxjs/Rx';

const client_id = 'cbe9c021a3f14f53acf2f7727d7591ec';
const redirectUri = 'http://localhost:4200/callback';
@Injectable()
export class AuthenticationService {
  private authToken: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  public getAuthToken(): Observable<any> {
    if (this.authToken) {
      return Observable.create((observer) => {
        observer.onNext(this.authToken);
      });
    }
    return this.route.fragment
    .map((fragment: string) => {
      const token = queryString.parse(fragment).access_token;
      if (token) {
        this.authToken = token;
      }
      return token;
    });
  };

  public getAuthUrl(): string {
    const parsedRedirectUri = encodeURIComponent(redirectUri);
    return `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${parsedRedirectUri}&response_type=token&show_dialog=false`;
  }
}
