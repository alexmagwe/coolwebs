import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Main from "../components/Home";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>CoolWebs</title>
        <meta name="description" content="find and bookmark cool websites" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <Main />
      </main>

      <footer className='absolute text-center w-full bottom-0'>
        <span className="text-gray-400">@keplalabs</span>
      </footer>
    </div>
  );
};

export default Home;
