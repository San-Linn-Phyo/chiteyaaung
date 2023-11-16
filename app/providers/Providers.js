import CurrentUserProvider from './CurrentUserProvider';
import SocketProvider from './SocketProvider';
import UnreadMessagesProvider from './UnreadMessagesProvider';
import UsersProvider from './UsersProvider';

export default function Providers({ children }) {
  return (
    <CurrentUserProvider>
      <SocketProvider>
        <UsersProvider>
          <UnreadMessagesProvider>{children}</UnreadMessagesProvider>
        </UsersProvider>
      </SocketProvider>
    </CurrentUserProvider>
  );
}
