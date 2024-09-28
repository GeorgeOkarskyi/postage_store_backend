import { Server } from 'http';
import { Socket } from 'net';

let connections: Socket[] = [];

export function registerShutdown (server: Server) {
  server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => {
      connections = connections.filter(currConnection => currConnection !== connection);
    });
  });

  process.on('SIGTERM', shutdown(server));
  process.on('SIGINT', shutdown(server));
}

function shutdown (server: Server) {
  return () => {
    console.log('Received kill signal, shutting down gracefully...');

    server.close(() => {
      console.log('Closed out remaining connections.');
      process.exit(0); // exit gracefully
    });

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1); // force shutdown
    }, 20000);

    // End open connections
    connections.forEach(connection => connection.end());

    // Destroy remaining connections after a timeout
    setTimeout(() => {
      connections.forEach(conn => conn.destroy());
    }, 10000);
  };
}
