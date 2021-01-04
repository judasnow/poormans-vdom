// 未知的 children 类型
export const UNKNOWN_CHILDREN = 0;
// 没有 children
export const NO_CHILDREN = 1;
// children 是单个 VNode
export const SINGLE_VNODE = 1 << 1;

// children 是多个拥有 key 的 VNode
export const KEYED_VNODES = 1 << 2;
// children 是多个没有 key 的 VNode
export const NONE_KEYED_VNODES = 1 << 3;

export const MULTIPLE_VNODES = KEYED_VNODES | NONE_KEYED_VNODES;
