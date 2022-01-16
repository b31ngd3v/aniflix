import JSSoup from "jssoup";

export default async function handler(req, res) {
  try {
    var url = `https://www3.gogoanime.cm`;
    var response = await fetch(url);
    response = await response.text();
    var soup = new JSSoup(response);
    var a = soup.find("ul", "items").contents;
    response = [];
    for (var i = 0; i < a.length; i++) {
      var data = {
        name: a[i].find("p").text,
        img: a[i].find("img").attrs.src,
        url: a[i].find("a").attrs.href.replace("/", "/anime/"),
        episode: a[i]
          .find("p", "episode")
          .text.replace(/ /g, "")
          .replace(/\n/g, "")
          .replace("Episode", ""),
      };
      response.push(data);
    }
    res.status(200).json({ response });
  } catch {
    res.status(200).json({ response: [] });
  }
}
