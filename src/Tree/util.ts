import { Key } from "react";
import { TreeNode } from "./types";

export const updateTree = <T extends object>(
        map: Map<Key, TreeNode<T>>, 
        items: TreeNode<T>[], 
        node: TreeNode<T>
    ): TreeNode<T>[] => {

    map.set(node.key, node);
    let newNode: TreeNode<T> = {...node};
    
    // Walk up the tree and update each parent to refer to the new chilren.
    while (node?.parentKey) {
      let nextParent = map.get(node.parentKey);
      if (nextParent) {
        const copy: TreeNode<T> = {...nextParent, children: []};

        const children = nextParent.children;
        copy.children = children.map(child => child.key === node.key ? newNode : child);
        map.set(copy.key, copy);

        newNode = copy;
        node = nextParent;
      } else break;
    }

    return items.map(item => item.key === node.key ? newNode : item);
}
