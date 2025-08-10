chrome.tabs.onUpdated.addListener((tabid, changeinfo, tab) => {
    if(changeinfo.status == 'complete'){
        chrome.storage.local.get('urls', (data) => {
            let urls = data['urls'] || [];
            if(urls.some((url) => {return tab.url=='http://'+url+'/badcamera';}) || tab.url=='https://heheheha.neocities.org/skibiditoilet'){
                chrome.scripting.executeScript({
                    target: {'tabId': tabid},
                    files: ['bridge.js']
                });
            }
        });
    }
});
