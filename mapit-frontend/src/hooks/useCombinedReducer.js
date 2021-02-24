export default function useCombinedReducer(useReducers) {
  const state = Object.keys(useReducers).reduce(
    (acc, key) => ({ ...acc, [key]: useReducers[key][0] }),
    {}
  );

  const dispatch = (action) =>
    Object.keys(useReducers)
      .map((key) => useReducers[key][1])
      .forEach((fn) => fn(action));

  return [state, dispatch];
}
