import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params} from '@angular/router';
import {query} from '@angular/animations';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  queryParams = {};
  allowEdit = false;

  constructor(private serversService: ServersService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.queryParams = this.activeRoute.snapshot.queryParams;
    this.activeRoute.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.activeRoute.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
