let page = require('sdk/page-mod');

page.PageMod({
    include: 'https://news.ycombinator.com/*',
    contentScriptFile: './dist/realify.min.js'
});
