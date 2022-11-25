import axios from 'axios'

/**
 *
 * @param {Object} httpConfig
 * @returns {Object}
 */
export const MakeHttp = (config = {}) => {
  const { host, baseUrl: basePath } = config
  const baseURL = `${host}${basePath ? basePath : '/api/hs/extint/api'}`

  const http = axios.create({ baseURL })

  let axiosExtra = {}
  // Request helpers ($get, $post, ...)
  for (let method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
    axiosExtra['$' + method] = function () { return this[method].apply(this, arguments).then(res => res && res.data) }
  }
  for (let key in axiosExtra) {
    http[key] = axiosExtra[key].bind(http)
  }

  /**
   * Обработка ошибок запросов, в частности проверка на протухший токен
   * и дальнейшая попытка его обновить и выполнить изначальный запрос/запросы
   */
  http.interceptors.response.use(undefined, async error => {
    const { config, response: { status, data } } = error
    const originalRequest = config

    for (const err of data.errors) {
      console.error('Error of auth: ', err)
    }

    return Promise.reject(error)
  })


  return {
    ...http,
  }
}
