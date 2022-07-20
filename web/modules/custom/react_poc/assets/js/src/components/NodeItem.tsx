import { NormalizedDataObject } from '../types';
import React from 'react';
import formatMoney from '../lib/formatMoney';

const NodeItem = ({ item }: { item: NormalizedDataObject }) => (
  <div>
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
