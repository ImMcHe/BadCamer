let sendrecv = (url, cb) => {
    fetch(url)
    .then((res) => {return res.text();})
    .then((data) => {if(cb)cb(data);})
    .catch((err) => {if(err){console.error('Error while sending packages:', err);if(cb)cb(null);}});
};
let clamp = (x, a, b) => {return Math.min(Math.max(x,a),b);};
let ip = window.location.origin;

/**
 * Moves the camera to position (x, y).
 * @param {number} x - The x position (-1 <= x <= 1).
 * @param {number} y - The y position (-1 <= y <= 1).
 * @returns {Promise<void>}
 */
export const setPosition = (x, y) => {
    return new Promise((r) => {
        x = parseFloat(x);
        y = parseFloat(y);
        if(x!=x || y!=y){
            r();
            return;
        }
        x = clamp(x, -1, 1);
        y = clamp(y, -1, 1);
        let xs = (Math.round((x+1) * 21238) + 11529).toString(16).toUpperCase();
        let ys = (Math.round((y+1) * 7281.5) + 21845).toString(16).toUpperCase();
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23APC${xs}${ys}&res=1`, () => {r();});
    });
};

/**
 * Zooms the camera to a position.
 * @param {number} z - The zoom factor (0 <= z <= 1).
 * @returns {Promise<void>}
 */
export const setZoom = (z) => {
    return new Promise((r) => {
        z = parseFloat(z);
        if(z != z){
            r();
            return;
        }
        z = clamp(z, 0, 1);
        let zs = (Math.round(z*2730) + 1365).toString(16).toUpperCase();
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23AXZ${zs}&res=1`, () => {r();});
    });
};

/**
 * Focusses the camera to a position.
 * @param {number} f The focus factor (0 <= f <= 1). -1 means auto focus.
 * @returns {Promise<void>}
 */
export const setFocus = (f) => {
    return new Promise((r) => {
        f = parseFloat(f);
        if(f != f){
            r();
            return;
        }
        if(f == -1){
            sendrecv(`${ip}/cgi-bin/aw_cam?cmd=OAF:1&res=1`, () => {r();});
            return;
        }
        f = clamp(f, 0, 1);
        let fs = (Math.round(f*2730) + 1365).toString(16).toUpperCase();
        sendrecv(`${ip}/cgi-bin/aw_cam?cmd=OAF:0&res=1`, () => {
            sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23AXF${fs}&res=1`, () => {r();});
        })
    });
};

/**
 * @returns {Promise<number[]>} An array containing the position [x, y] (-1 <= x, y <= 1).
 */
export const getPosition = () => {
    return new Promise((r) => {
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23APC&res=1`, (data) => {
            let x = parseInt(data.slice(3,7), 16);
            let y = parseInt(data.slice(7,11), 16);
            x = (x - 11529) / 21238 - 1;
            y = (y - 21845) / 7281.5 - 1;
            r([x, y]);
        });
    });
};

/**
 * @returns {Promise<number>} The zoom factor (0 <= z <= 1).
 */
export const getZoom = () => {
    return new Promise((r) => {
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23AXZ&res=1`, (data) => {
            let x = parseInt(data.slice(3,6), 16);
            x = (x - 1365) / 2730;
            r(x);
        });
    });
};

/**
 * @returns {Promise<number>} The focus factor (0 <= f <= 1). -1 means auto focus.
 */
export const getFocus = () => {
    return new Promise((r) => {
        let res = -1;
        sendrecv(`${ip}/cgi-bin/aw_cam?cmd=QAF&res=1`, (data) => {
            if(data[4] == '1'){
                res = 2;
                r(-1);
            }else if(res != -1)
                r(res);
            else
                res = 0;
        });
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23AXF&res=1`, (data) => {
            if(res == 2)
                return;
            let x = parseInt(data.slice(3,6), 16);
            x = (x - 1365) / 2730;
            if(res == 0)
                r(x);
            else
                res = x;
        });
    });
};

/**
 * Sets the move speed of the camera.
 * @param {number} x - The x velocity (-1 <= x <= 1).
 * @param {number} y - The y velocity (-1 <= y <= 1).
 * @returns {Promise<void>}
 */
export const moveSpeed = (x, y) => {
    return new Promise((r) => {
        x = parseFloat(x);
        y = parseFloat(y);
        if(x!=x || y!=y){
            r();
            return;
        }
        x = clamp(x, -1, 1);
        y = clamp(y, -1, 1);
        let xs = ('0' + (Math.round((x+1) * 49) + 1)).slice(-2);
        let ys = ('0' + (Math.round((y+1) * 49) + 1)).slice(-2);
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23PTS${xs}${ys}&res=1`, () => {r();});
    });
};

/**
 * Sets the zoom speed of the camera.
 * @param {number} z - The zoom velocity (-1 <= z <= 1).
 * @returns {Promise<void>}
 */
export const zoomSpeed = (z) => {
    return new Promise((r) => {
        z = parseFloat(z);
        if(z != z){
            r();
            return;
        }
        z = clamp(z, -1, 1);
        let xs = ('0' + (Math.round((z+1) * 49) + 1)).slice(-2);
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23Z${xs}&res=1`, () => {r();});
    });
};

/**
 * Sets the focus speed of the camera.
 * @param {number} f - The focus velocity (-1 <= f <= 1).
 * @returns {Promise<void>}
 */
export const focusSpeed = (f) => {
    return new Promise((r) => {
        f = parseFloat(f);
        if(f != f){
            r();
            return;
        }
        f = clamp(f, -1, 1);
        let xs = ('0' + (Math.round((f+1) * 49) + 1)).slice(-2);
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23F${xs}&res=1`, () => {r();});
    });
};

/**
 * Sets the iris of the camera.
 * @param {number} i - The iris (0 <= i <= 1). -1 means auto iris.
 * @returns {Promise<void>}
 */
export const setIris = (i) => {
    return new Promise((r) => {
        i = parseFloat(i);
        if(i != i){
            r();
            return;
        }
        if(i == -1){
            sendrecv(`${ip}/cgi-bin/aw_cam?cmd=ORS:1&res=1`, () => {r();});
            return;
        }
        i = clamp(i, 0, 1);
        let fs = (Math.round(i*2730) + 1365).toString(16).toUpperCase();
        sendrecv(`${ip}/cgi-bin/aw_cam?cmd=ORS:0&res=1`, () => {
            sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23AXI${fs}&res=1`, () => {r();});
        });
    });
};

/**
 * @returns {Promise<number>} The iris (0 <= i <= 1). -1 means auto iris.
 */
export const getIris = () => {
    return new Promise((r) => {
        let res = -1;
        sendrecv(`${ip}/cgi-bin/aw_cam?cmd=QRS&res=1`, (data) => {
            if(data[4] == '1'){
                res = 2;
                r(-1);
            }else if(res != -1)
                r(res);
            else
                res = 0;
        });
        sendrecv(`${ip}/cgi-bin/aw_ptz?cmd=%23AXI&res=1`, (data) => {
            if(res == 2)
                return;
            let x = parseInt(data.slice(3,6), 16);
            x = (x - 1365) / 2730;
            if(res == 0)
                r(x);
            else
                res = x;
        });
    });
};

/**
 * @returns {Promise<number>} The gain as an integer (0 <= g <= 36). -1 means auto gain.
 */
export const getGain = () => {
    return new Promise((r) => {
        sendrecv(`${ip}/cgi-bin/aw_cam?cmd=QGU&res=1`, (data) => {
            let x = parseInt(data.slice(4,6), 16);
            x = x - 8;
            r(x==120 ? -1 : x);
        });
    });
};

/**
 * Sets the gain of the camera.
 * @param {number} g - The gain as an integer (0 <= g <= 36). -1 means auto gain.
 * @returns {Promise<void>}
 */
export const setGain = (g) => {
    return new Promise((r) => {
        g = parseFloat(g);
        if(g != g){
            r();
            return;
        }
        g = g==-1 ? 128 : clamp(Math.round(g),0,36)+8;
        g = ('0' + g.toString(16).toUpperCase()).slice(-2);
        sendrecv(`${ip}/cgi-bin/aw_cam?cmd=OGU:${g}&res=1`, () => {r();});
    });
};

/**
 * When the image is clicked at a position.
 * @param {number} x - The x position in pixels of the mouse (0 <= x <= 1280).
 * @param {number} y - The y position in pixels of the mouse (0 <= y <= 720).
 * @returns {Promise<void>}
 */
export const click = (x, y) => {
    return new Promise((r) => {
        x = parseFloat(x);
        y = parseFloat(y);
        if(x!=x || y!=y){
            r();
            return;
        }
        x = Math.round(x);
        y = Math.round(y);
        if(x<0 || y<0 || x>=1280 || y>=720)
            return;
        sendrecv(`${ip}/cgi-bin/center_click?x=${x}&y=${y}&oz=0&dz=100&position=1&resolution=1280`, () => {r();});
    });
};

let imgMap = {};
/**
 * @returns {Promise<string|null>} Establish a new 1280x720 image connection to the camera. Null is returned if the establishment failed.
 */
export const createImage = () => {
    return new Promise((r) => {
        sendrecv(ip+'/cgi-bin/getuid?FILE=1&vcodec=jpeg&quality=1', (res) => {
            if(res == null){
                r(null);
                return;
            }
            let uid = res.split(',')[0].split(':')[1];
            let imageUrl = ip + '/cgi-bin/jpeg?connect=start&framerate=25&resolution=1280&quality=1&UID=' + uid;
            let int = setInterval(() => {sendrecv(ip+'/cgi-bin/keep_alive?mode=jpeg&protocol=http&UID='+uid);}, 30000);
            imgMap[imageUrl] = int;
            r(imageUrl);
        });
    });
};

/**
 * Destroys an image url.
 * @param {str} url - The image url.
 * @returns {boolean} Whether or not the connection was destroyed.
 */
export const destroyImage = (url) => {
    return new Promise((r) => {
        url = String(url);
        if(imgMap[url] === undefined)
            r(false);
        else{
            clearInterval(imgMap[url]);
            delete imgMap[url];
            r(true);
        }
    });
}

let yFactor = .8;
let easeMovePid = 0;
/**
 * Ease the camera to a position with a certain speed.
 * @param {number} x - The x position (-1 <= x <= 1).
 * @param {number} y - The y position (-1 <= y <= 1).
 * @param {number} speed - The speed of ease (0 <= speed <= 1).
 * @returns {Promise<void>}
 */
export const easePosition = (x, y, speed) => {
    return new Promise((r) => {
        easeMovePid++;
        let curPid = easeMovePid;
        speed = parseFloat(speed);
        x = parseFloat(x);
        y = parseFloat(y);
        if(x!=x || y!=y || speed!=speed){
            r();
            return;
        }
        speed = clamp(speed, 0, 1);
        x = clamp(x, -1, 1);
        y = clamp(y, -1, 1);
        let ogdst = -1;

        let getdxdydst = (result) => {
            let sx = result[0];
            let sy = result[1];
            let dx = x-sx;
            let dy = (y-sy) * yFactor;
            let dst = ((dx*dx) + (dy*dy))**.5;
            if(ogdst == -1)
                ogdst = dst;
            dx /= dst;
            dy /= dst;
            return [dx, dy, dst];
        };

        let easeOut = (r, dx, dy, dst) => {
            if(curPid != easeMovePid){
                r();
                return;
            }
            if(dst < .001){
                setPosition(x, y).then(() => {r();});
                return;
            }
            dst = clamp(4*(dst*speed)**.5, .2, .9);
            moveSpeed(dx*dst, dy*dst*yFactor).then(() => {getPosition().then((R) => {easeOut(r, ...getdxdydst(R));});});
        };

        let easeIn = (r) => {
            if(curPid != easeMovePid){
                r();
                return;
            }
            getPosition().then((result) => {
                let[dx, dy, dst] = getdxdydst(result);

                if(dst < ogdst/2 || dst < .08){
                    easeOut(r, dx, dy, dst);
                    return;
                }

                dst = ogdst - dst;
                let curSpeed = clamp(4*(speed*dst)**.5, .2, .9);
                moveSpeed(curSpeed*dx, curSpeed*dy*yFactor).then(() => {easeIn(r);});
            });
        };
        easeIn(r);
    });
};

let easeZoomPid = 0;
/**
 * Ease the camera to a zoom factor with a certain speed.
 * @param {number} z - The zoom factor (0 <= z <= 1).
 * @param {number} speed - The speed of ease (0 <= speed <= 1).
 * @returns {Promise<void>}
 */
export const easeZoom = (z, speed) => {
    return new Promise((r) => {
        easeZoomPid++;
        let curPid = easeZoomPid;
        speed = parseFloat(speed);
        z = parseFloat(z);
        if(z!=z || speed!=speed){
            r();
            return;
        }
        speed = clamp(speed, 0, 1);
        z = clamp(z, -1, 1);
        let ogdst = null;

        let easeOut = (r, dst) => {
            if(curPid != easeZoomPid){
                r();
                return;
            }
            if(Math.abs(dst) < .001){
                setZoom(z).then(() => {r();});
                return;
            }
            let mul = dst<0?-1:1;
            dst *= mul;
            dst = mul*clamp(4*(dst*speed)**.5, .2, .9);
            zoomSpeed(dst).then(() => {getZoom().then((R) => {easeOut(r, z-R);});});
        };

        let easeIn = (r) => {
            if(curPid != easeZoomPid){
                r();
                return;
            }
            getZoom().then((z1) => {
                if(ogdst === null)
                    ogdst = z-z1;

                let dst = z-z1;
                if(Math.abs(dst) < Math.abs(ogdst/2) || Math.abs(dst) < .08){
                    easeOut(r, dst);
                    return;
                }

                dst = ogdst - dst;
                let mul = (dst==0?ogdst:dst)<0?-1:1;
                dst *= mul;
                let curSpeed = mul*clamp(4*(speed*dst)**.5, .2, .9);
                zoomSpeed(curSpeed).then(() => {easeIn(r);});
            });
        };
        easeIn(r);
    });
};

let lst = {'Off':0,'Step':1,'Synchro':2,'ELC':3};
let rev = Object.keys(lst);
/**
 * Sets the shutter type of the camera.
 * @param {'Off'|'Step'|'Synchro'|'ELC'} shutter - The shutter type: "Off", "Step", "Synchro", "ELC".
 * @returns {Promise<void>}
 */
export const setShutterMode = (shutter) => {
    return new Promise((r) => {
        if(lst[shutter] === undefined){
            r();
            return;
        }
        sendrecv(ip+'/cgi-bin/aw_cam?cmd=OSJ:03:'+lst[shutter]+'&res=1', () => {r();});
    });
};

/**
 * @returns {Promise<'Off'|'Step'|'Synchro'|'ELC'>} The shutter type: "Off", "Step", "Synchro", "ELC".
 */
export const getShutterMode = () => {
    return new Promise((r) => {
        sendrecv(ip+'/cgi-bin/aw_cam?cmd=QSJ:03&res=1', (dat) => {r(rev[dat[7]]);});
    });
};

/**
 * @returns {Promise<number>} The temperature of the camera in kelvins (2000 <= temp <= 15000).
 */
export const getTemperatureVar = () => {
    return new Promise((r) => {sendrecv(ip+'/cgi-bin/aw_cam?cmd=QSI:20&res=1', (res) => {r(parseInt(res.slice(7,12),16));});})
};

/**
 * Sets the temperature of the camera. Effects visible only if getTemperatureMode() returns "VAR".
 * @param {number} temp - The temperature in kelvins (2000 <= temp <= 15000).
 * @returns {Promise<void>}
 */
export const setTemperatureVar = (temp) => {
    return new Promise((r) => {
        temp = parseFloat(temp);
        if(temp != temp){
            r();
            return;
        }
        temp = clamp(Math.round(temp), 2000, 15000);
        temp = temp.toString(16);
        temp = ('00000'+temp).slice(-5).toUpperCase();
        sendrecv(ip+'/cgi-bin/aw_cam?cmd=OSI:20:'+temp+':0&res=1', () => {r();});
    });
};

let lstT = {'ATW':0,'ATW_A':1,'ATW_B':2,'3200K':4,'5600K':5,'VAR':9};
let revT = {};
for(let i of Object.keys(lstT))
    revT[lstT[i]] = i;
/**
 * Sets the temperature mode of the camera.
 * @param {'ATW'|'ATW_A'|'ATW_B'|'3200K'|'5600K'|'VAR'} mode - The mode of the camera: "ATW", "ATW_A", "ATW_B", "3200K", "5600K", "VAR".
 */
export const setTemperatureMode = (mode) => {
    return new Promise((r) => {
        if(lstT[mode] === undefined){
            r();
            return;
        }
        sendrecv(ip+'/cgi-bin/aw_cam?cmd=OAW:'+lstT[mode]+'&res=1', () => {r();});
    });
};

/**
 * @returns {Promise<'ATW'|'ATW_A'|'ATW_B'|'3200K'|'5600K'|'VAR'>} The temperature mode: "ATW", "ATW_A", "ATW_B", "3200K", "5600K", "VAR".
 */
export const getTemperatureMode = () => {
    return new Promise((r) => {
        sendrecv(ip+'/cgi-bin/aw_cam?cmd=QAW&res=1', (dat) => {r(revT[dat[4]]);});
    });
};
