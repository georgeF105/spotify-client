import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify/spotify.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public resultsObservable: Observable<any>;
  public tracksObservable: Observable<any>;

  constructor(
    private spotifyService: SpotifyService
  ) { }

  ngOnInit() { }

  public searchFor(search: string): any {
    this.resultsObservable = this.spotifyService.searchFor(search);
    this.tracksObservable = this.spotifyService.searchFor(search)
      .map(results => {
        return results.tracks.items;
      });
  }
}
