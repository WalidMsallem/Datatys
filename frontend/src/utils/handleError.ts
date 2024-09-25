// Error handling function
export function handleError(error: any, setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>) {
    if (error.response) {
      setErrorMessage(error.response.data?.message || 'An error occurred on the server.');
    } else if (error.request) {
      setErrorMessage('No response received from the server. Please check your network.');
    } else {
      setErrorMessage(error.message || 'An unknown error occurred.');
    }
  }