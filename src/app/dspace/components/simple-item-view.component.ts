import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, RouteParams} from 'angular2/router';
import {DSpaceDirectory} from '../dspace.directory';

import {DSpaceService} from '../dspace.service';

import {BreadcrumbService} from '../../navigation/breadcrumb.service';


import {ContextComponent} from '../../navigation/context.component';

import {AuthorsComponent} from './item/authors.component';
import {DateComponent} from './item/date.component';
import {MetadataComponent} from './item/metadata.component';
import {CollectionComponent} from './item/collection.component';
import {UriComponent} from './item/uri.component';
import {BitstreamsComponent} from './item/bitstreams.component';
import {ThumbnailComponent} from './item/thumbnail.component';

/**
 * A simple item view, the user first gets redirected here and can optionally view the full item view.
 *
 */

/**
 * Item component for displaying the current item.
 * View contains sidebar context and tree hierarchy below current item.
 */
@Component({
    selector: 'simple-item-view',
    directives: [ContextComponent, AuthorsComponent, DateComponent, CollectionComponent, UriComponent,ROUTER_DIRECTIVES, BitstreamsComponent, ThumbnailComponent],
    template: `
                <div class="container" *ngIf="item">
                    <div class="row">
                        <div class="col-md-12">
                            <context [context]="item"></context>
                        </div>
                        <div class="col-sm-4">
                            <item-thumbnail></item-thumbnail>
                            <item-bitstreams [itemBitstreams]="item.bitstreams"></item-bitstreams>
                            <item-date [itemData]="item.metadata"></item-date>
                            <item-authors [itemData]="item.metadata"></item-authors>
                            <h3>Metadata</h3>
                            <a [routerLink]="['FullItemView',{id:item.id}]">Show full item record</a>
                        </div>

                        <div class="col-sm-8">
                            <div>
                                <item-uri [itemData]="item.metadata"></item-uri>
                                <item-collection [itemData]="item"></item-collection>
                            </div>
                        </div>
                    </div>
                </div>
              `
})
export class SimpleItemViewComponent {

    /**
     * An object that represents the current item.
     *
     * TODO: replace object with inheritance model. e.g. item extends dspaceObject
     */
    item: Object;



    /**
     *
     * @param params
     *      RouteParams is a service provided by Angular2 that contains the current routes parameters.
     * @param directory
     *      DSpaceDirectory is a singleton service to interact with the dspace directory.
     * @param breadcrumb
     *      BreadcrumbService is a singleton service to interact with the breadcrumb component.
     */
    constructor(private params: RouteParams,
                private directory: DSpaceDirectory,
                private breadcrumb: BreadcrumbService) {
        console.log('Item ' + params.get("id"));
        directory.loadObj('item', params.get("id")).then(item => {
            this.item = item;
            console.log(item);
            breadcrumb.visit(this.item);
        });
    }

}



