import notifier from 'node-notifier';

class Toast {
    constructor() {
        this.defaultTitle = 'Notification';
        this.defaultMessage = 'You have a new notification!';
    }

    show(title, message) {
        notifier.notify({
            title: title || this.defaultTitle,
            message: message || this.defaultMessage,
            sound: true,
            wait: false
        });
    }
}


export default Toast;