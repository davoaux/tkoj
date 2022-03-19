interface RequestOpt {
  auth: boolean;
}

const DEFAULT_OPT: RequestOpt = {
  auth: false
};

const request = (resourcePath: string, method: string, body?: Record<string, string>, opt?: RequestOpt) => {
  const endpoint = `/${opt?.auth ? 'auth' : 'api'}/${resourcePath}`;
  return fetch(endpoint, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
};

export const api = {
  get: (resourcePath: string, body?: Record<string, string>, opt: RequestOpt = DEFAULT_OPT) => request(resourcePath, 'get', body, opt),
  put: (resourcePath: string, body?: Record<string, string>, opt: RequestOpt = DEFAULT_OPT) => request(resourcePath, 'put', body, opt),
  post: (resourcePath: string, body?: Record<string, string>, opt: RequestOpt = DEFAULT_OPT) => request(resourcePath, 'post', body, opt),
  delete: (resourcePath: string, body?: Record<string, string>, opt: RequestOpt = DEFAULT_OPT) => request(resourcePath, 'delete', body, opt)
};
