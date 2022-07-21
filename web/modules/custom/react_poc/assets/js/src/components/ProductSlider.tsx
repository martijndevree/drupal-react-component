import React, { FC } from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import useApi from '../lib/useApi';
import ErrorMessage from './ErrorMessage';
import Product from './Product';
import { ApiOptions, SortingOptions, ThemeProps } from '../types';

/**
 * Swiper CSS imports are excluded from eslint, because
 * there seems to be a problem with Swiper and eslint. See:
 * https://github.com/import-js/eslint-plugin-import/issues/2266
 */
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/navigation';

const SwiperStyles = styled.div`
  .swiper-button-next, .swiper-button-prev {
    color: ${({ theme }: { theme: ThemeProps }) => theme.colors.white};
  }
`;

const ProductSlider: FC = () => {
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

  const { data, error, loading } = useApi(options);

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
    </SwiperStyles>
  );
};

export default ProductSlider;
