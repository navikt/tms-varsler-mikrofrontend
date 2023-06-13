import React, { useContext } from "react";
import { LanguageContext } from "../../../../providers/LanguageProvider";
import { text } from "../../../../language/text";
import { postDone } from "../../../../api/api";
import useStore from "../../../../store/store.js";
import { selectRemoveBeskjed } from "../../../../store/selectors.js";
import { logAmplitudeEvent, logArkiverEvent } from "../../../../utils/amplitude";
import style from "./ArkiverKnapp.module.css";
import { Varsel } from "../../../main-page/MainPage";

type Props = {
  eventId: string;
  setIsHover: (setIsHover: boolean) => void;
  varsel: Varsel;
};

const ArkiverKnapp = ({ eventId, setIsHover, varsel }: Props) => {
  const language = useContext(LanguageContext);
  const removeBeskjed = useStore(selectRemoveBeskjed);

  const handleOnClick = () => {
    postDone({ eventId: eventId });
    logArkiverEvent();
    removeBeskjed(varsel);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleOnClick}>
      {text.arkiverKnapp[language]}
    </button>
  );
};

export default ArkiverKnapp;
