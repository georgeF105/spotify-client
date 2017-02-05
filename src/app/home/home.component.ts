import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthenticationService } from '../spotify/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Spotify Client';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.route.url.subscribe(url => {
      if (url[0] && url[0].path === 'callback') {
        this.authenticationService.extractAuthToken().subscribe(() => {
          this.redirectToHome();
        });
      }
    if (!this.authenticationService.hasValidAuthToken()) {
      this.authenticationService.fetchAuthToken();
    }
    });
  }

  public getSpotifyAuth(): void {
    this.authenticationService.fetchAuthToken();
  }

  private redirectToHome(): void {
    this.router.navigate(['']);
  }
}
