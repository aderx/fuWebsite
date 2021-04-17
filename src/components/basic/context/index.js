import {createContext} from "react";
import {NOOP} from "Utils";

export const Configure = createContext({
    $l: {},
    toggleConfigure: NOOP,
})