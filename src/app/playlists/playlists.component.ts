import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  public playlistsObservable: Observable<any>;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.playlistsObservable = this.getPlaylists();
  }

  private getPlaylists(): Observable<any> {
    return this.spotifyService.getPlaylists()
      .map(results => {
        return results.items;
      });
  }
}
