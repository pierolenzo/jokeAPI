import { GetJokeService } from './../../core/services/get-joke.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass']
})
export class ContainerComponent implements OnInit {
  private subscription!: Subscription;
  private interval!: any;
  public joke!: any;

  constructor(private getJokeService: GetJokeService) {}

  ngOnInit(): void {
    //TODO: Improve with some RxJS operator
    this.interval = setInterval( () => {
      this.subscription = this.getJokeService
        .get().subscribe(data => this.joke = data);
        console.log(this.subscription);
    }, 5000)
  }

  /**
   * stop()
   */
  public stop() {
    clearInterval(this.interval);
    console.log('Stop eseguito!')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
