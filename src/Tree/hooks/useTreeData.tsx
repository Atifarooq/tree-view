import { Key, useCallback, useMemo, useState } from "react";
import { TreeData, TreeNode, TreeOptions } from "../types";
import { updateTree } from "../util";

export const useTreeData = <T extends object>(options: TreeOptions<T>): TreeData<T> => {
  let {
    initialItems = [],
    getKey = (item: any) => item.id || item.key,
    getChildren = (item: any) => item.children
  } = options;
  
  const itemsMap = useMemo(() => new Map<Key, TreeNode<T>>(), []);
  const [selectedNodes, setSelectedNodes] = useState(new Map<Key, TreeNode<T>>());
  
  // We only want to create function this on initial render.
  const buildNode = useCallback((item: T, parentKey: Key | null = null, selected: boolean): TreeNode<T> => {
    const node: TreeNode<T> = {
      key: getKey(item),
      parentKey,
      selected,
      value: item,
      children: []
    };
    node.children = buildTree(getChildren(item), node.key, selected);
    itemsMap.set(node.key, node);
    updateSelection(node);
    return node;
  }, []); 

  // We only want to create function this on initial render.
  const buildTree = useCallback(
    (initialItems: T[] = [], parentKey: Key | null = null, selected: boolean = false): TreeNode<T>[] =>
      initialItems.map((item: T): TreeNode<T> => buildNode(item, parentKey, selected)), []);

  // We only want to create function this on initial render.
  const updateSelection = useCallback((node: TreeNode<T>): void => {
    if (node.selected) 
      setSelectedNodes(nodeMap => new Map(nodeMap.set(node.key, node)));
    else {
      setSelectedNodes(nodeMap => {
        const newState = new Map(nodeMap);
        newState.delete(node.key);
        return newState;
      });
    }
  }, []);

  const updateNode = useCallback((node: TreeNode<T>): TreeNode<T> => {
    updateSelection(node);
    node.children = node.children.map((child: TreeNode<T>) => updateNode({...child, selected: node.selected}));
    itemsMap.set(node.key, node);

    return node;
  }, []);

  // We only want to compute this on initial render.
  const initialNodes = useMemo(() => buildTree(initialItems), []);
  const [items, setItems] = useState(initialNodes);

  return {
    items,
    itemsMap,
    selectedNodes,
    getItem: (key: Key): TreeNode<T> | undefined => itemsMap.get(key),
    update: (node: TreeNode<T>): void => {
      const updatedNode: TreeNode<T> = updateNode(node);
      setItems(updateTree(itemsMap, items, updatedNode));
    }
  }
}
