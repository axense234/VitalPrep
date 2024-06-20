const selectRefBasedOnNumber = (
  refs: ((node?: Element | null | undefined) => void)[],
  number: number
) => {
  let selectedRef = refs[0];
  switch (number) {
    case 0:
      selectedRef = refs[0];
      break;
    case 1:
      selectedRef = refs[1];
      break;
    case 2:
      selectedRef = refs[2];
      break;
    default:
      selectedRef = refs[0];
      break;
  }
  return selectedRef;
};

export default selectRefBasedOnNumber;
