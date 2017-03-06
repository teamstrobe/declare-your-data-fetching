export default (params) =>
  Object.keys(params)
    .sort()
    .reduce((p, c) => {
      if (params[c]) {
        return `${p}${c}=${encodeURIComponent(params[c])}&`;
      }
      return p;
    }, '?')
    .replace(/(&|\?)+$/, '');
