import notifier from 'node-notifier';
import path from 'path'; 

class Toast {
    constructor() {
        this.defaultTitle = 'Notification';
        this.defaultMessage = 'You have a new notification!';
        this.iconPath = path.join(__dirname, '../pics/icon.png'); 
        this.appName = 'Seojin selfbot'; 
    }

    show(title, message) {
        notifier.notify({
            title: title || this.defaultTitle,
            message: message || this.defaultMessage,
            icon: this.iconPath, 
            sound: true,
            wait: false,
            appName: this.appName 
        });
    }
}

export default Toast;