import { mount, createElement, render } from './vnode';

const vn = createElement('div', 'foobarbaz');
const $app = document.getElementById('app');

mount($app, render(vn));
