chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.from === 'hn-realify' && msg.action === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
});
