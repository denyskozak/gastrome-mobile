import {useSettings} from "../contexts/settings.context";
import {useCallback} from "react";

export const useLogger = () => {
    const [settings, setSetting] = useSettings();

    const log = useCallback((text) => setSetting('errors', [...settings['errors'], text]), [setSetting, settings['errors']]);
    const reset = useCallback(() => setSetting('errors', []), [setSetting]);

    return [log, reset];
}