import Endpoints from "./Common/Endpoints.js";
import axios from "axios";
import adapter from "axios/lib/adapters/http.js";

class BraspagAuthClient {
  constructor(options) {
    axios.defaults.adapter = adapter;

    if (options.env == "production") this.url = Endpoints.BraspagAuthProduction;
    else this.url = Endpoints.BraspagAuthSandbox;
  }

  async createAccessToken(request) {
    if (typeof request === "undefined" || request === null)
      throw new Error("Request is null");

    if (typeof request.clientId === "undefined" || request.clientId === null)
      throw new Error("Invalid credentials: ClientId is null");

    if (
      typeof request.clientSecret === "undefined" ||
      request.clientSecret === null
    )
      throw new Error("Invalid credentials: ClientSecret is null");

    let headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
    };

    let auth = {
      username: request.clientId,
      password: request.clientSecret,
    };

    var response = null;

    await axios
      .post(`${this.url}oauth2/token`, "grant_type=client_credentials", {
        headers,
        auth,
      })
      .then((res) => {
        response = { httpStatus: res.status, ...res.data };
      })
      .catch((error) => {
        response = {
          httpStatus: error.response.status,
          ...error.response.data,
        };
      });

    return response;
  }
}

export default BraspagAuthClient;
