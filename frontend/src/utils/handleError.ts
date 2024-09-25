export function handleError(
  error: any,
  setErrorMessage?: React.Dispatch<React.SetStateAction<string | null>>
) {
  if (error.response) {
    const message =
      error.response.data?.message || 'An error occurred on the server.'
    setErrorMessage ?setErrorMessage(message): alert(message) 
  } else if (error.request) {
    const message =
      error.response.data?.message ||
      'No response received from the server. Please check your network.'
    setErrorMessage ?  setErrorMessage(message): alert(message) 
  } else {
    const message = error.message || 'An unknown error occurred.'
    setErrorMessage ?  setErrorMessage(message): alert(message)
  }
}
