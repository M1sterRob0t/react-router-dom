import { ErrorResponse, isRouteErrorResponse, useRouteError } from 'react-router-dom';

type TErrorData = {
  sorry: string;
  hrEmail: string;
};

function ErrorBoundary() {
  const error = useRouteError() as ErrorResponse;

  if (isRouteErrorResponse(error)) { // проверка, связана ли ошибка с роутингом (запросом за данными)
    const errorData = error.data as TErrorData;

    return (
      <div className="error-boundary">
        <h1>Error, {error.status}</h1>
        <h2>{error.statusText}</h2>
        {error.status === 401 && (
          <div>
            <p>{errorData.sorry}</p>
            <p>{errorData.hrEmail}</p>
          </div>
        )}
      </div>
    );
  }

  throw error; // если нет, пробрасываем её выше чтобы обработал Layout
}

export default ErrorBoundary;
