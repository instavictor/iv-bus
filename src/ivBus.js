let _bus = [];

class EventBus {

  /**
    Dispatch a message across a channel
    - channel : the channel name
    - message : the message to dispatch
  */
  dispatch(channel, message) {
    if (_bus[channel] && _bus[channel].constructor === Array) {
      let i = 0;
      let length = _bus[channel].length;
      let data = message;
      let obj;

      if ((data !== undefined || data !== null) && data.constructor !== Array) {
        data = [data];
      }

      for (i = 0; i < length; i++) {
        obj = _bus[channel][i];
        obj.cb.apply(obj.listener, data);
      }
    }
  }

  /**
    Add a listener to the event bus
    - channel : the channel name
    - object : the object listener
    - callback : the callback method to apply for the listener
  */
  subscribe(channel, object, callback) {
    if (!_bus[channel]) {
      _bus[channel] = [];
    }

    _bus[channel].push({
      listener: object,
      cb: callback
    });
  }

  /**
    Remove all specified listeners from the event bus
    - channel : the channel name
    - object : the listener to remove
  */
  unsubscribe(channel, object) {
    if (_bus[channel] && _bus[channel].constructor === Array) {
      let i;

      for (i = 0; i < _bus[channel].length; i++) {
        if (object === _bus[channel][i].listener) {
          _bus[channel].splice(i, 1);
          i--;
        }
      }
    }
  }

  /**
    Returns all listeners for a specified channel
    - channel : the channel name

    @return array of listeners for the channel if exists, otherwise null
  */
  getSubscribers(channel) {
    if (channel && _bus[channel]) {
      return _bus[channel];
    } else {
      return null;
    }
  }
}

export default new EventBus();
