import React, { FC } from 'react';
import styled from 'styled-components';
import ProductSlider from './components/ProductSlider';
import { ThemeProps } from './types';

const AppStyles = styled.div`
  background: ${({ theme }: { theme: ThemeProps }) => theme.colors.purple};
`;

const App: FC = () => (
  <AppStyles>
    <ProductSlider />
  </AppStyles>
);

export default App;
