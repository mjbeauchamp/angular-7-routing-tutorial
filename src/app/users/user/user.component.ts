import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    };
    //activeRoute.params is actually an 'observable'
    //An observable is a special kind of event listener/emitter that allows us, in this case,
    //to listen for changes to the params object and subscribe to those changes and execute a
    //function when they occur
    this.activeRoute.params.subscribe(
      (newParams: Params) => {
        this.user.id = newParams['id'];
        this.user.name = newParams['name'];
      }
    );
  }

}
