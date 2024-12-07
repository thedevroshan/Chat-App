import { Montserrat } from "next/font/google";
import "./globals.css";

import { ScreenSupportProvider } from "./contexts/useScreenSupported";
import { UserInfoProvider } from "./contexts/useUserInfo";
import { ServerInfoProvider } from "./contexts/useServerInfo";
import { SocketContextProvider } from "./contexts/useSocketContext";

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
            <ServerInfoProvider>
              <body className={`antialiased flex items-center vsc-initialized`}>
                {children}
              </body>
            </ServerInfoProvider>
          </SocketContextProvider>
        </UserInfoProvider>
      </ScreenSupportProvider>
    </html>
  );
}
