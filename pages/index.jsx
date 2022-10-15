import { Header } from "@features/landing";
import Head from "next/head";

const IssuesPage = () => {
  return (
    <div>
      <Head>
        <title>ProLog</title>
        <meta name="description" content="Error monitoring" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  );
};

export default IssuesPage;
