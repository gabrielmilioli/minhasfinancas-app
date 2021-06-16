import axios from 'axios';
import ConstantUtils from '../utils/ConstantUtils';

const HTTP_CLIENT = axios.create({
  baseURL: ConstantUtils.API_ROOT
});

class ApiService {

  constructor(apiPath) {
    this.apiPath = apiPath;
  }

  requestUrl(url) {
    return `${this.apiPath}/${url}`;
  }

  get(path) {
    return HTTP_CLIENT.get(this.requestUrl(path));
  }

  get(path, params) {
    return HTTP_CLIENT.get(this.requestUrl(path), { params: params });
  }

  post(path, params) {
    return HTTP_CLIENT.post(this.requestUrl(path), params);
  }

  put(path, params) {
    return HTTP_CLIENT.put(this.requestUrl(path), params);
  }

  delete(path) {
    return HTTP_CLIENT.delete(this.requestUrl(path));
  }

  options(path) {
    return HTTP_CLIENT.options(this.requestUrl(path));
  }

};

export default ApiService;