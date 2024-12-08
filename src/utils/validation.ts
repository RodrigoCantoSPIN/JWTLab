export const RegExValidation = (pattern: RegExp, value: string) => {
  console.log({pattern, value});
  if (!pattern) {
    return false;
  }
  const condition = new RegExp(pattern);
  return condition.test(value);
};
