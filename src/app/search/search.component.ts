import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { Observable } from 'rxjs/Observable';

import { PlayerService } from '../spotify/player.service';
import { ITrack } from '../interfaces/ITrack';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public resultsObservable: Observable<any>;
  public tracksObservable: Observable<any>;
  public artistsObservable: Observable<any>;
  public albumObservable: Observable<any>;
  public playlistObservable: Observable<any>;

  constructor(
    private spotifyService: SpotifyService,
    private playerService: PlayerService
  ) { }

  ngOnInit() { }

  public searchFor(search: string): any {
    this.resultsObservable = this.spotifyService.searchFor(search).share();
    this.tracksObservable = this.resultsObservable
      .map(results => {
        return results.tracks.items;
      })
      .catch(err => {
        console.log('error', err);
        return [];
      });
    this.artistsObservable = this.resultsObservable
      .map(results => {
        console.log('results', results);
        return results.artists.items;
      });
    this.albumObservable = this.resultsObservable
      .map(results => {
        return results.albums.items;
      });
    this.playlistObservable = this.resultsObservable
      .map(results => {
        return results.playlists.items;
      });
  }

  public addTrackToUpNext(track: ITrack): void {
    this.playerService.addTrackToUpNext(track);
  }
}
