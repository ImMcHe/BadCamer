let addUrl = (url) => {
    let but = document.createElement('button');
    but.innerText = 'Remove';
    but.style.paddingRight = '10px';
    let txt = document.createElement('a');
    txt.style.fontFamily = 'monospace'
    txt.innerText = url;
    txt.href = '/';
    txt.style.paddingRight = '10px';

    let div = document.createElement('div');
    div.appendChild(txt);
    div.appendChild(but);
    but.addEventListener('click', (e) => {
        div.remove();

        chrome.storage.local.get('urls', (data) => {
            let urls = data['urls'] || [];
            while(urls.indexOf(url) != -1){
                let idx = urls.indexOf(url);
                urls.splice(idx, 1);
            }
            chrome.storage.local.set({'urls': urls});
        });
    });
    txt.addEventListener('click', (e) => {
        chrome.tabs.create({'url': 'http://'+url+'/badcamera'});
    });

    document.body.appendChild(div);
};


chrome.storage.local.get('urls', (data) => {
    console.log(data);
    let urls = data['urls'] || [];
    urls.forEach(addUrl);
});


let butcb = () => {
    chrome.storage.local.get('urls', (data) =>
    {
        let val = document.querySelector('input').value;
        let urls = data['urls'] || [];
        urls.push(val);
        addUrl(val);
        document.querySelector('input').value = '';
        chrome.storage.local.set({'urls': urls});
    });
};


document.querySelector('input').addEventListener('keydown', (e) => {
    if(e.key == 'Enter')
        butcb();
});


document.querySelectorAll('button')[0].addEventListener('click', (e) => {
    butcb();
});

document.body.style.width = '300px';

