export function showNotification(title, message) {
    if ("Notification" in window) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    // 用户已同意授权
                    showNotification(title, message);
                } else {
                    console.log("用户拒绝授权通知");
                }
            });
        } else {
            // 用户已经同意授权
            new Notification(title, {
                body: message,
                icon: "/favicon.ico",
            });
        }
    } else {
        console.log("浏览器不支持通知");
    }
}
