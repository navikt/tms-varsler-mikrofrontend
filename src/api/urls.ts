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

const API_URL = {
  local: "http://localhost:3000/api/endpoint",
  development: "http://localhost:3000/api/endpoint",
  production: "https://person.nav.no/api/endpoint",
};

const DITTNAV_API_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no/dittnav-api",
  production: "https://www.nav.no/dittnav-api",
};

const MIN_SIDE_URL = {
  local: "http://localhost:3000/minside",
  development: "https://www.intern.dev.nav.no/minside",
  production: "https://www.nav.no/minside",
};

const LOGINSERVICE_URL = {
  local: "http://localhost:3000/loginservice",
  development: "https://loginservice.dev.nav.no/login?level=Level4",
  production: "https://loginservice.nav.no/login?level=Level4",
};

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000",
  development: "https://www.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

export const apiUrl = API_URL[getEnvironment()];
export const dittNavApiUrl = DITTNAV_API_URL[getEnvironment()];
export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const stepUpUrl = `${LOGINSERVICE_URL[getEnvironment()]}&redirect=${minSideUrl}/varsler`;
const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];

export const postDoneUrl = `${minSideProxyUrl}/eventaggregator/beskjed/done`;

export const varslerUrl = `${minSideProxyUrl}/varsel/tms-varsel-api/aktive`;

export const oppgaverApiUrl = `${dittNavApiUrl}/oppgave`;
export const beskjederApiUrl = `${dittNavApiUrl}/beskjed`;
export const innboksApiUrl = `${dittNavApiUrl}/innboks`;

export const inaktiveOppgaverApiUrl = `${dittNavApiUrl}/oppgave/inaktiv`;
export const inaktiveBeskjederApiUrl = `${dittNavApiUrl}/beskjed/inaktiv`;
export const inaktiveInnboksApiUrl = `${dittNavApiUrl}/innboks/inaktiv`;

export const tidligereVarslerUrl = `${minSideUrl}/tidligere-varsler`;
