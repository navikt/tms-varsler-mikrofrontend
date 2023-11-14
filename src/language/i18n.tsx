import dayjs from "dayjs";
import "dayjs/locale/nb";
import localeData from "dayjs/plugin/localeData";
import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageProvider";
import { text } from "./text";

dayjs.locale("nb");

export const setLocaleDate = () => {
  dayjs.extend(localeData);
  dayjs.locale("nb");
};

const dateAsText = (date: string): string => {
  const language = useContext(LanguageContext);

  if (dayjs(date).isSame(dayjs(), "day")) {
    return text.iDag[language];
  }

  if (dayjs(date).isSame(dayjs().subtract(1, "day"), "day")) {
    return text.iGår[language];
  }

  return dayjs(date).format("DD.MM.YYYY");
};

const timeAsText = (date: string): string => {
  const language = useContext(LanguageContext);

  return `${text.klokkeslettPrefix[language]} ${dayjs(date).format("HH:mm")}`;
};

export const formatToReadableDate = (date: string) => `${dateAsText(date)}, ${timeAsText(date)}`;
