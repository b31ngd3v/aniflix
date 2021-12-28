import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";

export default function Navbar({ page }) {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [suggestionHidden, setSuggestionHidden] = useState(true);
  const router = useRouter();
  const truncate = (str, max, suffix) => {
    return str.length < max
      ? str
      : `${str.substr(
          0,
          str.substr(0, max - suffix.length).lastIndexOf(" ")
        )}${suffix}`;
  };
  const clearSuggestion = () => {
    setSuggestionHidden(true);
    setSuggestion([]);
  };
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27 || event.keyCode === 13) {
      setSuggestionHidden(true);
      setSuggestion([]);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 2) {
      try {
        var response = await (
          await fetch(`/api/search?keyword=${e.target.value}`)
        ).json();
        response = response.response.slice(0, 6);
        setSuggestion(response);
        setSuggestionHidden(false);
      } catch {
        setSuggestionHidden(true);
      }
    } else {
      setSuggestion([]);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?keyword=${search}`);
    setSuggestionHidden(true);
    setSuggestion([]);
  };
  return (
    <>
      <nav className="px-9 py-2.5 bg-gray-800 fixed w-full top-0 z-10">
        <div className="container flex flex-nowrap justify-between items-center min-w-full">
          <Link href="/" passHref>
            <img
              src="/logo-237x100.png"
              alt="Aniflix"
              className="hover:cursor-pointer flex rounded-md h-10"
            />
          </Link>
          <div className="flex order-2">
            <form className="relative mr-0 block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3">
                <button
                  onClick={handleSearch}
                  type="submit"
                  disabled={process.browser ? search == "" : true}
                >
                  <svg
                    className={
                      search != ""
                        ? "w-5 h-5 text-blue-500"
                        : "w-5 h-5 text-gray-500"
                    }
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <input
                type="text"
                size="34"
                spellCheck={false}
                style={{ backgroundColor: "rgb(34, 51, 68)" }}
                value={search}
                onChange={handleChange}
                className="block p-3 pl-10 w-full rounded-lg placeholder-gray-400 text-xs focus:outline-none font-bold text-slate-200"
                placeholder="Search..."
                onClick={() => setSuggestionHidden(false)}
                onBlur={(e) => {
                  try {
                    if (e.relatedTarget.id === "suggestion") {
                      setSuggestionHidden(false);
                    }
                  } catch {
                    setSuggestionHidden(true);
                  }
                }}
              />
              <ul
                className={
                  suggestionHidden || search.length < 2
                    ? "rounded-b-lg absolute w-full bg-gray-800 mt-1 hidden"
                    : "rounded-b-lg absolute w-full bg-gray-800 mt-1"
                }
                id="suggestions"
              >
                {suggestion.map((item, index) => {
                  return (
                    <li
                      className={
                        index === suggestion.length - 1
                          ? "text-white p-3 pl-6 pr-8"
                          : "text-white p-3 pl-6 pr-8 border-b border-dotted"
                      }
                      id="suggestion"
                      tabIndex="0"
                      key={index}
                    >
                      <Link href={item.url} passHref>
                        <a onClick={clearSuggestion}>
                          <div className="hover:cursor-pointer">
                            <p className="font-bold mb-1">
                              {truncate(item.name, 30, "...")}
                            </p>
                            <p className="text-sm text-gray-400">
                              Released: {item.year}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </form>
          </div>
          <ul
            className="flex flex-row space-x-8 text-sm font-medium flex-1 ml-24"
            id="sec"
          >
            <li>
              <Link href="/" passHref>
                <p
                  className={
                    page === "home"
                      ? "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-white"
                      : "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-gray-400 hover:text-blue-400"
                  }
                >
                  Home
                </p>
              </Link>
            </li>
            <li>
              <Link href="/dmca" passHref>
                <p
                  className={
                    page === "dmca"
                      ? "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-white"
                      : "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-gray-400 hover:text-blue-400"
                  }
                >
                  DMCA
                </p>
              </Link>
            </li>
            <li>
              <Link href="/terms" passHref>
                <p
                  className={
                    page === "terms"
                      ? "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-white"
                      : "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-gray-400 hover:text-blue-400"
                  }
                >
                  Terms
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contact" passHref>
                <p
                  className={
                    page === "contact"
                      ? "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-white"
                      : "block hover:cursor-pointer rounded font-bold bg-transparent p-0 text-gray-400 hover:text-blue-400"
                  }
                >
                  Contact
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div style={{ height: 60 }}></div>
    </>
  );
}
