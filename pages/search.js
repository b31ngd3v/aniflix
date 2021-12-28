import jssoup from "jssoup";
import Header from "../components/Header";
import Footer from "../components/Footer";
import List from "../components/List";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function search({ keyword, response, next, page }) {
  return (
    <>
      <Header title={`Aniflix - Search result for ${keyword}`} />
      <div className="min-h-screen relative">
        <Navbar />
        <div className="pb-16">
          <List pageTitle={`Search result for "${keyword}"`} data={response} />
          <div className="flex justify-between mx-9 mb-8 relative -inset-y-3">
            {page === 1 ? (
              <div
                className="hover:cursor-pointer"
                style={{
                  borderRadius: 7,
                }}
                id="disabled"
              >
                <p className="text-sm font-semibold">Previous</p>
              </div>
            ) : (
              <Link
                href={`/search?keyword=${keyword}&page=${page - 1}`}
                passHref
              >
                <div
                  className="hover:cursor-pointer"
                  style={{ borderRadius: 7 }}
                  id="btn-grad"
                >
                  <p className="text-sm font-semibold">Previous</p>
                </div>
              </Link>
            )}
            {!next ? (
              <div
                className="hover:cursor-pointer"
                style={{
                  borderRadius: 7,
                }}
                id="disabled"
              >
                <p className="text-sm font-semibold">Next</p>
              </div>
            ) : (
              <Link
                href={`/search?keyword=${keyword}&page=${page + 1}`}
                passHref
              >
                <div
                  className="hover:cursor-pointer"
                  style={{ borderRadius: 7 }}
                  id="btn-grad"
                >
                  <p className="text-sm font-semibold">Next</p>
                </div>
              </Link>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  var url = context.req.url;
  url = new URL(`https://aniflix.eu.org${url}`);
  var keyword = url.searchParams.get("keyword");
  var page = parseInt(url.searchParams.get("page"));
  try {
    if (keyword) {
      if (page) {
        var url = `https://www2.gogoanime.cm/search.html?keyword=${keyword}&page=${page}`;
      } else {
        page = 1;
        var url = `https://www2.gogoanime.cm/search.html?keyword=${keyword}`;
      }
      var next = false;
      var response = await fetch(url);
      response = await response.text();
      var soup = new jssoup(response);
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
            .text.replaceAll(" ", "")
            .replaceAll("\n", "")
            .replace("Released:", ""),
        };
        response.push(data);
      }
      return { props: { keyword, response, next, page } };
    } else return { props: { keyword: "", response: [], next, page } };
  } catch {
    return { props: { keyword, response: [], next, page } };
  }
}
