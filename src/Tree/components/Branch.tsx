import { FC } from 'react';
import { TreeNode, IBranchProp, TreeData } from '../types';
import { Leaf } from './Leaf';

export const Branch: FC<any> = <T extends TreeData<T>>({ data }: IBranchProp<T>) => {
  return (
    <ul>
      { 
        data && data.map((item: TreeNode<T>) => <li key={`branch-${item.key}`}><Leaf data={item} /></li>)
      }
    </ul>
  );
};
