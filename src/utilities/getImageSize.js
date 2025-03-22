import {getDevice, isIPhoneLowerX} from "./getCurrentDevice";
import {Spaces} from "../styles/spaces";

export const getImageSize = () => {
    if (isIPhoneLowerX()) {
        return {
            height: Spaces.xxxlarge * 2,
            width: Spaces.xxxlarge * 2.5,
        }
    }

    if (getDevice() === 'iPad') {
        return {
            height: Spaces.xxxlarge * 3,
            width: Spaces.xxxlarge * 4,
        }
    }

    return {
        height: Spaces.xxxlarge * 2,
        width: Spaces.xxxlarge * 3,
    }
}