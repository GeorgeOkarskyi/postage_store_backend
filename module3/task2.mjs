import WithTime from './WithTime.mjs'
import fetch from 'node-fetch';

const fetchFromUrl = async (url, cb) => {
    try {
        const responce = await fetch(url);

        if(!responce.ok) {
            throw new Error('Network Responce is not ok');
        }

        const data = await responce.json();

        cb(data);
    } catch (error) {
        console.error('There was a problem with your fetch operation:', error)
    }
 }
 
 
 const withTime = new WithTime();
 
 withTime.on('begin', () => console.log('About to execute'));
 withTime.on('end', (duration) => console.log(`Done with execute ${duration}ms`));
 withTime.on('data', ( data ) => console.log('Executed data:', data));
 withTime.on('error', ( error ) => console.error(error));
 
 withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');
 
 console.log(withTime.rawListeners('end'));