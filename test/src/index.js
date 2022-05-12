import test from './test.js';
import imgUrl from './assets/img_01.png';
import svgUri from './assets/svg.svg';
import helloSource from './assets/hello.txt';
import './css/index.css';
import './css/index.less';

const img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

const img2 = document.createElement('img');
img2.style.cssText = 'width:200px;height:200px';
img2.src = svgUri;
document.body.appendChild(img2);

const div = document.createElement('div');
div.style.cssText = 'width:200px;height:200px;background:aliceblue';
div.textContent = helloSource;
document.body.appendChild(div);

document.getElementsByClassName('bisque')[0].classList.add('url-color');

test();