import {
  Header,
  Hero,
  SocialProof,
  Testimonials,
  ContactModal,
} from "@features/landing";
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
  const {
    data: { meta, sections },
  } = useQuery(["home"], getHomePageData, {
    initialData: props.data,
  });
  const [hero, socialProof, testimonials] = sections;

  return (
    <main>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero hero={hero} />
      <SocialProof socialProof={socialProof} />
      <Testimonials testimonials={testimonials} />
      <ContactModal />
    </main>
  );
};

export default Home;
