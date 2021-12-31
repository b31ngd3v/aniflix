import Link from "next/link";
import { FaGripLinesVertical } from "react-icons/fa";

export default function Info({
  img,
  name,
  type,
  description,
  genre,
  year,
  status,
  otherNames,
  totalEpisodes,
  episodes,
}) {
  const truncate = (str, max, suffix) => {
    if (str === undefined) {
      return undefined;
    }
    return str.length < max
      ? str
      : `${str.substr(
          0,
          str.substr(0, max - suffix.length).lastIndexOf(" ")
        )}${suffix}`;
  };
  return (
    <>
      <div
        id="info-holder"
        className="bg-gray-800 rounded-lg md:m-9 md:mb-3 md:flex lg:m-9 lg:mb-3 lg:flex xl:m-9 xl:mb-3 xl:flex m-2 mb-3"
      >
        <div id="poster" style={{ height: 460, minWidth: 331, maxWidth: 331 }}>
          <img
            src={img}
            alt=""
            className="rounded-l-lg md:block lg:block xl:block hidden w-full h-full"
          />
        </div>
        <div className="md:pt-0 lg:pt-0 xl:pt-0 pt-px">
          <p
            style={{ fontSize: 24 }}
            className="text-white font-semibold m-8 md:ml-10 lg:ml-10 xl:ml-10 ml-5 md:my-6 lg:my-6 xl:my-6 my-3 truncate"
          >
            {truncate(name, 64, "...")}
          </p>
          <div className="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
            <p className="text-gray-400 text-sm mr-2">Type:</p>
            <p className="text-white text-sm">{type}</p>
          </div>
          <div className="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
            <p className="text-white text-sm">
              <span className="text-gray-400 text-sm mr-2">Plot Summary:</span>{" "}
              {truncate(description, 427, "...")}
            </p>
          </div>
          <div className="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2 truncate">
            <p className="text-gray-400 text-sm mr-2">Genre:</p>
            <p className="text-white text-sm">{genre}</p>
          </div>
          <div className="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
            <p className="text-gray-400 text-sm mr-2">Released:</p>
            <p className="text-white text-sm">{year}</p>
          </div>
          <div className="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
            <p className="text-gray-400 text-sm mr-2">Status:</p>
            <p className="text-white text-sm">{status}</p>
          </div>
          <div className="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2 truncate">
            <p className="text-gray-400 text-sm mr-2">Other names:</p>
            <p className="text-white text-sm">
              {truncate(otherNames, 26, "...")}
            </p>
          </div>
          <div className="flex md:mx-10 lg:mx-10 xl:mx-10 mx-5 mb-2">
            <p className="text-gray-400 text-sm mr-2">Total episodes:</p>
            <p className="text-white text-sm">{totalEpisodes}</p>
          </div>
          <Link
            href={
              episodes === undefined || episodes.length === 0
                ? "#"
                : episodes[0].url
            }
            passHref
          >
            <div
              className="hover:cursor-pointer md:ml-10 md:mt-9 lg:ml-10 lg:mt-9 xl:ml-10 xl:mt-9 ml-5 mt-5"
              id="btn-grad"
            >
              <p className="text-sm font-semibold">Watch now</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex place-items-center md:mx-7 lg:mx-7 xl:mx-7 mx-1 md:my-6 xl:my-6 lg:my-6 md:mb-5 lg:mb-5 xl:mb-5 mt-5 mb-4">
        <FaGripLinesVertical size={28} color="#0251E5" />
        <p style={{ fontSize: 20 }} className="text-white font-semibold">
          Episodes
        </p>
      </div>
      <div
        id="episode"
        className="bg-gray-800 md:mx-9 lg:mx-9 xl:mx-9 mx-2 rounded-lg mb-12 md:p-5 lg:p-5 xl:p-5 p-3.5 pr-0 flex-wrap grid grid-cols-11"
      >
        {episodes.map((episode, index) => {
          return (
            <Link href={episode.url} key={index} passHref>
              <div
                style={{ backgroundColor: "#101317" }}
                id="episodes"
                className="rounded-md flex justify-between h-11 px-4 place-items-center mr-4 mb-4 hover:cursor-pointer"
              >
                <p className="text-white md:text-sm lg:text-sm xl:text-sm text-xs md:mr-4 lg:mr-4 xl:mr-4 mr-1">
                  EP
                  {episode.name.length === 1
                    ? ` 0${episode.name}`
                    : ` ${episode.name}`}
                </p>
                <div className="flex">
                  <p className="text-gray-400 md:mr-2 lg:mr-2 xl:mr-2 mr-1 md:text-sm lg:text-sm xl:text-sm text-xs">
                    |
                  </p>
                  <p className="text-gray-400 md:text-sm lg:text-sm xl:text-sm text-xs">
                    {episode.type}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
