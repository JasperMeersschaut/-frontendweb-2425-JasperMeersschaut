import { isAxiosError } from 'axios';

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg"
        data-cy="axios_error_message"
      >
        <h4 className="text-lg font-semibold">Oops, something went wrong</h4>
        <p className="mt-2">
          {typeof error?.response?.data?.message === 'string'
            ? error.response.data.message
            : 'An error occurred while processing your request. Please try again later.'}
        </p>
        {error?.response?.data?.details && (
          <p className="mt-2 text-gray-700">
            {typeof error.response.data.details === 'string'
              ? error.response.data.details
              : JSON.stringify(error.response.data.details)}
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
        <h4 className="text-lg font-semibold">An unexpected error occurred</h4>
        <p className="mt-2">
          {typeof error.message === 'string'
            ? error.message
            : 'An error occurred. Please try again later.'}
        </p>
      </div>
    );
  }

  return null;
}