import SocketProvider from "./SocketProvider";
import CurrentUserProvider from "./CurrentUserProvider";
import UsersProvider from "./UsersProvider";
import UnreadMessagesProvider from "./UnreadMessagesProvider";

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
