import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import List from "../components/List";
import Navbar from "../components/Navbar";
import { hero, favourite, popular } from "../data/data";

export default function Home({ hero, popular, favourite }) {
  return (
    <>
      <Header title="Aniflix - Home" />
      <div className="min-h-screen relative">
        <Navbar page="home" />
        <Hero
          name={hero.name}
          img={hero.img}
          description={hero.description}
          totalEpisodes={hero.totalEpisodes}
          rating={hero.rating}
          url={hero.url}
          genre={hero.genre}
        />
        <List pageTitle="Most popular" data={popular} />
        <div className="pb-16">
          <List pageTitle="Most favourite" data={favourite} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: { hero, popular, favourite },
  };
}
