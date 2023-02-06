export function extractQueryParams(query) {
  return query
    .substring(1)
    .split('&')
    .reduce((queryParams, param) => {
      const [key, value] = param.split('=')

      queryParams[key] = decodeURIComponent(value)

      return queryParams
    }, {})
}
