import React, { FC } from 'react';
import { NormalizedDataObject } from '../types';
import formatMoney from '../lib/formatMoney';

type Props = {
  item: NormalizedDataObject
};

const NodeItem: FC<Props> = ({ item }) => (
  <div className='node-item'>
    {item.image && (
      <img src={item.image.url} alt={item.image.altText} />
    )}
    <p>
      <a href={`/node/${item.drupalId}`}>{item.name}</a> voor {formatMoney(item.price)}
    </p>
    {item.description && (
      <p>
        <i>{item.description}</i>
      </p>
    )}
  </div>
);

export default NodeItem;
