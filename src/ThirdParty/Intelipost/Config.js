import dotenv from "dotenv";
dotenv.config();

const INTELIPOST = {
  normal: {
    INTELI_KEY: process.env.INTELI_KEY,
    API_URL: "https://api.intelipost.com.br/api",
    VERSION: "v1",
    CLIENT_CEP: process.env.CLIENT_CEP,
    CLIENT_URL: process.env.CLIENT_URL,
  },
  sandbox: {
    INTELI_KEY: process.env.INTELI_KEY,
    API_URL: "https://api.intelipost.com.br/api",
    VERSION: "v1",
    CLIENT_CEP: process.env.CLIENT_CEP,
    CLIENT_URL: process.env.CLIENT_URL,
  },
};

export default INTELIPOST;
