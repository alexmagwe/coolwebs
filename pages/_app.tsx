import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../lib/apollo";
import { UserProvider } from "@auth0/nextjs-auth0";
import NavBar from "../components/NavBar";
import { useState } from "react";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <NavBar />
        <Component {...pageProps} />
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
