type OptionalEntity<T> = {
  [K in keyof T]?: T[K];
};

export default OptionalEntity;
