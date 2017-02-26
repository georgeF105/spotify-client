import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

import { SpotifyService } from './spotify.service';
import { ITrack } from '../interfaces/ITrack';

@Injectable()
export class PlayerService {
  private upNext: Array<ITrack> = [];
  private upNextStream = new Subject();
  private nowPlaying: ITrack;
  private nowPlayingStream = new Subject();

  constructor(
    private spotifyService: SpotifyService
  ) { }

  public addTrackToUpNext(track: ITrack): void {
    this.upNext.push(track);
    this.upNextStream.next(this.upNext);
    if (this.upNext.length === 1) {
      this.nowPlaying = track;
      this.nowPlayingStream.next(this.nowPlaying);
    }
  }

  public removeTrackFromUpNext(track: ITrack): void {
    this.upNext = this.upNext.filter(t => t.id !== track.id);
    this.upNextStream.next(this.upNext);
  }

  public getUpNext(): Observable<ITrack[]> {
    return Observable.from(this.upNextStream);
  }

  public getNowPlaying(): Observable<ITrack> {
    return Observable.from(this.nowPlayingStream);
  }
}
