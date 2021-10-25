import { GetJokeService } from './../../core/services/get-joke.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import { mergeMap, delay, repeat } from 'rxjs/operators';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
})
export class ContainerComponent implements OnInit {
  private subscription!: Subscription;
  private DELAY: number;
  public joke: any;

  constructor(private getJokeService: GetJokeService) {
    this.DELAY = 5000;
    this.joke = {};
  }

  ngOnInit(): void {
    this.subscription = of({}).pipe(
      mergeMap((_) => this.getJokeService.get()),
      delay(this.DELAY),
      repeat()
    ).subscribe(data => this.joke = data)
  }

  /**
   * stop()
   */
  public stop() {
    this.subscription.unsubscribe();
    console.log('Stop eseguito!');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
