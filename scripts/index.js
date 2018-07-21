/*
* Script for index.html
* Author: Oded "Dondish" Shapira
* Creation Date: 21 July 2018
* License: MIT
*/
$(document).ready( function () {
    console.log("Hey dear reader, thanks for checking out the code, it is fully available and open source on github!\n https://github.com/dondish/dondish.github.io");
    console.log("This code is under MIT license");
    const obj = $("#data-spinner");
    const datalist = obj.attr('data').split(',');
    console.log("Current data set:\n"+datalist.join(',\n'));
    headeranim(datalist, obj);
});

/*
    Custom header animation
*/

/**
 * preforms the animation with a list of strings and a span to edit
 * @param datalist - the list of strings
 * @param obj - the span to write to
 * @returns {Promise<void>} promise to await
 */
async function headeranim(datalist, obj) {
    let i = 0;
    let step = 0;
    let maxstep = Math.floor(datalist[i].length/2+1);
    let xhelp = Math.floor(datalist[i].length/2);
    let curr = datalist[i];
    while (true) {
        if (step === 0) { // to process at start
            step++;
            obj.text(curr);
            await wait(1500)
        } else if (step === maxstep) { // if finished transforming the string
            i < datalist.length - 1 ? i++ : i = 0;
            curr = datalist[i];
            step = 1;
            xhelp = Math.floor(datalist[i].length/2);
            maxstep = Math.ceil(curr.length/2);
            await transform(obj.text(), curr, obj);
            await wait(1000)
        } else if (curr.length%2===1){
            curr= curr.substring(0, xhelp - step + 1) + genRandString(step*2-1) +  curr.substring(xhelp+step); // reedit the string to preserve length
            step++;
            obj.text(curr);
            await wait(150)
        } else {
            curr= curr.substring(0, xhelp - step) + genRandString(step*2) +  curr.substring(xhelp+step); // reedit the string to preserve length
            step++;
            obj.text(curr);
            await wait(150)
        }
    }
}

/**
 * Generates a random string
 * @param length - Optional, the length of the string otherwise 1
 * @returns {string} randoms the random string
 */
function genRandString(length=1) {
    let result = "";
    for (let i=0;i<length;i++) {
        result+=String.fromCharCode(Math.floor(Math.random()*93+33))
    }
    return result;
}

/**
 * Moves from a random string to a string
 * @param prev - random generated string to move from
 * @param next - the string to transform to
 * @param obj - the span to write to
 * @returns {Promise<void>}
 */
async function transform(prev, next, obj) {
    if (prev.length<next.length) {
        for (let i = prev.length;i<=next.length;i++) {
            obj.text(genRandString(i));
            await new Promise(resolve => setTimeout(resolve, 150));
        }
    } else if (prev.length>next.length) {
        for (let i = prev.length;i>=next.length;i--) {
            obj.text(genRandString(i));
            await new Promise(resolve => setTimeout(resolve, 150));
        }
    }
    obj.text(next)
}

/**
 * Asynchronous waiting
 * @param ms the amount to wait in milliseconds
 * @returns {Promise<void>}
 */
async function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}