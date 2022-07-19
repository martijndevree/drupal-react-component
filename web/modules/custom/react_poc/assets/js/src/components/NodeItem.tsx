import { ProductNodeAttributes } from '../types';
import React from 'react';
import formatMoney from '../lib/formatMoney';

const NodeItem = ({ attributes }: { attributes: ProductNodeAttributes }) => (
  <div>
    <span><a href={`/node/${attributes.drupal_internal__nid}`}>{attributes.title}</a> voor {formatMoney(attributes.field_price)}</span>
    <p>
      <i>{attributes.field_body.value}</i>
    </p>
  </div>
);

export default NodeItem;
