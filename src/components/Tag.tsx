import { FC } from 'react';
/**
 * Tag: Act as render for selcted tag
 * @param prop: ITagProp
 * @returns TSX Template
 */
export const Tag: FC<any> = ({ data }) => (<div className="d-inline-flex tag">{data}</div>);
