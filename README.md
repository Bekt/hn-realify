## Hacker News Realified

HN Realified is a basic Chrome (others soon?) extension that auto-updates select 
[Hacker News](https://news.ycombinator.com/) pages.
The code makes use of HN's Firebase-based API.

<div align="center">
  <a href="https://gfycat.com/TanWetGoosefish">
    <img src="https://fat.gfycat.com/OrderlyOffbeatChuckwalla.gif">
  </a>
</div>

## Installation

Google Web Store:

[![](https://i.imgur.com/Kb8UGkY.png)]
(https://chrome.google.com/webstore/detail/egimmhannkdglaafhglalfpfddkfhffk)

## Known Caveats

HN servers and Firebase snapshots are not always synchronized in real-time. 
This goes both ways:
(1) HN servers return stale content when Firebase already detected updates in the data,
and
(2) Firebase update broadcasts are delayed when HN servers are returning fresh data.

Since this extension uses Firebase to subscribe for updates only and fetch HN servers
for the new HTML content, the page is not always updated in real-time because of the
two issues above.

## Development

```sh
# Clone the project and cd into it.
$ npm install
$ npm run build:chrome
```

## Contributing

If the project gains enough traction, below are some nice to have features I have in mind.
Feel free to implement any and submit a PR.

* Firefox, Opera extensions
* Smarter page updates
  * Currently stories are blatantly replaced via `innerHTML` with new HTML content
  (fetched via an AJAX request). It would be nice to replace only changed items.
  This will help with visual indicator.
* Visual indicators
  * It would be nice to visually indicate when items are added/removed/moved.
* Auto-update point and comment counts
* Auto-update comments page
