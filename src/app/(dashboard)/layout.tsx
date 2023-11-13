import GlassPane from "@/components/GlassPane";
import "@/styles/global.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function DashboardRootLayout ({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
}

// https://fullstack-v2-instructions.vercel.app/lessons/routes-and-pages/root-layouts
// import "@/styles/global.css";
// import { Inter } from "@next/font/google";
// import Sidebar from "@/components/Sidebar";
// import clsx from "clsx";
// import GlassPane from "@/components/GlassPane";

// const inter = Inter({
//   variable: "--font-inter",
// });

// export default function DashboardRootLayout({ children }) {
//   return (
//     <html lang="en" className={clsx(inter.variable, "dark")}>
//       <head />
//       <body className="h-screen w-screen candy-mesh p-6">
//         <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
//           <Sidebar />
//           <main className="w-full pl-6 h-full">{children}</main>
//         </GlassPane>
//       </body>
//     </html>
//   );
// }