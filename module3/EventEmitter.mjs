export default class EventEmitter {
    listeners = {};  // key-value pair
   
    addListener(eventName, fn) {
        if(!this.listeners[eventName]){
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(fn);

        return this;
    }
      
    on(eventName, fn) {
        if(!this.listeners[eventName]){
            this.listeners[eventName] = [];
        }

        this.listeners[eventName].push(fn);
        
        return this;
    }
   
    removeListener(eventName, fn) {
        if(!this.listeners[eventName]) {
            return this;
        }

        const idx = this.listeners[eventName].indexOf(fn);

        if (idx !== -1) {
            this.listeners[eventName].splice(idx, 1);
        }else {
            const selfdeleteCallbackIdx = this.listeners[eventName].findIndex(
                selfdeleteCallback => selfdeleteCallback.originalListener === listener
            );

            if(selfdeleteCallbackIdx !== -1) {
                this.listeners[eventName].splice(selfdeleteCallbackIdx, 1);
            }
        }

        return this;
    }
      
    off(eventName, fn) {
        this.removeListener(eventName, fn)
    }
   
    once(eventName, fn) {
        const selfdeleteCallback = (...args) => {
            fn.apply(this, args);
            this.removeListener(eventName, selfdeleteCallback);
        }

        selfdeleteCallback.originalListener = fn;

        this.on(eventName, selfdeleteCallback);
    }
   
    emit(eventName, ...args) {
        if (!this.listeners[eventName]) {
            return;
        }

        this.listeners[eventName].slice().forEach(listener => {
            listener.apply(this, args);
        });
    }
   
    listenerCount(eventName) {
        return this.listeners[eventName].length;
    }
   
    rawListeners(eventName) {
        return this.listeners[eventName] ? [...this.listeners[eventName]] : [];
    }
}