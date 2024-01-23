import React from 'react';
import { ErrorResponse, useAsyncError } from 'react-router-dom';

function GlobalErrorBoundary() {
  const error = useAsyncError() as ErrorResponse | Error;
  return (
    <div style={{ textAlign: 'center', margin: '100px auto' }}>
      <h1>Something went terribly wrong...</h1>
      {typeof error === 'object' && 'status' in error && (
        <>
          <h2>{error?.status}</h2>
          <h2>{error?.statusText}</h2>
        </>
      )}
      {typeof error === 'object' && 'message' in error && <p>{error?.message}</p>}
    </div>
  );
}

export default GlobalErrorBoundary;
