import dotenv from "dotenv";
dotenv.config();

const config = {
  production: {
    WOO_HOST: "woo.yourcommerce.com.br",
    WOO_URL: "https://woo.yourcommerce.com.br",
    WOO_ACF_REST: "wp-json/acf/v3/pages",
    WOO_COCART: "wp-json/cocart/v1",
    WP_JWT: "wp-json/jwt-auth/v1",
    WP_REST: "wp-json/wp/v2",
    ACF_HOME_ID: 1,
  },
  stage: {
    WOO_HOST: "woo-stage.yourcommerce.com.br",
    WOO_URL: "https://woo-stage.yourcommerce.com.br",
    WOO_ACF_REST: "wp-json/acf/v3/pages",
    WOO_COCART: "wp-json/cocart/v1",
    WP_JWT: "wp-json/jwt-auth/v1",
    WP_REST: "wp-json/wp/v2",
    ACF_HOME_ID: 1,
  },
  local: {
    WOO_HOST: "woo-stage.yourcommerce.com.br",
    WOO_URL: "https://woo-stage.yourcommerce.com.br",
    WOO_ACF_REST: "wp-json/acf/v3/pages",
    WOO_COCART: "wp-json/cocart/v1",
    WP_JWT: "wp-json/jwt-auth/v1",
    WP_REST: "wp-json/wp/v2",
    ACF_HOME_ID: 1,
  },
};

export default config;
