import * as M from "./module.js";

(async() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    document.body.style.margin = '0px';
    document.body.style.overflowX = 'none';
    document.body.style.overflowY = 'none';
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    document.body.style.backgroundColor = '#222';

    let img = await M.createImage();
    let pic = document.createElement('img');
    if(img == null)
        pic.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStA9GeRVnrh7Q7DL5-E5aPP5hHU2XBkp-5lg&s';
    else
        pic.src = img;
    pic.draggable = false;
    pic.style.userSelect = false;
    pic.style.cursor = 'pointer';
    pic.addEventListener('click', (e) => {
        let rct = pic.getBoundingClientRect();
        M.click((e.clientX-rct.left)/rct.width*1280, (e.clientY-rct.top)/rct.height*720);
    });

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
    pic.style.width = 'calc(100% - 500px)';
    lft.style.zIndex = 15;
    rgh.style.zIndex = 15;
    cont.appendChild(lft);
    cont.appendChild(pic);
    cont.appendChild(rgh);
    document.body.appendChild(cont);

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

    let extMovePan = document.createElement('div');
    extMovePan.style.width = '120px';
    extMovePan.style.height = '150px';
    movePan.appendChild(extMovePan);
    extMovePan.style.display = 'flex';
    extMovePan.style.alignItems = 'center';

    let zoomMovePan = document.createElement('div');
    zoomMovePan.style.width = '65px';
    zoomMovePan.style.height = '150px';
    movePan.appendChild(zoomMovePan);

    let focMovePan = document.createElement('div');
    focMovePan.style.width = '65px';
    focMovePan.style.height = '150px';
    movePan.appendChild(focMovePan);

    let intMovePan = document.createElement('div');
    intMovePan.style.width = '120px';
    intMovePan.style.height = '120px';
    intMovePan.style.position = 'relative';
    extMovePan.appendChild(intMovePan);

    let handleBar = document.createElement('div');
    handleBar.style.width = '80px';
    handleBar.style.height = '80px';
    handleBar.style.position = 'absolute';
    intMovePan.appendChild(handleBar);
    handleBar.innerHTML = '<svg width="80" height="80" style="cursor:pointer"><circle cx="40" cy="40" r="40" fill="#333"/></svg>';

    intMovePan.insertAdjacentHTML('beforeend', '<svg width="120" height="120"><circle cx="60" cy="60" r="52.5" stroke="#333" stroke-width="15" fill="none"/></svg>');

    let keys = {'up':0,'down':0,'left':0,'right':0,'zin':0,'zout':0,'fin':0,'fout':0,'smooth':0};
    let moveSpeed = {'x':0, 'y':0};
    let zoomSpeed = 0;
    let focusSpeed = 0;
    let prevMoveSpeed = {'x':0, 'y':0};
    let prevZoomSpeed = 0;
    let prevFocusSpeed = 0;

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

    document.addEventListener('keydown', (e) => {keyPress(e.code,1);});
    document.addEventListener('keyup', (e) => {keyPress(e.code,0);});

    let prevTime = Date.now();
    let alpha = .001;
    let timeoutFunc = async() => {
        let curTime = Date.now();
        let dt = (curTime - prevTime) * alpha;
        prevTime = curTime;

        let x=0, y=0;
        if(keys['left'])
            x--;
        if(keys['right'])
            x++;
        if(keys['up'])
            y++;
        if(keys['down'])
            y--;
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
            console.log(d, pbef, c, p);
        }else{
            moveSpeed['x'] = x;
            moveSpeed['y'] = y;
        }

        dist = (moveSpeed['x']**2 + moveSpeed['y']**2) ** .5;
        dist = Math.max(1, dist);
        moveSpeed['x'] /= dist;
        moveSpeed['y'] /= dist;

        let tm=50;
        if(moveSpeed['x']!=prevMoveSpeed['x'] || moveSpeed['y']!=prevMoveSpeed['y']){
            console.log(moveSpeed['x'], moveSpeed['y']);
            await M.moveSpeed(moveSpeed['x'], moveSpeed['y']);
            prevMoveSpeed = JSON.parse(JSON.stringify(moveSpeed));
            tm = 0;
        }
        if(zoomSpeed != prevZoomSpeed){
            await M.zoomSpeed(zoomSpeed);
            prevZoomSPeed = zoomSpeed;
            tm = 0;
        }
        if(focusSpeed != prevFocusSpeed){
            await M.focusSpeed(focusSpeed);
            prevFocusSpeed = focusSpeed;
            tm = 0;
        }

        handleBar.style.left = 20+moveSpeed['x']*20+'px';
        handleBar.style.top = 20-moveSpeed['y']*20+'px';
        setTimeout(timeoutFunc, tm);
    };
    timeoutFunc();
})().catch((err) => {console.error(err);});
