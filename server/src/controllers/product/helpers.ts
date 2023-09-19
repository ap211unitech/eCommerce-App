// Check if filters/specifications are valid JSON
export const isValidJSON = (payload: string) => {
  try {
    if (payload.trim().length) {
      JSON.parse(payload);
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
