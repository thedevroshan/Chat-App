import { Montserrat } from "next/font/google";
import "./globals.css";

import { ScreenSupportProvider } from "./contexts/useScreenSupported";
import { UserInfoProvider } from "./contexts/useUserInfo";
import { SocketContextProvider } from "./contexts/useSocketContext";

// Components
import Search from "./components/Search";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "AurBhaii",
  description: "More than a chatting app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ScreenSupportProvider>
        <UserInfoProvider>
          <SocketContextProvider>
              <body className={`antialiased flex items-center vsc-initialized`}>
                <Search />
                {children}
              </body>
          </SocketContextProvider>
        </UserInfoProvider>
      </ScreenSupportProvider>
    </html>
  );
}
