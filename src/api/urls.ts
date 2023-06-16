const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.intern.dev.nav.no");

export const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }

  return "local";
};

const MIN_SIDE_URL = {
  local: "http://localhost:3000/minside",
  development: "https://www.intern.dev.nav.no/minside",
  production: "https://www.nav.no/minside",
};

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const TMS_VARSEL_API_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no/tms-varsela-api",
  production: "https://www.nav.no/tms-varsela-api",
};

export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const stepUpUrl = `${
  MIN_SIDE_PROXY_URL[getEnvironment()]
}/login?level=Level4&redirect_uri=${minSideUrl}/varsler`;
const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];

export const postDoneUrl = `${TMS_VARSEL_API_URL}/beskjed/inaktiver`;

export const varslerUrl = `${TMS_VARSEL_API_URL}/aktive`;
export const tidligereVarslerUrl = `${minSideUrl}/tidligere-varsler`;