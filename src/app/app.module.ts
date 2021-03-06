import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { appRouter } from './app.router';
import { SpotifyService } from './spotify/spotify.service';
import { AuthenticationService } from './spotify/authentication.service';
import { PlayerService } from './spotify/player.service';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { NowPlayingComponent } from './now-playing/now-playing.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    PlaylistsComponent,
    NowPlayingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    appRouter,
    MaterialModule.forRoot()
  ],
  providers: [
    SpotifyService,
    AuthenticationService,
    PlayerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
