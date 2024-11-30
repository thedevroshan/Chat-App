import { Montserrat } from "next/font/google";
import "./globals.css";

import { ScreenSupportProvider } from "./contexts/useScreenSupported";
import { UserInfoProvider } from "./contexts/useUserInfo";
import { ServerInfoProvider } from "./contexts/useServerInfo";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500','600', '700', '800', '900']
})

export const metadata = {
  title: "BaatChit",
  description: "More than a chatting app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ScreenSupportProvider>
        <UserInfoProvider>
          <ServerInfoProvider>
            <body className={`antialiased flex items-center vsc-initialized`}>
              {children}
            </body>
          </ServerInfoProvider>
        </UserInfoProvider>
      </ScreenSupportProvider>
    </html>
  );
}
