import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService } from '../spotify/authentication.service';
import { Observable } from 'rxjs/Observable';
import { SpotifyService } from '../spotify/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Spotify Client';
  public userName: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.userName = this.getUserName();
  }

  public getSpotifyAuth(): void {
    this.authenticationService.fetchAuthToken();
  }

  private getUserName(): Observable<string> {
    return this.spotifyService.getUser()
    .map(user => {
      if (!user.id) {
        return 'Unauthenticated';
      }
      return user.id;
    });
  }

  private redirectToHome(): void {
    this.router.navigate(['']);
  }
}
