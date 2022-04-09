import { Key } from 'react';

export interface TreeOptions<T extends object> {
    /** Initial root items in the tree. */
    initialItems?: T[],
    /** A function that returns a unique key for an item object. */
    getKey?: (item: T) => Key,
    /** A function that returns the children for an item object. */
    getChildren?: (item: T) => T[]
}

export interface TreeNode<T extends object> {
    /** A unique key for the tree node. */
    key: Key,
    /** The key of the parent node. */
    parentKey: Key | null | undefined,
    /** Expand/Collapse for node. */
    expand?: boolean,
    /** Selection for node. */
    selected: boolean,
    /** The value object for the tree node. */
    value: T,
    /** Children of the tree node. */
    children: TreeNode<T>[]
}

export interface TreeData<T extends object> {
    /** The root nodes in the tree. */
    items: TreeNode<T>[],

    /** The root nodes in the tree. */
    itemsMap: Map<Key, TreeNode<T>>,

    /** The keys of the currently selected nodes in the tree. */
    selectedNodes: Map<Key, TreeNode<T>>,

    /**
     * Gets a node from the tree by key.
     * @param key - The key of the item to retrieve.
     */
    getItem(key: Key): TreeNode<T> | undefined,

    /**
     * Updates an item in the tree.
     * @param key - The key of the item to update.
     * @param newValue - The new value for the item.
     */
    update(newValue: TreeNode<T>): void
}

export type ITreeProp<T extends object> = {
    /** Props for root tree. */
    options: TreeOptions<T>,
    render: (value: T) => void,
    onUpdate?: (data: TreeNode<T>[]) => void,
    onSelection?: (node: Map<Key, TreeNode<T>>) => void,
}

export type IBranchProp<T extends object> = {
    /** Props for branch in the tree. */
    data: TreeNode<T>[]
}

export type ILeafProp<T extends object> = {
    /** Props for leaf in the tree. */
    data: TreeNode<T>
}

