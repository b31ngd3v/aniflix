import JSSoup from "jssoup";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Info from "../../components/Info";
import Navbar from "../../components/Navbar";

export default function Information({ data }) {
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function a() {
      var response = await fetch(data.url);
      response = await response.text();
      var soupTwo = new JSSoup(response);
      var episodes = soupTwo.find("ul").contents;
      var eps = [];
      for (var i = 0; i < episodes.length; i++) {
        eps.push({
          name: episodes[i].find("div", "name").text.replace("EP ", ""),
          url: `/anime${episodes[i].find("a").attrs.href.replace(" ", "")}`,
          type: episodes[i].find("div", "cate").text,
        });
      }
      eps.reverse();
      setEpisodes(eps);
    }
    a();
  }, [data]);
  return (
    <div className="min-h-screen relative">
      <Header title={`Aniflix - ${data.name}`} />
      <Navbar />
      <div className="pb-16">
        <Info
          img={data.img}
          name={data.name}
          type={data.type}
          description={data.description}
          genre={data.genre}
          year={data.year}
          status={data.status}
          otherNames={data.otherNames}
          totalEpisodes={data.totalEpisodes}
          episodes={episodes}
        />
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  var url = `https://aniflix.eu.org${context.req.url}`;
  url = new URL(url).pathname;
  var anime = url.substring(url.lastIndexOf("/") + 1).replace(".json", "");
  try {
    var url = `${process.env.BASE}/category/${anime}`;
    var response = await fetch(url);
    response = await response.text();
    var soup = new JSSoup(response);
    var allUl = soup.findAll("ul");
    for (var i = 0; i < allUl.length; i++) {
      if (allUl[i].attrs.id == "episode_page") {
        var allEpisodes = allUl[i].contents;
        break;
      }
    }
    url = `https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end=${
      allEpisodes[allEpisodes.length - 1].find("a").attrs.ep_end
    }&id=${soup.find("input", "movie_id").attrs.value}&default_ep=${
      soup.find("input", "default_ep").attrs.value
    }&alias=${anime}`;
    var data = {
      name: soup.find("h1").text,
      img: soup.find("div", "anime_info_body_bg").contents[0].attrs.src,
      type: soup.find("p", "type").find("a").text,
      description: soup
        .findAll("p", "type")[1]
        .text.replace("Plot Summary: ", ""),
      genre: soup.findAll("p", "type")[2].text.replace("Genre: ", ""),
      year: soup.findAll("p", "type")[3].text.replace("Released: ", ""),
      status: soup.findAll("p", "type")[4].text.replace("Status: ", ""),
      otherNames: soup.findAll("p", "type")[5].text.replace("Other name: ", ""),
      totalEpisodes: soup.find("a", "active").attrs.ep_end,
      url,
    };
    return { props: { data } };
  } catch {
    return { props: { data: {} } };
  }
}
