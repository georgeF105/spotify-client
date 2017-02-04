import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../spotify/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Spotify Client';

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  public authUrl(): string {
    return this.authenticationService.getAuthUrl();
  }
}
