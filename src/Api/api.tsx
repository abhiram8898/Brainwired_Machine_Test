import axios from "axios";
const urlRegex = new RegExp("^https?:\\/\\/\\S+$");
const isUrl = (str: any) => urlRegex.test(str);

class Api {
  url: any;
  constructor() {
    this.url = process.env.REACT_APP_LOCAL_MODE || "";
  }
  async get(path: string, auth: boolean = false, headers: any = {}) {
    var success = false;
    const response = await axios(this.getApiUrl(path), {
      method: "GET",
      timeout: 20000,
      headers: {
        Accept: "application/json",
        mode: "cors",

        referrerPolicy: "origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...(auth
          ? { Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}` }
          : null),
        ...headers,
      },
    });
    if (response) {
      success = true;
      let data = await response.data;
      let status = response.status;
      return [true, data, status];
    } else {
      return [success, null];
    }
  }

  getApiUrl(path: any) {
    return isUrl(path) ? path : this.url + path;
  }
}
export const api = new Api();
