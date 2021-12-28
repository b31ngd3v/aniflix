import JSSoup from "jssoup";

export default async function handler(req, res) {
  try {
    const { anime } = req.query;
    var url = `https://www2.gogoanime.cm/category/${anime}`;
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
      episodes: eps,
    };
    res.status(200).json(data);
  } catch {
    res.status(200).json([]);
  }
}
