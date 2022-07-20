import React, { FC } from 'react';

type Props = {
  error: Error
};

const ErrorMessage: FC<Props> = ({ error }) => (
  <>
    <p>
      <i>Something went wrong...</i>
    </p>
    <code>{error.name}: {error.message}</code>
  </>
);

export default ErrorMessage;
