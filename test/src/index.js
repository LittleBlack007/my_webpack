import test from './test.js';
import imgUrl from './assets/img_01.png';

const img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img)
test();