export const firstValueOf = array => {
  return array[Object.keys(array)[0]].toString();
};

export const QHashInteger = () => {
  return Date.now() + Math.floor(Math.random());
};
