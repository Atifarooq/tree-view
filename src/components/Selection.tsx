import { FC } from 'react';
import { Tag } from './Tag';
import { TreeNode } from '../Tree/types';
import { IEntity, ISelectionProp } from '../types/products';

/**
 * Selected Node: Act as render for Tag
 * @param prop: ISelectionProp
 * @returns TSX Template
 */
export const Selection: FC<any> = ({ data }: ISelectionProp) => (
    <div className="d-flex">
        { data && data.map(({ key, value }: TreeNode<IEntity>) => 
            <Tag key={`varient-${key}`} data={value.title} />)
        }
    </div>
);
