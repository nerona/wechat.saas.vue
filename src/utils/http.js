/**
 * 基于fetch的Ajax请求封装
 */

class Http {
  constructor(apiRoot = '', version) {
    this.apiRoot = `${apiRoot}/${version}`;
    this.headers = {};
    this.handleResponse = this.handleResponse.bind(this);
    this.removeToken = this.removeToken.bind(this);
    this.checkToken = this.checkToken.bind(this);
  }

  /**
   * 设置请求时携带的token
   * @param {string} token
   */
  setToken(token) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  /**
   * 清除token，返回登录页
   */
  removeToken() {
    localStorage.removeItem('token');
    this.token = '';
    location.href = '/login';
  }

  /**
   * 判断token是否过期
   */
  checkToken(res) {
    if (res.status === 401) {
      this.removeToken();
    }

    throw res;
  }

  /**
   * 设置每次请求时都需要携带的头部
   * @param {Object} header
  */
  setHeaders(headers) {
    this.headers = { ...this.headers, ...headers };
  }

  /**
   * get请求
   * @param {string} uri
   * @param {Object} [headers]
   */
  get(uri, headers) {
    return this.fetchWithoutBody('GET', uri, headers);
  }

  /**
   * delete请求
   * @param {string} uri
   * @param {Object} [headers]
   */
  delete(uri, headers) {
    return this.fetchWithoutBody('DELETE', uri, headers);
  }

  /**
   * post请求
   * @param {string} uri
   * @param {Object} body
   * @param {Object} [headers]
   */
  post(uri, body, headers) {
    return this.fetchWithBody('POST', uri, body, headers);
  }

  /**
   * patch请求
   * @param {string} uri
   * @param {Object} body
   * @param {Object} [headers]
   */
  patch(uri, body, headers) {
    return this.fetchWithBody('PATCH', uri, body, headers);
  }

  /**
   * put请求
   * @param {string} uri
   * @param {Object} body
   * @param {Object} [headers]
   */
  put(uri, body, headers) {
    return this.fetchWithBody('PUT', uri, body, headers);
  }

  /**
   * 不带body的请求
   * @param {string} method
   * @param {string} uri
   * @param {Object} [headers]
   */
  fetchWithoutBody(method, uri, headers) {
    return fetch(this.getFullUri(uri), {
      method,
      headers: {
        ...this.getCommonHeaders(),
        ...headers,
      },
    })
      .then(this.handleResponse)
      .catch(this.checkToken);
  }

  /**
   * 带body的请求
   * @param {string} method
   * @param {string} uri
   * @param {Object} body
   * @param {Object} [headers]
   */
  fetchWithBody(method, uri, body, headers) {
    const isFormData = body instanceof FormData;
    return fetch(this.getFullUri(uri), {
      method,
      headers: {
        ...this.getCommonHeaders(),
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: isFormData ? body : JSON.stringify(body),
    })
      .then(this.handleResponse)
      .catch(this.checkToken);
  }

  /**
   * 拼接完整的接口地址
   * @param {string} uri
   */
  getFullUri(uri) {
    return `${this.apiRoot}${uri}`;
  }

  /**
   * 获取通用headers
   */
  getCommonHeaders() {
    return {
      ...this.headers,
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
    };
  }

  /**
   * 处理接口响应，对400/500类型的响应抛错
   * @param {Response} res
   */
  handleResponse(res) {
    const token = res.headers.get('token');

    if (token) {
      this.setToken(token);
    }

    if (res.ok) {
      return res.json()
        .catch(() => ({}));
    }

    return res.json()
      .then((data) => { throw data; });
  }
}

const productionURL = 'https://wechat.caihonggou.com';

const apiRoot = (process.env.NODE_ENV === 'production')
  ? productionURL : '';

export default new Http(apiRoot, 'v1');
