export function wsType2messageType(wsType) {
    return parseInt((wsType - 3) / 2);
}

export function messageType2wsType(messageType, isGroup) {
    return messageType * 2 + 3 + isGroup;
}

export function wsType2type(m) {
    return m.ws_type % 2 === 0 ? "group" + m.toId : "user" + m.fromId;
}

import { audioExtensions, videoExtensions } from "@/config/file-extensions";
export function getFileSpecificType(fileName) {
    if (isIncludeExtension(audioExtensions, fileName)) {
        return 3;
    } else if (isIncludeExtension(videoExtensions, fileName)) {
        return 4;
    } else {
        return 2;
    }
}

function isIncludeExtension(extensions, fileName) {
    return fileName
        ? extensions.includes(fileName.substring(fileName.lastIndexOf(".")))
        : false;
}
