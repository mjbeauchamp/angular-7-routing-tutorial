import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router} from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    //Using the + symbol before the ID parses it into a number, rather than a string
    const id = +this.activeRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.activeRoute.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id']);
    });
  }

  onEdit() {
    //Here we can pass a relative-route string, because we're already going to be on the servers/:id/ page, so a relative route will work here
    // Using queryParamsHandling allows you to append the /edit onto the URL while preserving the current URL with its current params
    this.router.navigate(['edit'], {relativeTo: this.activeRoute, queryParamsHandling: 'preserve'});
  }

}
