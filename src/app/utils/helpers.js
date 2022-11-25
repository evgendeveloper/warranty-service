const getUrlParams = (search = ``) => {
  const hashes = search.slice(search.indexOf(`?`) + 1).split(`&`)
  return hashes.reduce((acc, hash) => {
    const [key, val] = hash.split(`=`)
    return {
      ...acc,
      [key]: decodeURIComponent(val)
    }
  }, {})
}

export {
  getUrlParams
}
