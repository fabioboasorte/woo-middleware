import dotenv from 'dotenv'
dotenv.config()

const PAGSEGURO = {
  normal: {
    ORDER: {
      sandbox: false,
      sandbox_email: "",
      email: process.env.PAGSEGURO_EMAIL,
      token: process.env.PAGSEGURO_TOKEN,
    },
    EMAIL: process.env.PAGSEGURO_EMAIL,
    TOKEN: process.env.PAGSEGURO_TOKEN,
    API_URL: "https://ws.pagseguro.uol.com.br",
    OLD_API_URL: "https://pagseguro.uol.com.br",
    CARD_URL: "https://df.uol.com.br/v2/cards\n",
    SESSIONID: "",
    EMAIL_SANDBOX: "",
  },
  sandbox: {
    ORDER: {
      sandbox: true,
      sandbox_email: "123123123123123@sandbox.pagseguro.com.br",
      email: process.env.PAGSEGURO_EMAIL,
      token: process.env.PAGSEGURO_TOKEN_SANDBOX,
    },
    EMAIL: process.env.PAGSEGURO_EMAIL,
    TOKEN: process.env.PAGSEGURO_TOKEN_SANDBOX,
    API_URL: "https://ws.sandbox.pagseguro.uol.com.br",
    OLD_API_URL: "https://sandbox.pagseguro.uol.com.br",
    CARD_URL: "https://df.uol.com.br/v2/cards\n",
    SESSIONID: "",
    EMAIL_SANDBOX: "loja@sandbox.pagseguro.com.br",
  }
}

export default PAGSEGURO;