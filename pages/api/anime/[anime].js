import JSSoup from "jssoup";

export default async function handler(req, res) {
  try {
    const { anime } = req.query;
    var url = `https://www2.gogoanime.cm/${anime}`;
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
    response = await fetch(url);
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
    var currentEpisode = parseInt(soup.find("input", "default_ep").attrs.value);
    if (currentEpisode > 1) {
      var previous = eps[currentEpisode - 2].url;
    } else {
      var previous = undefined;
    }
    if (currentEpisode < eps.length) {
      var next = eps[currentEpisode].url;
    } else {
      var next = undefined;
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
      src: `https:${soup.find("iframe").attrs.src}`,
      currentEpisode,
      previous,
      next,
      episodes: eps,
    };
    res.status(200).json(data);
  } catch {
    res.status(200).json([]);
  }
}
