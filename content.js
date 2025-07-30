import * as M from "./module.js";

(async() => {
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    // DALTON MA
    /* DALTON HERE IS THE CODE BRUIOEFJWOIEJFPOIWEJFPOIWJEFPIWJPFIJWPEFJWPIEFIWJEFPIJWPEOF */
    let img = await M.createImage();
    console.log(img);
    document.body.innerHTML = '';
    let pic = document.createElement('img');
    document.body.appendChild(pic);
    pic.style.width = '100%';
    pic.src = img;
    pic.draggable = false;
    pic.style.userSelect = false;
    /*pic.addEventListener('click', (e) => {M.click((pixel position));});*/

    let inp = document.createElement('input');
    document.body.appendChild(inp);
    inp.addEventListener('keydown', async(e) => {
        if(e.key == 'Enter')
            if(M[inp.value]){
                let r = prompt(inp.value);
                if(r == null)
                    return;
                r = r.split(' ');
                console.log(await M[inp.value](...r));
            }
    });
})().catch((err) => {console.error(err);});
