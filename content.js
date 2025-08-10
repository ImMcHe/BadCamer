import * as M from './module.js';
let lnk = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d5510b7c-9501-4155-82c8-84f254405621/diky6hx-f139fbb9-650a-425e-a8ac-b76adc99cfef.jpg/v1/fill/w_1280,h_720,q_75,strp/summer_retreat_by_mathusalambre_diky6hx-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZDU1MTBiN2MtOTUwMS00MTU1LTgyYzgtODRmMjU0NDA1NjIxXC9kaWt5Nmh4LWYxMzlmYmI5LTY1MGEtNDI1ZS1hOGFjLWI3NmFkYzk5Y2ZlZi5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.MwIq1K1-3tDLJKR1D0boe2gK6ZprnrYFQ5toYLQaAbA';

(async() => {
    let delimg = document.getElementById('HEHEHEHA');
    let setimg = delimg.getAttribute('setimg');
    delimg = delimg.getAttribute('delimg');
    document.head.innerHTML = '';
    document.body.innerHTML = '<div id=HEHEHEHEHA></div>';
    document.body.style.margin = '0px';
    document.body.style.overflowX = 'none';
    document.body.style.overflowY = 'none';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = '#222';
    document.title = 'Bad camera';
    document.addEventListener('touchstart', (e) => {
        e.preventDefault();
    }, {'passive':false});

    let loading = document.createElement('div');
    loading.style = 'width:100%;height:100%;z-index:99999;background-color:#333;position:absolute;color:#FFF;font-size:100px';
    loading.innerHTML = 'Loading ';
    document.body.appendChild(loading);

    let loadingLoop = () => {
        if(!loading)
            return;
        loading.innerHTML += '.';
        if(loading.innerHTML.length == 12)
            loading.innerHTML = 'Loading ';
        setTimeout(loadingLoop, 250);
    };
    loadingLoop();

    let img = await M.createImage();
    let pic = document.createElement('img');
    pic.crossOrigin = 'anonymous';
    let disabed = 1;
    if(img == null)
        pic.src = lnk;
    else{
        pic.src = img;
        disabed = 0;
    }
    pic.draggable = false;
    pic.style.userSelect = 'none';
    for(let i of ['click','touchstart'])
        pic.addEventListener(i, (e) => {
            if(i == 'touchstart')
                e = e.touches[e.touches.length-1];
            if(prevMoveSpeed['x'] || prevMoveSpeed['y'])
                prevMoveSpeed = {'x':0,'y':0};
            if(disabed)
                return;
            let rct = pic.getBoundingClientRect();
            M.click((e.clientX-rct.left)/rct.width*1280, (e.clientY-rct.top)/rct.height*720);
        }, {'passive':true});

    document.addEventListener('visibilitychange', async() => {
        if(!document.hidden && !disabed){
            await M.destroyImage();
            img = await M.createImage();
            pic.src = img;
        }
    }, {'passive':true});

    let cont = document.createElement('div');
    cont.style.display = 'flex';
    cont.style.width = '100%';
    cont.style.height = '100%';
    cont.style.alignItems = 'center';
    let lft = document.createElement('div');
    lft.style.width = '250px';
    lft.style.height = '100%';
    let rgh = document.createElement('div');
    rgh.style.width = '250px';
    rgh.style.height = '100%';
    pic.style.width = '100%';
    lft.style.zIndex = 15;
    rgh.style.zIndex = 15;
    let cen = document.createElement('div');
    cen.style.width = 'calc(100% - 500px)';
    cen.style.height = 'auto';
    cen.style.position = 'relative';
    cen.appendChild(pic);
    cont.appendChild(lft);
    cont.appendChild(cen);
    cont.appendChild(rgh);
    document.body.appendChild(cont);

    let disabImg = document.createElement('div');
    disabImg.style.width = '20px';
    disabImg.style.height = '20px';
    disabImg.style.position = 'absolute';
    disabImg.style.zIndex = 2;
    cen.appendChild(disabImg);
    disabImg.style.left = '0px';
    disabImg.style.top = '0px';
    disabImg.style.cursor = 'pointer';
    disabImg.innerHTML = '<svg width=20 height=20><circle cx=10 cy=10 r=8 fill=none stroke=#DDD stroke-width=4 /><line x1=5 x2=15 y1=5 y2=15 stroke=#DDD stroke-width=4 /></svg>'

    for(let i of ['click','touchstart'])
        disabImg.addEventListener(i, async() => {
            if(disabed){
                img = await M.createImage();
                if(!img)
                    return;
                pic.src = img;
                disabed = 0;
            }else{
                disabed = 1;
                await M.destroyImage(img);
                pic.src = lnk;
            }
        }, {'passive':true});

    lft.style.background = '#333';
    rgh.style.background = '#333';
    lft.style.boxShadow = '0px 0px 15px black';
    rgh.style.boxShadow = '0px 0px 15px black';

    let movePan = document.createElement('div');
    movePan.style.width = '250px';
    movePan.style.height = '150px';
    lft.appendChild(movePan);
    movePan.style.display = 'flex';
    movePan.style.boxShadow = '-2px 2px 5px black';
    movePan.style.backgroundColor = '#222';
    movePan.style.position = 'relative';
    movePan.style.zIndex = 15;

    let zoomMovePan = document.createElement('div');
    zoomMovePan.style.width = '65px';
    zoomMovePan.style.height = '150px';
    movePan.appendChild(zoomMovePan);
    zoomMovePan.style.display = 'flex';
    zoomMovePan.style.alignItems = 'center';
    zoomMovePan.style.position = 'relative';

    let focMovePan = document.createElement('div');
    focMovePan.style.width = '65px';
    focMovePan.style.height = '150px';
    movePan.appendChild(focMovePan);
    focMovePan.style.display = 'flex';
    focMovePan.style.alignItems = 'center';
    focMovePan.style.position = 'relative';

    let extMovePan = document.createElement('div');
    extMovePan.style.width = '120px';
    extMovePan.style.height = '150px';
    movePan.appendChild(extMovePan);
    extMovePan.style.display = 'flex';
    extMovePan.style.alignItems = 'center';

    let intMovePan = document.createElement('div');
    intMovePan.style.width = '120px';
    intMovePan.style.height = '120px';
    intMovePan.style.position = 'relative';
    extMovePan.appendChild(intMovePan);

    let addText = (x, y, txt, s) => {
        let ret = document.createElement('div');
        ret.style = `font-family:arial;white-space:nowrap;font-size:${s}px;text-align:center;position:absolute;left:${x}px;top:${y}px;color:#FFF;user-select:none;transform:translateY(-50%) translateX(-50%)`;
        ret.innerText = txt;
        return ret;
    };

    let handleBar = document.createElement('div');
    handleBar.style.width = '80px';
    handleBar.style.height = '80px';
    handleBar.style.position = 'absolute';
    handleBar.style.top = '20px';
    handleBar.style.left = '20px';
    intMovePan.appendChild(handleBar);
    handleBar.innerHTML = '<svg width=80 height=80><circle cx=40 cy=40 r=40 fill=#333 /></svg>';
    handleBar.appendChild(addText(40, 40, 'Move', 15)); 

    let zoomHandleBar = document.createElement('div');
    zoomHandleBar.style.width = '65px';
    zoomHandleBar.style.height = '65px';
    zoomHandleBar.style.position = 'absolute';
    zoomMovePan.appendChild(zoomHandleBar);
    zoomHandleBar.innerHTML = '<svg width=65 height=65><circle cx=32.5 cy=32.5 r=27.5 fill=#333 /></svg>';
    zoomHandleBar.appendChild(addText(32.5, 32.5, 'Zoom', 12));

    let focHandleBar = document.createElement('div');
    focHandleBar.style.width = '65px';
    focHandleBar.style.height = '65px';
    focHandleBar.style.position = 'absolute';
    focMovePan.appendChild(focHandleBar);
    focHandleBar.innerHTML = '<svg width=65 height=65><circle cx=32.5 cy=32.5 r=27.5 fill=#333 /></svg>';
    focHandleBar.appendChild(addText(32.5, 32.5, 'Focus (?)', 9));

    intMovePan.insertAdjacentHTML('beforeend', '<svg width=120 height=120><circle cx=60 cy=60 r=52.5 stroke=#333 stroke-width=5 fill=none /></svg>');
    zoomMovePan.insertAdjacentHTML('beforeend', '<svg width=65 height=150><rect width=50 height=135 y=7.5 x=7.5 rx=32.5 ry=32.5 fill=none stroke=#333 stroke-width=5 /></svg>');
    focMovePan.insertAdjacentHTML('beforeend', '<svg width=65 height=150><rect width=50 height=135 y=7.5 x=7.5 rx=32.5 ry=32.5 fill=none stroke=#333 stroke-width=5 /></svg>');

    let keys = {'up':0,'down':0,'left':0,'right':0,'zin':0,'zout':0,'fin':0,'fout':0,'smooth':0};
    let moveSpeed = {'x':0, 'y':0};
    let zoomSpeed = 0;
    let focusSpeed = 0;
    let prevZoomSpeed = 0;
    let prevFocusSpeed = 0;
    let prevMoveSpeed = {'x':0, 'y':0};
    let zoomPos = await M.getZoom();
    let focusPos = await M.getFocus();
    let prevZoomPos = -1;
    let prevFocusPos = -1;
    if(!localStorage.getItem('irisPos'))
        localStorage.setItem('irisPos', '.5');
    if(!localStorage.getItem('gainPos'))
        localStorage.setItem('gainPos', '15');
    let irisPos = await M.getIris();
    irisPos -= 2.4;
    irisPos /= (25.5 - 2.4);
    let gainPos = await M.getGain();
    let autoIris = await M.getAutoIris();
    let autoGain = 0;
    if(autoIris)
        irisPos = parseFloat(localStorage.getItem('irisPos'));
    if(gainPos == -1){
        autoGain = 1;
        gainPos = parseInt(localStorage.getItem('gainPos'));
    }
    localStorage.setItem('irisPos', String(irisPos));
    localStorage.setItem('gainPos', String(gainPos));
    let wbPos = await M.getTemperatureVar();
    let wbVarA = Math.log(10/3) * 2;
    let wbVarB = 13000 / (Math.exp(wbVarA) - 1);
    let wbVarC = 2000 - wbVarB;
    wbPos = Math.log((wbPos - wbVarC) / wbVarB) / wbVarA;
    let wbMode = await M.getTemperatureMode();
    let shutMode = await M.getShutterMode();
    let prevIrisPos = -1;
    let prevGainPos = -1;
    let prevWbPos = -1;
    let autoFocus = await M.getAutoFocus();
    let autoFocusGet = 0;
    focHandleBar.children[1].innerText = autoFocus?'Focus (A)':'Focus (M)';
    focHandleBar.children[0].children[0].setAttribute('fill', autoFocus?'#446':'#333');

    let imgCnv = document.createElement('canvas');
    let imgCtx = imgCnv.getContext('2d');

    cont = document.createElement('div');
    cont.style.display = 'flex';
    cont.style.width = '250px';
    cont.style.height = '150px';
    cont.style.alignItems = 'center';
    cont.style.boxShadow = '2px 2px 5px black';
    cont.style.backgroundColor = '#222';
    cont.style.position = 'relative';
    rgh.appendChild(cont);

    let gainPan = document.createElement('div');
    gainPan.style.width = '40px';
    gainPan.style.height = '150px';
    gainPan.innerHTML = '<svg width=40 height=150><rect width=10 height=130 x=15 y=10 fill=#333 rx=5 ry=5 /></svg>';
    cont.appendChild(gainPan);

    let gainHandle = document.createElement('div');
    gainHandle.style.width = '30px';
    gainHandle.style.height = '30px';
    gainHandle.style.left = '5px';
    gainHandle.style.top = '60px';
    gainHandle.style.position = 'absolute';
    gainHandle.innerHTML = '<svg width=30 height=30><circle cx=15 cy=15 r=15 fill=#333 /></svg>';
    gainHandle.appendChild(addText(15, 15, 'HEHEHEHA SKIBIDI TOILETS', 7));
    gainHandle.children[0].children[0].setAttribute('fill',autoGain?'#446':'#333');
    cont.appendChild(gainHandle);

    let irsPan = document.createElement('div');
    irsPan.style.width = '40px';
    irsPan.style.height = '150px';
    irsPan.innerHTML = '<svg width=40 height=150><rect width=10 height=130 x=15 y=10 fill=#333 rx=5 ry=5 /></svg>';
    cont.appendChild(irsPan);

    let irsHandle = document.createElement('div');
    irsHandle.style.width = '30px';
    irsHandle.style.height = '30px';
    irsHandle.style.left = '45px';
    irsHandle.style.top = '60px';
    irsHandle.style.position = 'absolute';
    irsHandle.innerHTML = '<svg width=30 height=30><circle cx=15 cy=15 r=15 fill=#333 /></svg>';
    irsHandle.appendChild(addText(15, 15, 'HEHEHEHA SKIBIDI TOILETS', 7));
    irsHandle.children[0].children[0].setAttribute('fill',autoIris?'#446':'#333');
    cont.appendChild(irsHandle);

    let wbPan = document.createElement('div');
    wbPan.style.width = '40px';
    wbPan.style.height = '150px';
    wbPan.innerHTML = '<svg width=40 height=150><rect width=10 height=130 x=15 y=10 fill=#333 rx=5 ry=5 /></svg>';
    cont.appendChild(wbPan);

    let wbHandle = document.createElement('div');
    wbHandle.style.width = '30px';
    wbHandle.style.height = '30px';
    wbHandle.style.left = '85px';
    wbHandle.style.top = '60px';
    wbHandle.style.position = 'absolute';
    wbHandle.innerHTML = '<svg width=30 height=30><circle cx=15 cy=15 r=15 fill=#333 /></svg>';
    wbHandle.appendChild(addText(15, 15, 'HEHEHEHA SKIBIDI TOILETS', 7));
    cont.appendChild(wbHandle);

    let butStyle = document.createElement('style');
    butStyle.innerHTML = '.buttonB{cursor:pointer;color:white;display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-color:#222;font-size:8px;font-family:arial;white-space:pre;user-select:none}.buttonB:hover{background-color:#333}';
    document.head.appendChild(butStyle);

    let lensSel = document.createElement('div');
    lensSel.style = 'width:70px;height:150px;display:flex;flex-direction:column';
    cont.appendChild(lensSel);

    for(let i of [0,'Off','Step','Synchro','ELC']){
        let but = document.createElement('div');
        but.setAttribute('class', 'buttonB');
        if(i){
            but.innerText = i;
            but.id = i;
            for(let j of ['click','touchstart'])
                but.addEventListener(j, async() => {
                    if(disabed)
                        return;
                    await M.setShutterMode(i);
                    document.getElementById(shutMode).style = '';
                    but.style = 'background-color:#333 !important';
                    shutMode = i;
                }, {'passive':true});
        }else{
            but.innerText = 'Shutter Mode:';
            but.style = 'cursor:default;background-color:transparent !important';
        }
        lensSel.appendChild(but);
    }

    let wbSel = document.createElement('div');
    wbSel.style = 'width:70px;height:150px;display:flex;flex-direction:column';
    cont.appendChild(wbSel);

    for(let i of [0,'ATW','ATW_A','ATW_B','3200K','5600K','VAR']){
        let but = document.createElement('div');
        but.setAttribute('class', 'buttonB');
        if(i){
            but.innerText = i;
            but.id = i;
            for(let j of ['click','touchstart'])
                but.addEventListener(j, async() => {
                    if(disabed)
                        return;
                    await M.setTemperatureMode(i);
                    document.getElementById(wbMode).style = '';
                    but.style = 'background-color:#333 !important';
                    wbMode = i;
                }, {'passive':true});
        }else{
            but.innerText = 'WB Mode:';
            but.style = 'cursor:default;background-color:transparent !important';
        }
        wbSel.appendChild(but);
    }

    document.getElementById(shutMode).style = 'background-color:#333 !important';
    document.getElementById(wbMode).style = 'background-color:#333 !important';

    let pres = document.createElement('div');
    pres.setAttribute('class', 'buttonC');
    lft.appendChild(pres);

    butStyle = document.createElement('style');
    butStyle.innerHTML = '.buttonC{width:250px;height:calc(100% - 150px);overflow-x:hidden;overflow-y:auto;scrollbar-width:none}.buttonC::-webkit-scrollbar{display:none}';
    document.head.appendChild(butStyle);

    let presY;
    let presScrollTop;
    let vel;
    let lastTime;
    let lastY;
    let momentId;

    pres.addEventListener('touchstart', (e) => {
        if(momentId){
            cancelAnimationFrame(momentId);
            momentId = 0;
            vel = 0;
        }
        presY = e.touches[0].clientY;
        presScrollTop = pres.scrollTop;
        lastY = presY;
        lastTime = performance.now();
    }, {'passive':true});
    pres.addEventListener('touchmove', (e) => {
        let curY = e.touches[0].clientY;
        let now = performance.now();
        let dy = curY - presY;
        pres.scrollTop = presScrollTop - dy;
        let dt = now - lastTime;
        if(dt>0){
            vel = (curY-lastY) / dt;
            lastTime = now;
            lastY = curY;
        }
    }, {'passive':true});
    pres.addEventListener('touchend', (e) => {
        if(e.touches.length == 0){
            let stTime = -1;
            let step = (curTime) => {
                if(stTime == -1)
                    stTime = curTime;
                let dt = curTime - stTime;
                stTime = curTime;
                vel *= Math.pow(.94, dt*.08);
                if(Math.abs(vel) > .005){
                    pres.scrollTop -= vel * dt;
                    momentId = requestAnimationFrame(step);
                }else
                    momentId = 0;
            };
            momentId = requestAnimationFrame(step);
        }
    }, {'passive':true});

    let createTp = (ix) => {
        let dispbox = document.createElement('div');
        dispbox.style = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:absolute;top:0px;left:0px;z-index:999;background-color:rgba(0,0,0,.5)';
        dispbox.setAttribute('name', 'HEHEHEHALESKIBIDITOIL');
        document.body.appendChild(dispbox);
        let isAsignKey = 0;
        let dat = JSON.parse(localStorage.getItem('val'+ix));

        let addEv = (el,cb) => {
            for(let i of el==dispbox?['click','touchstart']:['click'])
                el.addEventListener(i,cb,{'passive':true});
        };

        let evcb = (e) => {
            if(e.code == 'Escape'){
                if(isAsignKey){
                    ask.innerText = 'Nothing';
                    isAsignKey = 0;
                    return;
                }
                dispbox.click();
                return;
            }
            if(isAsignKey){
                ask.innerText = e.code;
                isAsignKey = 0;
            }
        };

        addEv(dispbox, () => {
            let dat = JSON.parse(localStorage.getItem('val'+ix));
            let idx=0, tot=0;
            let cb = (txt, val) => {
                tot++;
                let cb1 = (r) => {
                    if(r != undefined)
                        dat[txt.slice(3)] = r;
                    idx++;
                    if(idx == tot){
                        if(lst[1].innerText == 'Transition: Jump')
                            dat['moveEase'] = 0;
                        else
                            dat['moveEase'] = 1;
                        if(lst[4].innerText == 'Transition: Jump')
                            dat['zoomEase'] = 0;
                        else
                            dat['zoomEase'] = 1;
                        dat['key'] = ask.innerText;
                        pres.children[parseInt(ix/2)].children[ix%2].children[2].innerText = dat['key'];
                        if(retake.innerText[1] == 'i'){
                            imgCnv.width = 192*2;
                            imgCnv.height = 108*2;
                            imgCtx.drawImage(pic, 0, 0, 192*2, 108*2);
                            let daturl = imgCnv.toDataURL('image/jpeg', .4);
                            pres.children[parseInt(ix/2)].children[ix%2].children[1].src = daturl;
                            localStorage.setItem('img'+ix, daturl);
                        }
                        localStorage.setItem('val'+ix, JSON.stringify(dat));
                        dispbox.remove();
                        document.removeEventListener('keydown', evcb, {'passive':true});
                    }
                };
                if(!txt)
                    setTimeout(() => {cb1();}, 0);
                else if(!val)
                    M[txt]().then(cb1);
                else
                    setTimeout(() => {cb1(val);}, 0);
            };

            cb();
            if(lst[0].innerText == 'Disabled')
                cb('getPosition', 'D');
            else if(lst[2].innerText == 'Will be recorded')
                cb('getPosition');
            if(lst[3].innerText == 'Disabled')
                cb('getZoom', 'D');
            else if(lst[5].innerText == 'Will be recorded')
                cb('getZoom');

            let curIx = 6;
            for(let i of ['getFocus', 'getAutoFocus', 'getIris', 'getAutoIris', 'getGain', 'getShutterMode', 'getTemperatureMode', 'getTemperatureVar']){
                if(i[3]=='A' || i=='getTemperatureVar')
                    curIx -= 2;
                if(lst[curIx].innerText == 'Disabled')
                    cb(i, 'D');
                else if(lst[curIx+1].innerText == 'Will be recorded')
                    cb(i);
                curIx += 2;
            }
        });
        let dispint = document.createElement('div');
        dispbox.appendChild(dispint);
        dispint.style.width = '300px';
        dispint.style.height = '500px';
        dispint.style.backgroundColor = '#222';
        for(let i of ['touchstart','click'])
            dispint.addEventListener(i, (e) => {e.stopPropagation();}, {'passive':true});
        dispint.style.boxShadow = '0px 0px 10px #000';

        let img = document.createElement('img');
        img.src = pres.children[parseInt(ix/2)].children[ix%2].children[1].src;
        img.style.width = '300px';
        img.style.height = '169px';
        dispint.appendChild(img);

        let retake = document.createElement('div');
        retake.style = 'width:300px;height:25px;font-size:15px';
        retake.setAttribute('class', 'buttonB');
        retake.innerText = 'Will retake picture';
        addEv(retake, () => {retake.innerText = retake.innerText[1]=='o'?'Will retake picture':'Won\'t retake picture';});
        dispint.appendChild(retake);

        let kys = document.createElement('div');
        kys.style = 'width:300px;height:25px;display:flex;color:white;font-family:arial';
        dispint.appendChild(kys);

        let setk = document.createElement('div');
        setk.addEventListener('click', () => {isAsignKey=1;ask.innerText='Set...';});
        setk.setAttribute('class', 'buttonB');
        setk.style = 'width:150px;height:25px;font-size:15px';
        setk.innerText = 'Set key';
        kys.appendChild(setk);

        let ask = document.createElement('div');
        ask.style = 'width:150px;height:25px;display:flex;display:flex;justify-content:center;align-items:center';
        ask.innerText = dat['key'];
        kys.appendChild(ask);
        let lst = [];

        let addTxt = (txt, va, vb) => {
            let curPan = document.createElement('div');
            curPan.style = 'width:300px;height:25px;display:flex;color:white;font-family:arial';
            dispint.appendChild(curPan);

            let tmp = document.createElement('div');
            tmp.innerText = txt;
            tmp.style = 'width:100px;height:25px;display:flex;justify-content:center;align-items:center';
            curPan.appendChild(tmp);

            let enab = document.createElement('div');
            enab.innerText = va!='D'?'Enabled':'Disabled';
            enab.style = 'width:50px;height:25px;font-size:10px;'+(va=='D'?'':'background-color:#333');
            enab.setAttribute('class', 'buttonB');
            addEv(enab, () => {
                enab.innerText = enab.innerText=='Enabled'?'Disabled':'Enabled';
                if(enab.innerText == 'Enabled')
                    enab.style.backgroundColor = '#333';
                else
                    enab.style.backgroundColor = '';
            });
            curPan.appendChild(enab);
            lst.push(enab);

            if(vb != undefined){
                let type = document.createElement('div');
                type.innerText = 'Transition: '+(vb?'Ease':'Jump');
                type.style = 'width:75px;height:25px;font-size:9px';
                type.setAttribute('class', 'buttonB');
                addEv(type, () => {
                    type.innerText = type.innerText=='Transition: Jump'?'Transition: Ease':'Transition: Jump';
                });
                curPan.appendChild(type);
                lst.push(type);
            }

            let setS = document.createElement('div');
            setS.innerText = 'Will be recorded';
            setS.style = 'width:'+(txt=='Move'||txt=='Zoom'?75:150)+'px;height:25px;font-size:8.3px';
            setS.setAttribute('class', 'buttonB');
            addEv(setS, () => {
                setS.innerText = setS.innerText=='Will be recorded'?'Won\'t be recorded':'Will be recorded';
            });
            curPan.appendChild(setS);
            lst.push(setS);
        };
        addTxt('Move', dat['Position'], dat['moveEase']);
        addTxt('Zoom', dat['Zoom'], dat['zoomEase']);
        addTxt('Focus', dat['Focus']);
        addTxt('Iris', dat['Iris']);
        addTxt('Gain', dat['Gain']);
        addTxt('Shutter', dat['ShutterMode']);
        addTxt('WB', dat['TemperatureVar']);

        document.addEventListener('keydown', evcb, {'passive':true});
    };

    let addPlus = () => {
        let en = pres.children[pres.childElementCount-1];

        if(!en || (en.children[1].childElementCount && en.children[1].children[0].tagName!='svg')){
            en = document.createElement('div');
            en.style.width = '100%';
            en.style.height = '70px';
            en.style.display = 'flex';
            pres.appendChild(en);
            for(let i=0; i<2; i++){
                let tmp = document.createElement('div');
                tmp.style.width = '50%';
                tmp.style.height = '70px';
                tmp.style.position = 'relative';
                tmp.style.color = 'white';
                en.appendChild(tmp);
            }
        }
        for(let i=0; i<2; i++){
            let tmp = en.children[i];
            if(!tmp.childElementCount){
                tmp.style.display = 'flex';
                tmp.style.alignItems = 'center';
                tmp.style.justifyContent = 'center';
                tmp.innerHTML = '<svg width=50 height=50><line x1=0 x2=50 y1=25 y2=25 stroke-width=5 stroke=#FFF /><line y1=0 y2=50 x1=25 x2=25 stroke-width=5 stroke=#FFF /></svg>';
                tmp.style.cursor = 'pointer';
                tmp.style.backgroundColor = '#2A2A2A';
                for(let j of ['click','touchstart'])
                    tmp.addEventListener(j, () => {addPres();}, {'passive':true});
                break;
            }
        }
    };
    let addPres = (val) => {
        let en = pres.children[pres.childElementCount-1];
        let lensTmp = pres.childElementCount-1;
        let tmp = en.children[0].children[0].tagName=='svg'?en.children[0]:en.children[1];
        let tmp1 = tmp.cloneNode(true);
        tmp.parentElement.replaceChild(tmp1, tmp);

        for(let i=0; i<2; i++)
            if(en.children[i].children[0].tagName=='svg'){
                let ths = en.children[i];
                ths.style.display = 'block';
                ths.innerHTML = '<div style=width:60px;height:30px;position:absolute;display:flex;z-index:9></div><img width=100% height=100%><div>Nothing</div>';
                ths.children[0].innerHTML = '<img style=width:30px;height:30px;filter:invert(1) draggable=false><img style=width:30px;height:30px;filter:invert(1) draggable=false>';
                ths.children[0].children[0].src = setimg;
                ths.children[0].children[1].src = delimg;
                ths.children[2].style = 'position:absolute;bottom:0px;right:0px;color:white;font-family:arial;background-color:rgba(0,0,0,.5);padding:5px;font-size:10px';
                let moved1 = 0;
                let moved2 = 0;
                let moved3 = 0;

                for(let j of ['touchstart','touchmove','touchend','click'])
                    ths.children[0].children[0].addEventListener(j, () => {
                        let cpy = j;
                        if(j=='touchstart')
                            moved1 = 0;
                        if(j=='touchmove')
                            moved1 = 1;
                        if(j=='touchend'){
                            if(!moved1)
                                cpy = 'click';
                        }
                        if(cpy != 'click')
                            return;

                        createTp(Array.from(ths.parentElement.parentElement.children).indexOf(ths.parentElement)*2+Array.from(ths.parentElement.children).indexOf(ths));
                }, {'passive':true});
                for(let j of ['touchstart','touchmove','touchend','click'])
                    ths.children[0].children[1].addEventListener(j, () => {
                        let cpy = j;
                        if(j=='touchstart')
                            moved2 = 0;
                        if(j=='touchmove')
                            moved2 = 1;
                        if(j=='touchend'){
                            if(!moved2)
                                cpy = 'click';
                        }
                        if(cpy != 'click')
                            return;
                        if(!confirm('Are you sure you want to delete this preset'))
                            return;

                        let prv = Array.from(ths.parentElement.parentElement.children).indexOf(ths.parentElement);
                        let ix = Array.from(ths.parentElement.children).indexOf(ths)+prv*2;
                        while(1){
                            if(!localStorage.getItem('img'+(ix+1))){
                                localStorage.removeItem('img'+ix);
                                localStorage.removeItem('val'+ix);
                                break;
                            }
                            localStorage.setItem('img'+ix, localStorage.getItem('img'+(ix+1)));
                            localStorage.setItem('val'+ix, localStorage.getItem('val'+(ix+1)));
                            ix++;
                        }

                        ths.remove();
                        for(let i=prv; i<pres.childElementCount; i++)
                            for(let j=0; j<2; j++){
                                if(pres.children[i].childElementCount == 0)
                                    break;
                                pres.children[prv].appendChild(pres.children[i].children[0]);
                                prv = i;
                            }
                        if(pres.children[pres.childElementCount-1].children[0].childElementCount){
                            let tmp = document.createElement('div');
                            tmp.style.width = '50%';
                            tmp.style.height = '70px';
                            tmp.style.position = 'relative';
                            tmp.style.color = 'white';
                            pres.children[pres.childElementCount-1].appendChild(tmp);
                        }else
                            pres.children[pres.childElementCount-1].remove();
                    }, {'passive':true});

                for(let j of ['touchstart','touchmove','touchend','click'])
                    for(let k=1; k<3; k++)
                        ths.children[k].addEventListener(j, () => {
                            let cpy = j;
                            if(j=='touchstart')
                                moved3 = 0;
                            if(j=='touchmove')
                                moved3 = 1;
                            if(j=='touchend'){
                                if(!moved3)
                                    cpy = 'click';
                            }
                            if(cpy != 'click')
                                return;
                            trigPres(Array.from(pres.children).indexOf(ths.parentElement)*2+Array.from(ths.parentElement.children).indexOf(ths));
                        }, {'passive':true});
                if(val){
                    ths.children[1].src = val;
                    ths.children[2].innerText = JSON.parse(localStorage.getItem('val'+(Array.from(pres.children).indexOf(ths.parentElement)*2+Array.from(ths.parentElement.children).indexOf(ths))))['key'];
                    break;
                }
                imgCnv.width = 192*2;
                imgCnv.height = 108*2;
                imgCtx.drawImage(pic, 0, 0, 192*2, 108*2);
                ths.children[1].src = imgCnv.toDataURL('image/jpeg', .4);

                let lst = ['getPosition','getZoom','getFocus','getAutoFocus','getIris','getAutoIris','getGain','getShutterMode','getTemperatureVar','getTemperatureMode'];
                let dat = {};
                let cnt = 0;
                for(let j of lst){
                    M[j]().then((r) => {
                        cnt++;
                        dat[j.substring(3)] = r;
                        if(cnt == lst.length){
                            localStorage.setItem('img'+(lensTmp*2+i), ths.children[1].src);
                            dat['moveEase'] = 0;
                            dat['zoomEase'] = 0;
                            dat['key'] = 'Nothing';
                            localStorage.setItem('val'+(lensTmp*2+i), JSON.stringify(dat));
                        }
                    });
                }

                break;
            }

        addPlus();
    };
    addPlus();

    for(let i=0;; i++){
        let tmp = localStorage.getItem('img'+i);
        if(tmp)
            addPres(tmp);
        else
            break;
    }

    let hiscnv = document.createElement('canvas');
    hiscnv.width = 256;
    hiscnv.height = 100;
    hiscnv.style = 'position:absolute;right:250px;bottom:0px;border:1px solid white;border-radius:5px;display:none';
    let hisctx = hiscnv.getContext('2d');
    hisctx.fillStyle = '#FFFFFF88';
    document.body.appendChild(hiscnv);
    let hiscnvRead = document.createElement('canvas');
    let hisctxRead = hiscnvRead.getContext('2d', {'willReadFrequently':true});
    hiscnvRead.width = 320;
    hiscnvRead.height = 180;

    let utilPan = document.createElement('div');
    utilPan.setAttribute('class', 'buttonC');
    rgh.appendChild(utilPan);

    let selHist = document.createElement('div');
    selHist.style = 'font-size:15px;height:35px';
    selHist.setAttribute('class', 'buttonB');
    selHist.innerText = 'Histogram: Disabled';
    utilPan.appendChild(selHist);
    let histId = 0;

    for(let i of ['click','touchstart'])
        selHist.addEventListener(i, () => {
            if(selHist.style.backgroundColor){
                selHist.style.backgroundColor = '';
                selHist.innerText = 'Histogram: Disabled';
                hiscnv.style.display = 'none';
                focId++;
                localStorage.removeItem('histogram');
            }else{
                localStorage.setItem('histogram', 'S');
                hiscnv.style.display = '';
                let cpy = focId;
                selHist.style.backgroundColor = '#333';
                selHist.innerText = 'Histogram: Enabled';
                let cb = () => {
                    if(cpy != focId)
                        return;
                    hisctxRead.drawImage(pic, 0, 0, 320, 180);
                    let dat = hisctxRead.getImageData(0, 0, 320, 180).data;
                    let res = [];
                    for(let i=0; i<256; i++)
                        res.push(0);
                    for(let i=0; i<dat.length; i+=4){
                        let avg = dat[i]*.299 + dat[i+1]*.587 + dat[i+2]*.114;
                        res[Math.round(avg)]++;
                    }
                    let mx = Math.max(...res);
                    hisctx.clearRect(0, 0, 255, 100);
                    for(let i=0; i<256; i++){
                        let val = res[i]/mx*100;
                        hisctx.fillRect(i, 100-val, 1, val);
                    }
                    setTimeout(cb, 200);
                };
                cb();
            }
        }, {'passive':true});

    let foccnv = document.createElement('canvas');
    let gl = foccnv.getContext('webgl2', {'preserveDrawingBuffer':false});
    foccnv.style = 'width:100%;position:absolute;left:0px;top:0px;display:none;pointer-events:none';
    foccnv.width = 1280;
    foccnv.height = 720;
    cen.appendChild(foccnv);

    let vertShader = `#version 300 es
    in vec2 pos;
    out vec2 uv;
    void main(){
        uv = vec2(pos.x, -pos.y) * .5 + .5;
        gl_Position = vec4(pos, 0., 1.);
    }`;
    let fragShader = `#version 300 es
    precision highp float;
    in vec2 uv;
    uniform sampler2D image;
    uniform float thresh;
    uniform vec3 color;
    out vec4 col;
    #define cnvt(a,b) (dot(texture(image,uv+vec2(a,b)).rgb,vec3(.299,.587,.114)))
    void main(){
        vec2 px = 1. / vec2(textureSize(image, 0));
        float ca = cnvt(px.x, px.y);
        float cb = cnvt(-px.x, px.y);
        float cc = cnvt(px.x, -px.y);
        float cd = cnvt(-px.x, -px.y);
        float ea = cnvt(px.x, 0.);
        float eb = cnvt(0., px.y);
        float ec = cnvt(-px.x, 0.);
        float ed = cnvt(0., -px.y);
        float c = cnvt(0., 0.);
        float gx = -cb - 2.*ec - cd + ca + 2.*ea + cc;
        float gy = -cb - 2.*eb - ca + cd + 2.*ed + cc;
        float nm = clamp(length(vec2(gx, gy))*2., 0., 1.);
        float mask = smoothstep(thresh-.025, thresh+.025, nm);
        col = vec4(color, mask);
    }`;

    let vertId = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertId, vertShader);
    gl.compileShader(vertId);
    let fragId = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragId, fragShader);
    gl.compileShader(fragId);
    let progId = gl.createProgram();
    gl.attachShader(progId, vertId);
    gl.attachShader(progId, fragId);
    gl.linkProgram(progId);
    gl.useProgram(progId);

    let posLoc = gl.getAttribLocation(progId, 'pos');
    let quad = gl.createBuffer();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, 0, 0, 0);

    let imgLoc = gl.getUniformLocation(progId, 'image');
    let threshLoc = gl.getUniformLocation(progId, 'thresh');
    let colLoc = gl.getUniformLocation(progId, 'color');

    let gltex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, gltex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.uniform1i(imgLoc, 0);
    gl.uniform1f(threshLoc, .7);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let selFoc = document.createElement('div');
    selFoc.style = 'font-size:15px;height:35px';
    selFoc.setAttribute('class', 'buttonB');
    selFoc.innerText = 'Focus Peaking: Disabled';
    utilPan.appendChild(selFoc);
    let focId = 0;

    for(let i of ['click','touchstart'])
        selFoc.addEventListener(i, () => {
            if(selFoc.style.backgroundColor){
                selFoc.style.backgroundColor = '';
                selFoc.innerText = 'Focus Peaking: Disabled';
                foccnv.style.display = 'none';
                focId++;
                localStorage.removeItem('focusPeak');
            }else{
                localStorage.setItem('focusPeak', 'k');
                foccnv.style.display = '';
                let cpy = focId;
                selFoc.style.backgroundColor = '#333';
                selFoc.innerText = 'Focus Peaking: Enabled';
                let cb = async(t) => {
                    t *= .001;
                    t %= 6;
                    if(focId != cpy)
                        return;
                    window.requestAnimationFrame(cb);
                    let r=0, g=0, b=0;
                    if(t<1){
                        r = 1;
                        g = t;
                    }else if(t<2){
                        r = 2-t;
                        g = 1
                    }else if(t<3){
                        g = 1;
                        b = t-2;
                    }else if(t<4){
                        g = 4-t;
                        b = 1;
                    }else if(t<5){
                        b = 1;
                        r = t-4;
                    }else{
                        b = 6-t;
                        r = 1;
                    }
                    gl.uniform3f(colLoc, r, g, b);
                    gl.clear(gl.COLOR_BUFFER_BIT);
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, await createImageBitmap(pic));
                    gl.drawArrays(gl.TRIANGLES, 0, 6);
                };
                cb(0);
            }
        }, {'passive':true});

    if(localStorage.getItem('focusPeak'))
        selFoc.click();
    if(localStorage.getItem('histogram'))
        selHist.click();

    let trigPres = async(ix) => {
        if(disabed)
            return;
        let dat = JSON.parse(localStorage.getItem('val'+ix));
        if(dat['TemperatureVar'] != 'D')
            wbPos = Math.log((dat['TemperatureVar'] - wbVarC) / wbVarB) / wbVarA;
        if(dat['TemperatureMode'] != 'D')
            document.getElementById(dat['TemperatureMode']).click();
        if(dat['ShutterMode'] != 'D')
            document.getElementById(dat['ShutterMode']).click();
        if(dat['AutoIris'] != 'D'){
            if(dat['AutoIris'] != autoIris)
                autos.push('I');
            if(!dat['AutoIris'])
                irisPos = (dat['Iris']-2.4)/(25.5-2.4);
        }
        if(dat['Gain'] != 'D'){
            if(dat['Gain'] == -1){
                if(!autoGain)
                    autos.push('G');
            }else{
                if(autoGain)
                    autos.push('G');
                gainPos = dat['Gain'];
            }
        }
        if(dat['Position'] != 'D'){
            if(isMoveEasing)
                await M.stopEasePosition();
            isMoveEasing = 1;
            if(dat['moveEase'])
                M.easePosition(...dat['Position'], 2);
            else{
                isMoveEasing = 0;
                M.setPosition(...dat['Position']);
            }
        }
        if(dat['Zoom'] != 'D'){
            if(dat['zoomEase']){
                if(isZoomEasing)
                    await M.stopEaseZoom();
                isZoomEasing = 1;
                M.easeZoom(dat['Zoom'], 2);
            }else{
                zoomPos = dat['Zoom'];
                isSetZoom = 'H';
            }
        }
        if(dat['AutoFocus'] != 'D'){
            if(dat['AutoFocus'] != autoFocus)
                autos.push('F');
            if(!dat['AutoFocus'])
                focusPos = dat['Focus'];
        }
    };

    document.addEventListener('keyup', (e) => {
        if(document.querySelector('div[name=HEHEHEHALESKIBIDITOIL]'))
            return;
        let curi=0;
        while(1){
            let it = localStorage.getItem('val'+curi);
            curi++;
            if(!it)
                return;
            it = JSON.parse(it);
            if(it['key'] == e.code)
                trigPres(curi-1);
        }
    });

    let keyPress = (code, isDown) => {
        if(code.startsWith('Shift'))
            keys['smooth'] = isDown;
        if(code.startsWith('Arrow'))
            keys[code.slice(5).toLowerCase()] = isDown;
        if(!code.startsWith('Key'))
            return;
        code = code.slice(3);
        if(code=='W')
            keys['zin'] = isDown;
        if(code=='S')
            keys['zout'] = isDown;
        if(code=='D')
            keys['fin'] = isDown;
        if(code=='A')
            keys['fout'] = isDown;
    };

    let touches = {};
    let autos = [];
    let getxt = (v) => {return touches[v][1];};
    let getyt = (v) => {return touches[v][2];};
    let addEv = (el, m) => {
        el.addEventListener('mousedown', () => {touches[m]=[0,mouseX,mouseY,mouseX,mouseY];}, {'passive':true});
        el.addEventListener('touchstart', (e) => {
            let l = e.touches.length-1;
            e = e.touches[l];
            touches[m] = [1,e.clientX,e.clientY,e.clientX,e.clientY,l];
        }, {'passive':true});
        el.addEventListener('touchmove', (e) => {
            if(!touches[m]||!touches[m][0])
                return;
            e = e.touches[touches[m][5]];
            touches[m][1] = e.clientX;
            touches[m][2] = e.clientY;
        }, {'passive':true});
        el.addEventListener('touchend', (e) => {
            if(touches[m][1]==touches[m][3] && touches[m][2]==touches[m][4])
                autos.push(m);
            delete touches[m];
        }, {'passive':true});
    };

    addEv(intMovePan,'M');
    addEv(zoomMovePan,'Z');
    addEv(focMovePan,'F');
    addEv(gainHandle,'G');
    addEv(irsHandle,'I');
    addEv(wbHandle,'T');

    document.addEventListener('mouseup', () => {
        for(let i of Object.keys(touches))
            if(!touches[i][0]){
                if(touches[i][1]==touches[i][3] && touches[i][2]==touches[i][4])
                    autos.push(i);
                delete touches[i];
            }
    }, {'passive':true});

    let mouseX=0, mouseY=0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        for(let i of Object.keys(touches))
            if(!touches[i][0])
                touches[i][1] = e.clientX, touches[i][2] = e.clientY;
    }, {'passive':true});

    document.addEventListener('keydown', (e) => {keyPress(e.code,1);}, {'passive':true});
    document.addEventListener('keyup', (e) => {keyPress(e.code,0);}, {'passive':true});

    let prevTime = Date.now();
    let alpha = .001;
    let isZoom = 0, isSetZoom = 0;
    let isFocus = 0, isSetFocus = 0;
    let isMoveEasing=0, isZoomEasing=0;

    let O = {};
    let cbs = [];
    let curCnt;
    for(let i of Object.keys(M)){
        O[i] = (...args) => {
            cbs.push(() => {
                M[i](...args).then(() => {
                    curCnt++;
                    if(curCnt == cbs.length)
                        timeoutFunc();
                });
            });
        };
    }

    let curFrame = 0;
    let timeoutFunc = () => {
        curFrame++;
        let curTime = Date.now();
        let dt = (curTime - prevTime) * alpha;
        prevTime = curTime;
        cbs = [];
        curCnt = 0;
        if(isSetZoom != 'H')
            isSetZoom = 0;
        isSetFocus = 0;
        if(isZoom || isZoomEasing)
            M.getZoom().then((d) => {zoomPos = d;});
        if(autoFocus){
            autoFocusGet += dt;
            if(autoFocusGet > 1){
                autoFocusGet %= 1;
                isFocus = 1;
            }else
                isFocus = 0;
        }else
            autoFocusGet = 0;
        if(isFocus)
            M.getFocus().then((d) => {focusPos = d;});
        isZoom = isFocus = 0;

        let x=0, y=0, z=0, f=0;
        if(keys['left'])
            x--;
        if(keys['right'])
            x++;
        if(keys['up'])
            y++;
        if(keys['down'])
            y--;
        if(keys['zin'])
            z++;
        if(keys['zout'])
            z--;
        if(keys['fin'])
            f++;
        if(keys['fout'])
            f--;
        let dist = (x*x + y*y) ** .5
        dist = Math.max(dist, 1);
        x /= dist;
        y /= dist;

        if(keys['smooth']){
            let d, p, pbef, c, sign;
            d = x;
            pbef = moveSpeed['x'];
            sign = d-pbef<0?-1:1;
            c = Math.log(sign * (d - pbef));
            p = d - sign * Math.exp(-dt + c);
            moveSpeed['x'] = p;
            d = y;
            pbef = moveSpeed['y'];
            sign = d-pbef<0?-1:1;
            c = Math.log(sign * (d - pbef));
            p = d - sign * Math.exp(-dt + c);
            moveSpeed['y'] = p;
            d = z;
            pbef = zoomSpeed;
            sign = d-pbef<0?-1:1;
            c = Math.log(sign * (d - pbef));
            p = d - sign * Math.exp(-dt + c);
            zoomSpeed = p;
            d = f;
            pbef = focusSpeed;
            sign = d-pbef<0?-1:1;
            c = Math.log(sign * (d - pbef));
            p = d - sign * Math.exp(-dt + c);
            focusSpeed = p;
        }else{
            moveSpeed['x'] = x;
            moveSpeed['y'] = y;
            zoomSpeed = z;
            focusSpeed = f;
        }

        if(touches['M'] && !disabed){
            moveSpeed['x'] = (getxt('M')-190)/60;
            moveSpeed['y'] = (75-getyt('M'))/60;
        }
        if(touches['Z'] && !disabed){
            zoomPos = Math.min(1,Math.max(0,(75-getyt('Z'))/100+.5));
            zoomSpeed = 0;
            isSetZoom = 1;
        }
        if(touches['F'] && !autoFocus && !disabed){
            focusPos = Math.min(1,Math.max(0,(75-getyt('F'))/100+.5));
            focusSpeed = 0;
            isSetFocus = 1;
        }
        if(touches['G'] && !autoGain && !disabed)
            gainPos = 36-Math.min(36,Math.max(0,(getyt('G')-15)/120*36));
        if(touches['I'] && !autoIris && !disabed)
            irisPos = 1-Math.min(1,Math.max(0,(getyt('I')-15)/120));
        if(touches['T'] && !disabed)
            wbPos = 1-Math.min(1,Math.max(0,(getyt('T')-15)/120));

        if(autos.includes('F') && !disabed){
            O.setAutoFocus(autoFocus = !autoFocus);
            focHandleBar.children[1].innerText = `Focus: ${focusPos.toFixed(2)} (${autoFocus?'A':'M'})`;
            focHandleBar.children[0].children[0].setAttribute('fill', autoFocus?'#446':'#333');
        }
        if(autos.includes('G') && !disabed){
            O.setGain((autoGain = !autoGain) ? -1 : gainPos);
            gainHandle.children[1].innerText = `Gain: ${gainPos} (${autoGain?'A':'M'})`;
            gainHandle.children[0].children[0].setAttribute('fill',autoGain?'#446':'#333');
        }
        if(autos.includes('I') && !disabed){
            O.setAutoIris(autoIris = !autoIris);
            if(!autoIris)
                prevIrisPos = 'HEHEHEHA';
            let irsVal = irisPos * (25.5-2.4) + 2.4;
            irsHandle.children[1].innerText = `Iris: ${irsVal.toFixed(2)} (${autoIris?'A':'M'})`;
            irsHandle.children[0].children[0].setAttribute('fill',autoIris?'#446':'#333');
        }
        autos = [];

        dist = (moveSpeed['x']**2 + moveSpeed['y']**2) ** .5;
        dist = Math.max(1, dist);
        moveSpeed['x'] /= dist;
        moveSpeed['y'] /= dist;

        if(disabed)
            moveSpeed['x'] = moveSpeed['y'] = zoomSpeed = focusSpeed = 0;

        if(moveSpeed['x']!=prevMoveSpeed['x'] || moveSpeed['y']!=prevMoveSpeed['y']){
            if(isMoveEasing)
                isMoveEasing = 2;
            let damp = zoomPos*1.5;
            damp++;
            O.moveSpeed(moveSpeed['x']/damp, moveSpeed['y']/damp);
            prevMoveSpeed = JSON.parse(JSON.stringify(moveSpeed));
            handleBar.style.left = 20+moveSpeed['x']*20+'px';
            handleBar.style.top = 20-moveSpeed['y']*20+'px';
        }
        if(zoomSpeed != 0)
            isZoom = 1;
        if(zoomSpeed != prevZoomSpeed){
            if(isZoomEasing)
                isZoomEasing = 2;
            O.zoomSpeed(zoomSpeed);
            prevZoomSpeed = zoomSpeed;
        }
        if(zoomPos != prevZoomPos){
            prevZoomPos = zoomPos;
            if(isSetZoom){
                O.setZoom(zoomPos);
                if(isZoomEasing)
                    isZoomEasing = 2;
            }
            zoomHandleBar.style.top = 42.5-(zoomPos-.5)*100+'px';
            zoomHandleBar.children[1].innerText = `Zoom: ${zoomPos.toFixed(2)}`;
        }
        if(focusSpeed != 0)
            isFocus = 1;
        if(focusSpeed != prevFocusSpeed && !autoFocus){
            O.focusSpeed(focusSpeed);
            prevFocusSpeed = focusSpeed;
        }
        if(focusPos != prevFocusPos){
            prevFocusPos = focusPos;
            if(isSetFocus)
                O.setFocus(focusPos);
            focHandleBar.style.top = 42.5-(focusPos-.5)*100+'px';
            focHandleBar.children[1].innerText = `Focus: ${focusPos.toFixed(2)} (${autoFocus?'A':'M'})`;
        }
        if(gainPos != prevGainPos){
            gainHandle.style.top = 120-gainPos/36*120+'px';
            gainPos = parseInt(gainPos);
        }
        if(gainPos != prevGainPos){
            if(!autoGain)
                O.setGain(gainPos);
            prevGainPos = gainPos;
            localStorage.setItem('gainPos', String(gainPos));
            gainHandle.children[1].innerText = `Gain: ${gainPos} (${autoGain?'A':'M'})`;
        }
        if(irisPos != prevIrisPos){
            irsHandle.style.top = 120-irisPos*120+'px';
            let irsVal = irisPos * (25.5-2.4) + 2.4;
            if(!autoIris)
                O.setIris(irsVal);
            prevIrisPos = irisPos;
            localStorage.setItem('irisPos', String(irisPos));
            irsHandle.children[1].innerText = `Iris: ${irsVal.toFixed(2)} (${autoIris?'A':'M'})`;
        }
        if(wbPos != prevWbPos){
            wbHandle.style.top = 120-wbPos*120+'px';
            let wb = Math.round(wbVarB * Math.exp(wbVarA * wbPos) + wbVarC);
            O.setTemperatureVar(wb);
            prevWbPos = wbPos;
            wbHandle.children[1].innerText = `WB: ${wb} K`;
            let abs = Math.abs(wbPos-.5)*2;
            wbHandle.children[0].children[0].setAttribute('fill', `hsl(${wbPos<.5?240:30},${abs*100}%,${abs*25+20}%`);
        }

        if(cbs.length == 0)
            setTimeout(timeoutFunc, 50);
        else{
            let cnt = (isMoveEasing==2) + (isZoomEasing==2) + 1;
            let bruh = 0;
            let cb = () => {
                bruh++;
                if(bruh == cnt)
                    for(let i of cbs)
                        i();
            };
            cb();
            if(isMoveEasing==2){
                isMoveEasing = 0;
                M.stopEasePosition().then(cb);
            }
            if(isZoomEasing==2){
                isZoomEasing = 0;
                M.stopEaseZoom().then(cb);
            }
        }
    };
    timeoutFunc();

    window.onbeforeunload = () => {M.destroyImage(img);};

    loading.remove();
    loading = 0;
})().catch((err) => {console.error(err);});
