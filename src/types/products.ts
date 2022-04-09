import { TreeNode } from "../Tree/types";

export enum ENTITY_TYPE {
    CATEGORY = 'category',
    BRAND = 'brand',
    MODEL = 'model',
    VARIANT = 'variant'
};

export type EntityType = ENTITY_TYPE.CATEGORY | ENTITY_TYPE.BRAND | ENTITY_TYPE.MODEL | ENTITY_TYPE.VARIANT;

export interface ITree {
    categories: IEntity[];
};

export interface IEntity {
    id: string;
    title: string;
    description?: string;
    type: EntityType | string;
    checked?: boolean;
    children?: IEntity[];
};

export type INodeProp = {
    data: IEntity,
}

export type ISelectionProp = {
    data: TreeNode<IEntity>[],
}