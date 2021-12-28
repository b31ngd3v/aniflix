import { MongoClient } from "mongodb";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import List from "../components/List";
import Navbar from "../components/Navbar";

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
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  const db = client.db();
  const popularCollection = db.collection("popular");
  const popular = await popularCollection
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const favouriteCollection = db.collection("favourite");
  const favourite = await favouriteCollection
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const heroCollection = db.collection("hero");
  const hero = await heroCollection.findOne({}, { projection: { _id: 0 } });
  client.close();
  return {
    props: { hero, popular, favourite },
  };
}
