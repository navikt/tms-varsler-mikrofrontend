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

export function logAmplitudeEvent(komponent: string, destinasjon?: string) {
  if (!destinasjon) {
    amplitude.getInstance().logEvent("navigere", {
      komponent,
    });
  } else {
    amplitude.getInstance().logEvent("navigere", {
      komponent,
      destinasjon,
    });
  }
}
