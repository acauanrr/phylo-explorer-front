import { Providers } from "./providers";

export const metadata = {
  title: "Phylo Explorer",
  description:
    "Framework for the analysis and visualization of data by phylogenetic trees",
  author: "Acauan C. Ribeiro",
  icons: {
    icon: `${
      process.env.NODE_ENV === "production" ? "/phylo" : ""
    }/favicon/favicon.ico`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
