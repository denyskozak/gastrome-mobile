import {useSettings} from "../contexts/settings.context.js";
import {useCallback} from "react";

export const useSpeechProfile = () => {
  const [settings, setSettings] = useSettings();

  const changeProfile = useCallback( v => setSettings('speechProfile', v), [setSettings]);
  const changeProfiles = useCallback(v => setSettings('speechProfiles', v), [setSettings]);

  return [settings['speechProfile'], changeProfile, settings['speechProfiles'], changeProfiles];
};
