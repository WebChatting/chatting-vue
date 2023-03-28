let socket = {
    ws: null,

    ws_url: null,

    ws_port: 3333,

    init: (hostname) => {
        socket.ws_url = `ws://${hostname}:${socket.ws_port}/ws`;
        if (!window.WebSocket) {
            window.WebSocket = window.MozWebSocket;
        }

        socket.ws = new WebSocket(socket.ws_url);
        socket.ws.onmessage = (e) => {
            socket.receive(e);
        };

        // 连接关闭
        socket.ws.onclose = () => {
            console.log("ws连接断开");
        };

        // 连接成功
        socket.ws.onopen = () => {
            console.log("ws连接成功");
        };
        // 连接错误
        socket.ws.onerror = () => {
            console.log("ws连接错误");
        };
    },

    /**
     * 发送消息
     */
    send: (data, callback = null) => {
        // 开启状态直接发送
        if (socket.ws.readyState === socket.ws.OPEN) {
            socket.ws.send(JSON.stringify(data));
            if (callback) {
                callback();
            }

            // 正在开启状态，则等待1s后重新调用
        } else if (socket.ws.readyState === socket.ws.CONNECTING) {
            setTimeout(function () {
                socket.send(data, callback);
            }, 1000);

            // 未开启，则等待1s后重新调用
        } else {
            socket.init();
            setTimeout(function () {
                socket.send(data, callback);
            }, 1000);
        }
    },

    receive: (message) => {
        JSON.parse(message.data);
    },

    /**
     * 关闭连接
     */
    close: () => {
        if (socket.ws) {
            socket.ws.close();
        }
    },

    /**
     * 重新连接
     */
    reconnect: () => {
        if (socket.ws) {
            socket.close();
        }
        socket.init();
    },
};

export { socket };
