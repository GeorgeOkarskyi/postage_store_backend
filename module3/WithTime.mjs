import EventEmitter from './EventEmitter.mjs';

export default class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit('begin');
        const startTime = Date.now();

        try {
            await asyncFunc(...args, (result) => {
                const endTime = Date.now();
                const duration = endTime - startTime;

                this.emit('data', result);
                this.emit('end', duration);
            })
        } catch (error) {
            this.emit('error', error);
        }
    }
 }