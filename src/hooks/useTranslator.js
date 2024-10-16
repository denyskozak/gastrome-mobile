import {translations} from '../translator/translates';
import {useCallback, useState} from "react";
import {useSettings} from "../contexts/settings.context";
import _ from "lodash";

export const useTranslator = (prefix = '') => {
  const [settings, setSetting] = useSettings();

  const fullPrefix = prefix ? `${prefix}.` : '';

  const replace = (text, replaces) => Object.entries(replaces).reduce((store, [key, value]) => store.replace(`{${key}}`, value), text);
  const get = useCallback((key, replaces = {}) => {
    const text = _.get(translations[settings['language']], `${fullPrefix}${key}`);
    return text ? replace(text, replaces) : text;
  }, [settings['language']]);

  const handleSetLanguage = (nextLanguage) => {
    setSetting('language', nextLanguage);
  };

  return [get, handleSetLanguage, settings['language']];
};
