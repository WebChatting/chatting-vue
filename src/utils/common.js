export function wsType2messageType(wsType) {
    return (wsType - 3) / 2;
}

export function messageType2wsType(messageType, isGroup) {
    return messageType * 2 + 3 + isGroup;
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
