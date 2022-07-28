import React, { FC } from 'react';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import { useTranslation } from '../lib/translationContext';
import { NormalizedDataObject, ThemeProps } from '../types';

type Props = {
  item: NormalizedDataObject
};

const ProductStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  align-items: center;
  text-align: center;
  font-family: Arial, sans-serif;
  text-transform: uppercase;

  p, a {
    color: ${({ theme }: { theme: ThemeProps }) => theme.colors.white};
  }
`;

const PriceStyles = styled.div`
  background: ${({ theme }: { theme: ThemeProps }) => theme.colors.yellow};
`;

const Product: FC<Props> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <ProductStyles>
      {item.image && (
        <img src={item.image.url} alt={item.image.altText} />
      )}
      <p>
        <a href={`/node/${item.drupalId}`}>{item.name}</a> {item.description && (<i>{item.description}</i>)}
      </p>
      <PriceStyles>
        {formatMoney(item.price)}
      </PriceStyles>
      <button type='button'>{t('personalize')}</button>
    </ProductStyles>
  );
};

export default Product;
