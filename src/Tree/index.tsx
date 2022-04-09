import { FC, createContext, useEffect } from 'react';
import { useTreeData } from './hooks/useTreeData';
import { Branch } from './components/Branch';
import { TreeData, ITreeProp } from './types';

export const Context = createContext({
  update: (value: any): void => void(0),
  render: (value: any): any => void(0)
});

export const Tree: FC<any> = <T extends ITreeProp<T>>({ options, render, onSelection }: ITreeProp<T>) => {  

  const { items, selectedNodes, update }: TreeData<T> = useTreeData(options);

  useEffect(() => {
    if (onSelection) onSelection(selectedNodes);
  }, [selectedNodes]);

  return (
    <div className="tree-wrap">
      <Context.Provider value={{ update, render }}>
        <Branch data={items} />
      </Context.Provider>
    </div>
  );
};
