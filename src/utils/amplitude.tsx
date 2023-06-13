import amplitude from "amplitude-js";

export const initializeAmplitude = () => {
  amplitude.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

export function logArkiverEvent() {
  amplitude.getInstance().logEvent("arkivert-beskjed", {
    app: "tms-varsler-mikrofrontend",
    komponent: "varsler-beskjed-arkiverbar",
    kategori: "varsler",
  });
}

export function logEvent(komponent: string, kategori: string, lenketekst?: string, destinasjon?: string) {
  if (!destinasjon) {
    amplitude.getInstance().logEvent("navigere", {
      app: "tms-varsler-mikrofrontend",
      komponent: komponent,
      kategori: kategori,
      lenketekst: lenketekst,
    });
  } else {
    amplitude.getInstance().logEvent("navigere", {
      app: "tms-varsler-mikrofrontend",
      komponent: komponent,
      kategori: kategori,
      destinasjon: destinasjon,
    });
  }
}
