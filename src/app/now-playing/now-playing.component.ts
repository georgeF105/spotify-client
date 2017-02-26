import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { PlayerService } from '../spotify/player.service';
import { ITrack } from '../interfaces/ITrack';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.scss']
})
export class NowPlayingComponent implements OnInit {
  public nowPlayingObservable: Observable<ITrack>;
  public upNextObservable: Observable<ITrack[]>;

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.nowPlayingObservable = this.playerService.getNowPlaying();
    this.upNextObservable = this.playerService.getUpNext();
  }

  public removeTrackFromUpNext(track: ITrack): void {
    this.playerService.removeTrackFromUpNext(track);
  }
}
