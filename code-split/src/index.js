import test from './test.js';
import imgUrl from './assets/img_01.png';
import svgUri from './assets/svg.svg';
import helloSource from './assets/hello.txt';
import './css/index.css';
import './css/index.less';
import csvData from './assets/data.csv';
import xmlData from './assets/data.xml';
import json5Data from './assets/data.json5';
import yamlData from './assets/data.yaml';
import tomlData from './assets/data.toml';
import loadsh from 'lodash';
import './ansync-module.js';

// 图片
const img = document.createElement('img');
img.src = imgUrl;
document.body.appendChild(img);

// svg 导入为URI
const img2 = document.createElement('img');
img2.style.cssText = 'width:200px;height:200px';
img2.src = svgUri;
document.body.appendChild(img2);

// 测试type/source 导入文件源码
const div = document.createElement('div');
div.style.cssText = 'width:200px;height:200px;background:aliceblue';
div.textContent = helloSource;
document.body.appendChild(div);

//测试压缩和提取css样式作为文件
document.getElementsByClassName('bisque')[0].classList.add('url-color');

// 测试导入字体
const span = document.createElement('span');
span.classList.add('icon');
span.innerHTML = '&#xe668;';
document.body.appendChild(span);

// 测试xml,csv 文件源码导入
console.log(csvData);
console.log(xmlData);
console.log(json5Data);
console.log(yamlData);
console.log(tomlData);
test();