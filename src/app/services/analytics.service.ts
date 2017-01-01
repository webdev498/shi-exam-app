import {Injectable} from '@angular/core';
var ga = require('autotrack');

@Injectable()
export class AnalyticsService {
    constructor() {
        ga('create', 'UA-89637758-1', 'auto');
        ga('require', 'cleanUrlTracker');
        ga('require', 'outboundLinkTracker');
        ga('require', 'urlChangeTracker');
    }

    pageView(url: string) {
        ga('set', 'page', url);
        ga('send', 'pageview');
    }
}