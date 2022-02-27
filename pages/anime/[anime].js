import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import JSSoup from "jssoup";
import { useEffect, useState } from "react";
import Player from "../../components/Player";

export default function Anime({ data }) {
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
      var { img } = await (
        await fetch(data.info.replace("/info", "/api/info"))
      ).json();
      var continueWatching = JSON.parse(
        window.localStorage.getItem("continue")
      );
      if (continueWatching === null) {
        continueWatching = [];
      }
      continueWatching = continueWatching.filter(
        (item) => item.name !== data.anime
      );
      continueWatching.unshift({
        name: data.anime,
        url:
          "/anime" +
          data.urlSource
            .split("?anime=")[0]
            .split("/anime")[1]
            .replace(".json", ""),
        episode: data.currentEpisode,
        img,
      });
      window.localStorage.setItem(
        "continue",
        JSON.stringify(continueWatching.slice(0, 6))
      );
    }
    a();
  }, [data]);

  return (
    <>
      <div className="min-h-screen relative">
        <Header title={`Aniflix - ${data.name}`} />
        <Navbar />
        <div className="pb-16">
          <Player
            name={data.name}
            anime={data.anime}
            info={data.info}
            category={data.category}
            currentEpisode={data.currentEpisode}
            episodes={episodes}
            videoUrl={data.videoData}
          />
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    var urlSource = `https://aniflix.eu.org${context.req.url}`;
    urlSource = new URL(urlSource).pathname;
    var anime = urlSource
      .substring(urlSource.lastIndexOf("/") + 1)
      .replace(".json", "");

    const USERAGENT =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36";
    var urlTarget = `${process.env.BASE}/${anime}`;
    var response = await fetch(urlTarget, {
      headers: { "user-agent": USERAGENT },
    });
    response = await response.text();
    var soup = new JSSoup(response);
    var allUl = soup.findAll("ul");
    for (var i = 0; i < allUl.length; i++) {
      if (allUl[i].attrs.id == "episode_page") {
        var allEpisodes = allUl[i].contents;
        break;
      }
    }
    var urlAttack = `https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end=${
      allEpisodes[allEpisodes.length - 1].find("a").attrs.ep_end
    }&id=${soup.find("input", "movie_id").attrs.value}&default_ep=${
      soup.find("input", "default_ep").attrs.value
    }&alias=${anime}`;
    var currentEpisode = parseInt(soup.find("input", "default_ep").attrs.value);
    var embedLink = response
      .match(`.*<a href="#" rel="100" data-video=".*`)[0]
      .trim();
    embedLink = embedLink.replace(
      `<a href="#" rel="100" data-video="`,
      "https:"
    );
    embedLink = embedLink.substr(0, embedLink.search(`"`));
    var response = await fetch(embedLink, {
      headers: { "user-agent": USERAGENT },
    });
    response = await response.text();
    var videoData = response.match("s*sources.*")[0].trim();
    videoData = videoData.substring(
      videoData.search("https"),
      videoData.search("',")
    );
    videoData = videoData
      ? `/api/proxy/${videoData.replace("https://", "")}`
      : null;

    // gogoanime for some reason only shows 720p video links
    // replace the videoData so that all qualities can be streamed
    videoData = videoData
      ? videoData.replace(/\.[\d]{3,4}\.m3u8/, ".m3u8")
      : null;

    var data = {
      name: soup
        .find("div", "anime_video_body")
        .find("h1")
        .text.replace(" at gogoanime", ""),
      anime: soup.find("div", "anime-info").find("a").text,
      info: soup
        .find("div", "anime-info")
        .find("a")
        .attrs.href.replace("/category", "/info"),
      category: soup.find("div", "anime_video_body_cate").find("a").text,
      currentEpisode,
      urlSource: context.req.url,
      url: urlAttack,
      videoData,
    };
    return { props: { data } };
  } catch {
    return { props: { data: {} } };
  }
}
