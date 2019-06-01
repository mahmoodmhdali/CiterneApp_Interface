import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CountdownService {

  startTimer = new Subject<number>();
  timer = this.startTimer
    .switchMap(seconds =>
      Observable.timer(0, 1000)
        .map(t => seconds - t)
        .take(seconds + 1)
    );
  lockedFor = 0;

  start(time: number) {
    const seconds = Math.floor(time / 1000);
    this.startTimer.next(seconds);
  }

  timeLeft(): Observable<number> {
    return this.timer;
  }

  setLockedFor(lockedFor: number) {
    this.lockedFor = lockedFor;
  }

  getLockedFor() {
    return this.lockedFor;
  }

}
