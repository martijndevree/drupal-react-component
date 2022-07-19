import React from 'react';

const ErrorMessage = ({ error }: {error: Error}) => (
  <>
    <p>
      <i>Something went wrong...</i>
    </p>
    <code>{error.name}: {error.message}</code>
  </>
);

export default ErrorMessage;
