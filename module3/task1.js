class EventEmitter {
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


const myEmitter = new EventEmitter();

function c1() {
    console.log('an event occurred!');
}

function c2() {
    console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg)=> console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));