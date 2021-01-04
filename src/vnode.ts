import { NO_CHILDREN, SINGLE_VNODE, KEYED_VNODES, NONE_KEYED_VNODES } from './children';

// html 标签
const ELEMENT_HTML = 1;
// SVG 标签
const ELEMENT_SVG = 1 << 1;

// 普通有状态组件
const COMPONENT_STATEFUL_NORMAL = 1 << 2;
// 需要被keepAlive的有状态组件
const COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE = 1 << 3;
// 已经被keepAlive的有状态组件
const COMPONENT_STATEFUL_KEPT_ALIVE = 1 << 4;
// 函数式组件
const COMPONENT_FUNCTIONAL = 1 << 5;

// 纯文本
const TEXT = 1 << 6;
// Fragment
const FRAGMENT = 1 << 7;
// Portal
const PORTAL = 1 << 8;

// html 和 svg 都是标签元素，可以用 ELEMENT 表示
const ELEMENT = ELEMENT_HTML | ELEMENT_SVG;
// 普通有状态组件、需要被keepAlive的有状态组件、已经被keepAlice的有状态组件 都是“有状态组件”，
// 统一用 COMPONENT_STATEFUL 表示
const COMPONENT_STATEFUL =
    COMPONENT_STATEFUL_NORMAL | COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE | COMPONENT_STATEFUL_KEPT_ALIVE;
// 有状态组件 和  函数式组件都是“组件”，用 COMPONENT 表示
const COMPONENT = COMPONENT_STATEFUL | COMPONENT_FUNCTIONAL;

function createTextVNode(text) {
    return {
        _isVNode: true,
        flags: TEXT,
        tag: null,
        data: null,
        children: text,
        childFlags: NO_CHILDREN,
        el: null,
    };
}

class Component {
    render() {}
}

const Fragment = Symbol();
const Portal = Symbol();
function h(tag, data = null, children = null) {
    let flags = null;
    if (typeof tag === 'string') {
        if (tag === 'svg') {
            flags = ELEMENT_SVG;
        } else {
            flags = ELEMENT_HTML;
        }
    } else if (tag === Fragment) {
        flags = FRAGMENT;
    } else if (tag === Portal) {
        flags = PORTAL;
    } else {
        // 组件类型
        // vue2
        if (tag !== null && typeof tag === 'object') {
            if (!!tag.functional) {
                flags = COMPONENT_FUNCTIONAL;
            } else {
                flags = COMPONENT_STATEFUL_NORMAL;
            }
        } else if (typeof tag === 'function') {
            // vue3
            if (!!tag.prototype && !!tag.prototype.render) {
                flags = COMPONENT_STATEFUL_NORMAL;
            } else {
                flags = COMPONENT_FUNCTIONAL;
            }
        }
    }

    let childFlags;
    if (Array.isArray(children)) {
        const { length } = children;
        if (length === 0) {
            childFlags = NO_CHILDREN;
        } else if (length === 1) {
            childFlags = SINGLE_VNODE;
            children = children[0];
        } else {
            childFlags = KEYED_VNODES;
            // children = normalizeVNodes(children);
        }
    } else if (children === null) {
        childFlags = NO_CHILDREN;
    } else if (children._isVNode) {
        childFlags = SINGLE_VNODE;
    } else {
        // 文本节点
        childFlags = SINGLE_VNODE;
        children = createTextVNode(children + '');
    }

    return {
        _isVNode: true,
        flags,
        tag,
        children,
        data,
        childFlags,
    };
}

export { h, Fragment };
