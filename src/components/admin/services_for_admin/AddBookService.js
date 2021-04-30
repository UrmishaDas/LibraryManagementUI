import { API_CONFIG } from '../../../services/config'

export default function AddBookService(type, userData) {

  const host = API_CONFIG.host;
  const port = API_CONFIG.port;

  let BaseUrl = `http://${host}:${port}/LibraryManagement/`;
  // let BaseUrl =
  //   "http://localhost:8081/LibraryManagement/";

  // convert it to base 64
  let bearer = "Basic YWRtaW46bGlicmFyeQ==";

  // declaring the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: bearer,
    "Access-Control-Allow-Origin": "*"
  };

  return new Promise((resolve, reject) => {
    fetch(BaseUrl + type, {
      method: "POST",
      body: JSON.stringify(userData),
      headers
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.text();
        return Promise.all([statusCode, data]);
      })
      .then(res => {
        resolve(res);
      })

      .catch(error => {
        reject(error);
      });
  });
}
