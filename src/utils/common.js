export function wsType2messageType(wsType) {
    return (wsType - 3) / 2;
}

export function messageType2wsType(messageType, isGroup) {
    return messageType * 2 + 3 + isGroup;
}
