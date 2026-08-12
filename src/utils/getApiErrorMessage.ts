export const getApiErrorMessage = (err: any): string => {
  const data = err?.response?.data;
  if (!data) return "Something went wrong. Please try again.";
  
  if (Array.isArray(data.errors) && data.errors.length) {
    return data.errors.join(", ");
  }
  if (typeof data.errors === "string" && data.errors.trim()) {
    return data.errors;
  }
  if (typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }
  return "Something went wrong. Please try again.";
};
