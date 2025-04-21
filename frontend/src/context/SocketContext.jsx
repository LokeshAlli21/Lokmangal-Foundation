// src/context/SocketContext.js
import { createContext, useContext, useEffect } from 'react';
import socket from '../socket';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId }) => {
  useEffect(() => {
    if (!userId) return;

    socket.connect();

    socket.emit('join', { userId });

    return () => {
      socket.emit('go-offline', { userId });
      socket.disconnect();
    };
  }, [userId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
