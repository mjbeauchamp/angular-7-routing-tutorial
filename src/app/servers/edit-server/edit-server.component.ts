import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {query} from '@angular/animations';
import {Observable} from 'rxjs/Observable';

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
  changesSaved = false;

  constructor(private serversService: ServersService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.queryParams = this.activeRoute.snapshot.queryParams;
    this.activeRoute.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.activeRoute.fragment.subscribe();
    const id = +this.activeRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activeRoute});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?')
    } else {
      return true;
    }
  }

}
