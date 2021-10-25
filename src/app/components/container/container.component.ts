import { GetJokeService } from './../../core/services/get-joke.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Joke } from 'src/app/models/Joke';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
})
export class ContainerComponent implements OnInit {
  private subscription!: Subscription;
  public joke!: Joke;

  constructor(private getJokeService: GetJokeService) {
  }

  ngOnInit(): void {
    this.subscription = this.getJokeService.poll()
      .subscribe(data => this.joke = data)
  }

  /**
   * stop()
   */
  public stop() {
    this.subscription.unsubscribe();
    console.log('(unsubscribe) - Stop eseguito!');
  }

  public add(joke: Joke, preference: 'like' | 'dislike') {
    this.getJokeService.add(joke, preference).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
