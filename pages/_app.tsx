import "@mantine/core/styles.css";
import Head from "next/head";
import { AppShell, Box, MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { SquiggleBackground } from "../components/SquiggleBackground";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Nakamoto Mining Leaderboard</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Box style={{ position: "relative", minHeight: "100vh" }}>
        <AppShell>
          <SquiggleBackground />
          <Component {...pageProps} />
        </AppShell>
      </Box>
    </MantineProvider>
  );
}
