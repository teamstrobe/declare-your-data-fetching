export const shallowCompare = (props, nextProps) => {
  for (let i in props) if (!(i in nextProps)) return false
  for (let i in nextProps) if (props[i] !== nextProps[i]) return false
  return true
};
