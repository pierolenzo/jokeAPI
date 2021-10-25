import { GetJokeService } from './../../core/services/get-joke.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
})
export class ContainerComponent implements OnInit {
  private subscription!: Subscription;
  public joke: any;

  constructor(private getJokeService: GetJokeService) {
    this.joke = {};
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
