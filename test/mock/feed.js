'use strict';

angular.module('mockedFeed', [])
  .value('defaultJSON', {
    query: {
      count: 2,
      created: '2013-05-16T15:01:31Z',
      lang: 'en-US',
      results: {
        entry: [
          {
            title: 'Node Roundup: 0.11.2, 0.10.6, subscribe, Omelette',
            link: { href: 'http://dailyjs.com/2013/05/15/node-roundup' },
            updated: '2013-05-15T00:00:00+01:00',
            id: 'http://dailyjs.com/2013/05/15/node-roundup',
            content: { type: 'html', content: 'example' }
          },
          {
            title: 'jQuery Roundup: 1.10, jquery-markup, zelect',
            link: { href: 'http://dailyjs.com/2013/05/14/jquery-roundup' },
            updated: '2013-05-14T00:00:00+01:00',
            id: 'http://dailyjs.com/2013/05/14/jquery-roundup',
            content: { type: 'html', content: 'example 2' }
          }
        ]
      }
    }
  });
