import axios from "axios";
// 상황따라 주소 다름
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
//const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
//const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;
/*
local backend는 로컬 fe와 로컬 be 실행할때 
prod_backend는 로컬 fe와 배포 be 실행할때
backend proxy는 fe 배포 코드에 설정해주어야 함, 그래야 배포환경에서 proxy에러를 피할 수 있음
*/
const api = axios.create({
  baseURL: `${LOCAL_BACKEND}`,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
