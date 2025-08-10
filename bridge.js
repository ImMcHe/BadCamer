let dv = document.createElement('div');
dv.id = 'HEHEHEHA';
dv.setAttribute('setimg', chrome.runtime.getURL('agear.png'));
dv.setAttribute('delimg', chrome.runtime.getURL('trash.webp'));
document.body.appendChild(dv);
let script = document.createElement('script');
script.src = chrome.runtime.getURL('content.js');
script.type = 'module';
document.body.appendChild(script);