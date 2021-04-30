import { API_CONFIG } from "./config";

export default function BooksGenreService(type) {

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
      method: "GET",

      headers
    })
      .then(response => {
        const statusCode = response.status;
        const data = response.json();
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
