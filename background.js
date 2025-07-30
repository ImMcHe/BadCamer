chrome.tabs.onUpdated.addListener((tabid, changeinfo, tab) => {
    console.log(tab.url);
    if(changeinfo.status == 'complete'){
        chrome.storage.local.get('urls', (data) => {
            let urls = data['urls'] || [];
            if(urls.some((url) => {return tab.url == 'http://'+url+'/badcamera';}))
                chrome.scripting.executeScript({
                    'target': {'tabId': tabid},
                    'func': () => {
                        let script = document.createElement('script');
                        script.type = 'module';
                        script.src = chrome.runtime.getURL('content.js');
                        document.documentElement.appendChild(script);
                        script.remove();
                    }
                });
        });
    }
});
