import notifier from 'node-notifier';
import path from 'path';
import { fileURLToPath } from 'url';

class Toast {
    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);

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
            appID: this.appName, 
            sound: true,
            wait: false
        });
    }
}

export default Toast;