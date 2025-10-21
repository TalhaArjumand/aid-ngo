const { host, hostname } = window.location;

const isLocal =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname.endsWith(".local");

const isStaging = hostname.includes("staging");

const devEnv = {
  APP_ENVIRONMENT: "development",
  // 👇 point this to YOUR backend (adjust port/path if different)
  BASE_URL: "http://localhost:3000/v1/",
  HOST_URL: `http://${host}`,
  PAYSTACK_KEY: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // your test key
  NIN_KEY: "",          // leave blank or your dev key
  GOOGLE_API: "",       // leave blank or your dev key
  DONOR_APP_URL: "http://localhost:4000", // if you run donor locally
  RECAPTCHA_SITE_KEY: "",
};

const stagingEnv = {
  APP_ENVIRONMENT: "staging",
  BASE_URL: "https://staging-api.chats.cash/v1/",
  HOST_URL: isLocal ? `http://${host}` : "https://staging.chats.cash",
  PAYSTACK_KEY: "pk_test_8ca0b7e72a203c05be761cdf339747f8fcfbeaa7",
  NIN_KEY: "F4Unc5MZ.e7BjG09xd9YJXMnvuXmayuICfMVNW6OE",
  GOOGLE_API: "AIzaSyApnZ4U1qeeHgHZuckDndNVVMIJAo-b5Vo",
  DONOR_APP_URL: isLocal ? "http://localhost:4000" : "https://staging-donor.chats.cash",
  RECAPTCHA_SITE_KEY: "",
};

const productionEnv = {
  APP_ENVIRONMENT: "production",
  BASE_URL: "https://api.chats.cash/v1/",
  HOST_URL: "https://dashboard.chats.cash",
  PAYSTACK_KEY: "pk_live_edacd8ac3c89064aacb7b901b0ebec088dfacf69",
  NIN_KEY: "F4Unc5MZ.e7BjG09xd9YJXMnvuXmayuICfMVNW6OE",
  GOOGLE_API: "AIzaSyAXAK5t4yAGczmh8vpeXevXwCHeOAw4w24",
  DONOR_APP_URL: "https://donor.chats.cash",
  RECAPTCHA_SITE_KEY: "",
};

export default isLocal ? devEnv : isStaging ? stagingEnv : productionEnv;