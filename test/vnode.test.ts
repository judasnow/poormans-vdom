import { h, Fragment } from '../src/vnode';

describe('h', () => {
    it('Fragment element', () => {
        const ret = h(Fragment, {target: "#box"}, h('h1'));
        console.dir(ret);
    });
});
