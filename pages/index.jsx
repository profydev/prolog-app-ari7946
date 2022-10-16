import { Header } from "@features/landing";
import Head from "next/head";
import axios from "axios";
import { useQuery } from "react-query";

async function getHomePageData() {
  const { data } = await axios.get(
    "https://prolog-api.profy.dev/content-page/home"
  );
  return data;
}

export async function getStaticProps() {
  const data = await getHomePageData();
  return { props: { data } };
}

const Home = (props) => {
  const { data } = useQuery(["home"], getHomePageData, {
    initialData: props.data,
  });
  console.log("data", data);
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

export default Home;
