export default function setupAxios(axios, store) {
axios.defaults.withCredentials = true

  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();
      
      config.baseURL = process.env.REACT_APP_API_URL
      
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
        // config.headers["Cookie"] = Cookies.get('.AspNetCore.Session');
      }

      return config;
    },
    (err) => {
      return Promise.reject({...err, message: err.response.data})}
  );
}
