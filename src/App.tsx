import products from './products.json';
import './App.css';
import { FcTimeline, FcTodoList } from "react-icons/fc";
import { FC, Key, useState } from 'react';
import { Tree } from './Tree';
import { TreeNode } from './Tree/types';
import { Node } from './components/Node';
import { Selection } from './components/Selection';
import { IEntity } from './types/products';


/**
 * Render Prop:: To render Leaf Node (presentational node)
 * @param value T type object e.g. IEntity
 * @returns Node component
 */
const render = (value: IEntity) => <Node data={value} />;

export const App: FC = () => {
  
  const [ initialItems ] = useState<IEntity[]>(products.categories);
  const [ selection, setSelection ] = useState<TreeNode<IEntity>[]>();

  const onTreeSelection = (items: Map<Key, TreeNode<IEntity>>) => setSelection(Array.from(items.values()));
  const onTreeUpdate = (items: IEntity[]) => console.dir(items);
  
  return (
    <div className="d-flex">
      <div className="d-flex flex-col flex-equal">
        <h1 className="heading"><FcTimeline /> Browse Products</h1>

        <Tree options={{ initialItems }} 
              render={render} 
              onSelection={onTreeSelection}
              onUpdate={onTreeUpdate} />

      </div>
      <div className="d-flex flex-col flex-equal">
        <h1 className="heading"><FcTodoList /> Selected Items</h1>

        <Selection data={selection} />

      </div>
    </div>
  );
}
