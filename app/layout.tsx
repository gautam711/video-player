import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import VideoProvider from "@/features/VideoProvider";

export const metadata: Metadata = {
  title: "Video App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="md:container mx-auto mt-4 h-full">
        <Suspense fallback={"Loading"}>
          <h1 className="w-full font-bold text-xl text-center">VIDEO PLAYER</h1>
          <VideoProvider> {children} </VideoProvider>
        </Suspense>
      </body>
    </html>
  );
}
