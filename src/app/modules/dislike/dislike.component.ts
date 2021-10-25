import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetJokeService } from 'src/app/core/services/get-joke.service';
import { Joke } from 'src/app/models/Joke';

@Component({
  selector: 'app-dislike',
  templateUrl: './dislike.component.html',
  styleUrls: ['./dislike.component.sass']
})
export class DislikeComponent implements OnInit, OnDestroy {
  private subscriptionData!: Subscription;
  private subscriptionJoke!: Subscription;
  public data!: Joke[];
  public joke!: Joke;

  constructor(private getJokeService: GetJokeService) { }

  ngOnInit(): void {
    this.subscriptionData = this.getJokeService.getAll('dislike')
      .subscribe(d => this.data = d);

    this.subscriptionJoke = this.getJokeService.jokeDislike$
      .subscribe( d => this.data.push(d));
  }

  ngOnDestroy(): void {
    this.subscriptionData.unsubscribe();
    this.subscriptionJoke.unsubscribe();
  }


}
