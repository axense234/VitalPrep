const createArrayFromNumber = (lengthOfArray?: number) => {
  return Array.from({ length: lengthOfArray || 0 }, (_, index) => ({
    id: index + 1,
  }));
};

export default createArrayFromNumber;
