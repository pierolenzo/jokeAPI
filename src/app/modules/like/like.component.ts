import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Joke } from 'src/app/models/Joke';
import { GetJokeService } from 'src/app/core/services/get-joke.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.sass']
})
export class LikeComponent implements OnInit, OnDestroy {
  private subscriptionData!: Subscription;
  private subscriptionJoke!: Subscription;
  public data!: Joke[];
  public joke!: Joke;

  constructor(private getJokeService: GetJokeService) {
   }

  ngOnInit(): void {
    this.subscriptionData = this.getJokeService.getAll('like')
      .subscribe(d => this.data = d);

    this.subscriptionJoke = this.getJokeService.jokeLike$
      .subscribe( d => this.data.push(d));
  }

  ngOnDestroy(): void {
    this.subscriptionData.unsubscribe();
    this.subscriptionJoke.unsubscribe();
  }

}
