import dayjs from "dayjs";
import "dayjs/locale/nb";
import localeData from "dayjs/plugin/localeData";

dayjs.locale("nb");

export const setLocaleDate = () => {
  dayjs.extend(localeData);
  dayjs.locale("nb");
};

export const formatToReadableDate = (date: string) => {
  return dayjs(date).format("DD.MM.YY, kl HH.mm");
};

const i18n = {
  nb: {
    numberToWord: (tall: number) => {
      const ord = ["ett", "to", "tre", "fire", "fem", "seks", "sju", "åtte", "ni", "ti", "elleve", "tolv"];
      return tall > 12 ? tall : ord[tall - 1];
    },
    formatDate: (date: string) => new Date(date).toLocaleDateString("nb-NO"),
    oneMasculine: () => "én",
    oneFeminine: () => "éi",
    oneNeuter: () => "ett",
    formatDateMonth: (date: string) => dayjs(date).format("D. MMMM YYYY"),
    formatDayAndMonth: (date: string) => dayjs(date).locale("nb").format("DD.MM.YYYY"),
    formatDateAndTime: (date: string) => dayjs(date).locale("nb").format("DD.MM.YYYY - HH:mm"),
  },
};

export default i18n;
