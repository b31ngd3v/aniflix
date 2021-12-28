import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import JSSoup from "jssoup";
import Player from "../../components/Player";
import { useEffect, useState } from "react";
import cheerio from "cheerio";
import CryptoJS from "crypto-js";
import url from "url";

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
            videoData={data.videoData}
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
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function f_random(length) {
      var i = length,
        str = "";
      while (i > 0x0) {
        i--, (str += getRandomInt(0, 9));
      }
      return str;
    }
    function generateEncryptAjaxParameters($, id) {
      const value6 = $("script[data-name=\x27ts\x27]").data("value");
      const value5 = $("[name='crypto']").attr("content");
      const value1 = CryptoJS.enc.Utf8.stringify(
        CryptoJS.AES.decrypt(
          $("script[data-name=\x27crypto\x27]").data("value"),
          CryptoJS.enc.Utf8.parse(value6.toString() + value6.toString()),
          {
            iv: CryptoJS.enc.Utf8.parse(value6),
          }
        )
      );
      const value4 = CryptoJS.AES.decrypt(
        value5,
        CryptoJS.enc.Utf8.parse(value1),
        {
          iv: CryptoJS.enc.Utf8.parse(value6),
        }
      );
      const value3 = CryptoJS.enc.Utf8.stringify(value4);
      const value2 = f_random(16);
      return (
        "id=" +
        CryptoJS.AES.encrypt(id, CryptoJS.enc.Utf8.parse(value1), {
          iv: CryptoJS.enc.Utf8.parse(value2),
        }).toString() +
        "&time=" +
        "00" +
        value2 +
        "00" +
        value3.substring(value3.indexOf("&"))
      );
    }
    async function fetchAndParse(fetchParams) {
      const $ = await fetch(fetchParams.url, {
        headers: fetchParams.headers,
      })
        .then((res) => res.text())
        .then((body) => cheerio.load(body));
      if (
        $("title")
          .text()
          .match(/Access denied \| .* used Cloudflare to restrict access/)
      ) {
        throw new Error("Cloudflare detected");
      }
      return $;
    }
    var urlTarget = `https://www2.gogoanime.cm/${anime}`;
    var response = await fetch(urlTarget);
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
    var src = `https:${soup.find("iframe").attrs.src}`;
    var embed = url.parse(src, true);
    var $ = await fetchAndParse({
      url: src,
      headers: {
        "User-Agent": USERAGENT,
      },
    });
    var params = generateEncryptAjaxParameters($, embed.query.id);
    var videoData = await fetch(
      `${embed.protocol}//${embed.hostname}/encrypt-ajax.php?${params}`,
      {
        headers: {
          "User-Agent": USERAGENT,
          Referer: src,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    ).then((resp) => resp.json());
    var videoDataList = [];
    for (var i = 0; i < videoData.source.length; i++) {
      videoDataList.push({
        src: videoData.source[i].file,
        type: "video/mp4",
        size: parseInt(videoData.source[i].label.split(" ")[0]),
      });
    }
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
      url: urlAttack,
      videoData: { type: "video", sources: videoDataList },
    };
    return { props: { data } };
  } catch {
    return { props: { data: {} } };
  }
}
