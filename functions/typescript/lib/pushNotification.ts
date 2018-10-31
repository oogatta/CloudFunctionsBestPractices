class PushNotification {
  send(message: string): any {
    // not implemented
    return Promise.resolve();
  }
}

const pushNotification = new PushNotification();
export default pushNotification;