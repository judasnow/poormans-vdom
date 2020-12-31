function createElement(tag: string, children: [] | string): object {
    return {
        tag,
        children,
    }
}

function render(vn: object): any {
    let txtNode = document.createTextNode(vn['children']);
    return document.createElement('div').appendChild(txtNode);
}

function mount(el, node) {
    el.append(node);
}

export { createElement, render, mount };
