import JSSoup from "jssoup";

export default async function handler(req, res) {
  try {
    var keyword = req.query.keyword;
    if (req.query.page) {
      var page = req.query.page;
      var url = `https://www2.gogoanime.cm/search.html?keyword=${keyword}&page=${page}`;
    } else {
      var url = `https://www2.gogoanime.cm/search.html?keyword=${keyword}`;
    }
    var next = false;
    var response = await fetch(url);
    response = await response.text();
    var soup = new JSSoup(response);
    var a = soup.find("ul", "items").contents;
    try {
      var pages = soup.find("ul", "pagination-list").contents;
      for (var i = 0; i < pages.length; i++) {
        if (pages[i].attrs.class === "selected" && i + 1 < pages.length) {
          next = true;
        }
      }
    } catch {
      next = false;
    }
    response = [];
    for (var i = 0; i < a.length; i++) {
      var data = {
        name: a[i].find("p").text,
        img: a[i].find("img").attrs.src,
        url: a[i].find("a").attrs.href.replace("/category", "/info"),
        year: a[i]
          .find("p", "released")
          .text.replace(/ /g, "")
          .replace(/\n/g, "")
          .replace("Released:", ""),
      };
      response.push(data);
    }
    res.status(200).json({ response, next });
  } catch {
    res.status(200).json({ response: [], next: false });
  }
}
