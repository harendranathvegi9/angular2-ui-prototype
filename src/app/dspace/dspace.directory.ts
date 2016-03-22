﻿import {EventEmitter, Injectable} from 'angular2/core';
import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

import {DSpaceService} from './dspace.service';

@Injectable()
export class DSpaceDirectory {

    store: {
        directory: {
            context: Object[],
            observer: Observer<Object[]>,
            loader: Function,
            loading: boolean,
            ready: boolean
        }
    };

    directory: Observable<Object[]>;

    constructor(private dspaceService: DSpaceService) {
        this.store = {
            directory: {
                context: new Array<Object>(),
                observer: null,
                loader: this.loadDirectory,
                loading: false,
                ready: false
            }
        };
        this.directory = new Observable<Object[]>(observer => this.store.directory.observer = observer).share();
    }

    loadDirectory() {
        if (this.store.directory.ready) {
            this.directory = Observable.create(observer => {
                this.store.directory.observer = observer;
                this.store.directory.observer.next(this.store.directory.context);
            });
        }
        else {
            if (!this.store.directory.loading) {
                this.store.directory.loading = true;
                this.dspaceService.fetchTopCommunities().subscribe(topCommunities => {
                    this.store.directory.context = this.prepare(topCommunities);
                    this.store.directory.observer.next(this.store.directory.context);
                },
                error => {
                    console.error('Error: ' + JSON.stringify(error, null, 4));
                },
                () => {
                    this.store.directory.ready = true;
                    this.store.directory.loading = false;
                    console.log('finished fetching top communities');
                });
            }
        }
    }

    addToDirectory() {

    }

    prepare(communities) {
        communities.forEach(community => {
            let app = this.dspaceService.getApp();
            let route = community.link.substring(app.length, community.link.length);
            community.path = '/' + route.charAt(1).toUpperCase() + route.substring(2, route.length);
        });
        return communities;
    }

    gather() {

    }

}