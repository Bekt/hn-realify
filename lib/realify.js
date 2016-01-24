import Firebase from 'firebase';

let realify = () => {
    console.info('Realtime HN Extension. ' +
                 'Issues/feedback: https://github.com/Bekt/hn-realify');

    let fbPaths = {
        '': 'topstories',
        news: 'topstories',
        newest: 'newstories',
        ask: 'askstories',
        show: 'showstories',
        jobs: 'jobstories'
    };

    if (!isValidPage()) {
        log('Extension is not supported on this page.');
        return;
    }

    let table = document.querySelector('.itemlist');
    let path = location.pathname.substring(1);
    // TODO: How to detect if the connection is successful?
    let fb = new Firebase(`https://hacker-news.firebaseio.com/v0/${fbPaths[path]}`);
    let initialLoad = true;

    fb.limitToFirst(30).on('value', (snap) => {
        if (initialLoad || !snap.val()) {
            initialLoad = false;
            return;
        }
        log('Items updated.');
        uglyUpdate();
    });

    function uglyUpdate() {
        let xhr = new XMLHttpRequest();

        // HN servers don't seem to update as quick.
        setTimeout(() => {
            xhr.onreadystatechange = onReady;
            xhr.open('GET', location.href, true);
            xhr.send();
        }, 1000);

        function onReady() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                let doc = document.createElement('html');
                doc.innerHTML = xhr.responseText;
                let newTable = doc.querySelector('.itemlist');
                table.innerHTML = newTable.innerHTML;
                log('Items refreshed.');
            }
        }
    }

    function isValidPage() {
        let m = location.search.match(/(p|next)=(\d)/);
        let p = location.pathname.substring(1);
        if (!fbPaths[p] || (m && parseInt(m[2]) > 1)) {
            return false;
        }
        return true;
    }

    function log(msg) {
        console.log('%s: %s', 'hn-realify', msg);
    }
};

realify();
