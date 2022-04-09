import { FC, useContext, useState } from 'react';
import { TreeNode, ILeafProp } from '../types';
import { Branch } from './Branch';
import { Context } from '../index'

import { FaCaretRight, FaCaretDown } from "react-icons/fa";

export const Leaf: FC<any> = <T extends TreeNode<T>>({ data }: ILeafProp<T>) => {

  const {
    selected = false,
    expand = true,
    value, 
    children 
  } = data;

  const { update, render } = useContext(Context);
  const toggleNodeSelection = () => update({...data, selected: !selected});
  const expandCollapse = () => update({...data, expand: !expand});

  return (
    <>
      <div className="d-flex">
        { children.length > 0 && (expand ? <FaCaretDown /> : <FaCaretRight />)}
        <input type="checkbox" checked={selected} onChange={toggleNodeSelection} />
        <a onClick={expandCollapse}>{ render(value) }</a>
      </div>
      { (children && expand) && <Branch data={children} /> }
    </>
  );
};
  

