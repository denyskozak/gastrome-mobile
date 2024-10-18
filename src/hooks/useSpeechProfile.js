import {useSettings} from "../contexts/settings.context.js";

export const useSpeechProfile = () => {
  const [settings, setSettings] = useSettings();

  const changeProfile = v => setSettings('speechProfile', v);
  const changeProfiles = v => setSettings('speechProfiles', v);

  return [settings['speechProfile'], changeProfile, settings['speechProfiles'], changeProfiles];
};
