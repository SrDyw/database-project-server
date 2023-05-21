function sendMessage(messageToSend, type = "message") {
    return { message: messageToSend, type };
    // if (type === "error") return { error: messageToSend };
    // if (type === "info") return { info: messageToSend };
}

module.exports = sendMessage;
