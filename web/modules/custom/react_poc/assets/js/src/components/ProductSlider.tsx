import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useApi from '../lib/useApi';
import { useTranslation } from '../lib/translationContext';
import ErrorMessage from './ErrorMessage';
import Product from './Product';
import { ApiOptions, SortingOptions, ThemeProps } from '../types';

/**
 * Swiper CSS imports are excluded from eslint, because
 * there seems to be a problem with Swiper and eslint. See:
 * https://github.com/import-js/eslint-plugin-import/issues/2266
 */
/* eslint-disable */
import 'swiper/css';
import 'swiper/css/navigation';
/* eslint-disable */

const SwiperStyles = styled.div`
  .swiper-button-next, .swiper-button-prev {
    color: ${({ theme }: { theme: ThemeProps }) => theme.colors.white};
  }

  span {
    display: block;
    font-size: 1.1rem;
    color: ${({ theme }: { theme: ThemeProps }) => theme.colors.white};
    font-family: ${({ theme }: { theme: ThemeProps }) => theme.fonts.primary};;
    text-align: center;
  }
`;

const options: ApiOptions = {
  bundle: 'product',
  fields: [
    'id',
    'drupal_internal__nid',
    'title',
    'field_body',
    'field_price',
    'field_product_image'
  ],
  mediaField: 'field_product_image',
  sort: SortingOptions.CreatedDesc,
  limit: 10
};

const ProductSlider: FC = () => {
  const { data, error, loading } = useApi(options);

  const { t } = useTranslation();

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  return (
    <SwiperStyles>
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation
        loop
        speed={500}
      >
        {data && data.map((item) => (
          <SwiperSlide key={item.apiId}>
            <Product item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <span>{t('inclVat')} | {t('exclVat')}</span>
    </SwiperStyles>
  );
};

export default ProductSlider;
