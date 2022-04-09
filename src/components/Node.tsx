import { FC, memo } from 'react';
import { INodeProp } from '../types/products';

/**
 * Tree Node: Act as render for node
 * @param prop: INodeProp
 * @returns TSX Template
 */
const TNode: FC<any> = ({ data: { title, description } }: INodeProp) => (
    <div className="d-flex flex-col">
        <h3>{title}</h3>
        <small>{description}</small>
    </div>
);

export const Node = memo(TNode);
