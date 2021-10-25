import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetJokeService } from 'src/app/core/services/get-joke.service';
import { Joke } from 'src/app/models/Joke';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
})
export class ContainerComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  public joke!: Joke;
  public togleButton: boolean;

  constructor(private getJokeService: GetJokeService) {
    this.togleButton = false;
  }

  ngOnInit(): void {
    this.subscription = this.getJokeService.get()
    .subscribe(data => this.joke = data)
    this.subscription = this.getJokeService.poll()
      .subscribe(data => this.joke = data)
  }

  /**
   * stop()
   */
  public stop() {
    this.subscription.unsubscribe();
    console.log('(unsubscribe) - Stop eseguito!');
    this.togleButton = !this.togleButton;
  }

  public add(joke: Joke, preference: 'like' | 'dislike') {
    this.getJokeService.add(joke, preference).subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
