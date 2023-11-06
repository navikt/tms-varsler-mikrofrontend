import { HttpResponse, http } from "msw";
import { postDoneUrl, varslerUrl } from "../api/urls";

export const varslerHandler = () => {
  return [
    http.post(postDoneUrl, () => {
      return new HttpResponse("OK", { status: 200 });
    }),
    http.get(varslerUrl, () => {
      return HttpResponse.json({
        oppgaver: [
          {
            forstBehandlet: "2023-10-30T08:53:31.607Z",
            eventId: "1584093211607",
            tekst: "Svar fra veilederen din i innboksen: Hei, nå har jeg sjekket om...",
            link: "https://enNyLenke",
            isMasked: false,
            eksternVarslingSendt: false,
            eksternVarslingKanaler: [],
          },
          {
            forstBehandlet: "2020-03-13T09:03:09.348Z",
            eventId: "1584093789348",
            tekst: "Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44",
            link: "https://enNyLenke",
            isMasked: false,
            eksternVarslingSendt: true,
            eksternVarslingKanaler: ["SMS"],
          },
        ],
        beskjeder: [
          {
            forstBehandlet: "2020-03-03T08:53:17.47Z",
            eventId: "1584093197470",
            tekst:
              "Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger. Her kan du også ettersende vedlegg til sønakden hvis det er noe du ønsker å gjøre.",
            link: "https://enNyLenke",
            isMasked: false,
            eksternVarslingSendt: true,
            eksternVarslingKanaler: ["SMS"],
          },
          {
            forstBehandlet: "2019-11-27T12:24:34.671Z",
            eventId: "1174857474672",
            uid: "934de6ce-f94f-47de-84d2-639ac2674627",
            tekst:
              "Søknad om forskudd på dagpenger er mottatt. Hvis du trenger forskudd på dagpenger eller ettersende vedlegg til sønakden din kan du trykke deg inn i den nye forskuddskøsningen ved å gå til denne siden.",
            link: null,
            isMasked: true,
            eksternVarslingSendt: true,
            eksternVarslingKanaler: ["SMS", "EPOST"],
          },
          {
            forstBehandlet: "2020-03-13T09:03:01.449Z",
            eventId: "1584093781449",
            tekst: "Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.",
            link: "",
            isMasked: false,
            eksternVarslingSendt: false,
            eksternVarslingKanaler: [],
          },
        ],
        innbokser: [
          {
            forstBehandlet: "2020-02-22T08:53:31.607Z",
            eventId: "1584093211607",
            tekst: "Svar fra veilederen din i innboksen: Hei, nå har jeg sjekket om...",
            link: "https://enNyLenke",
            isMasked: false,
            eksternVarslingSendt: true,
            eksternVarslingKanaler: ["EPOST"],
          },
          {
            forstBehandlet: "2020-03-13T09:03:09.348Z",
            eventId: "1584093789348",
            tekst: "Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44",
            link: "https://enNyLenke",
            isMasked: false,
            eksternVarslingSendt: false,
            eksternVarslingKanaler: [],
          },
        ],
      });
    }),
  ];
};

export const handlers = [...varslerHandler()];
