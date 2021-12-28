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
      <div className="bg-gray-800 ml-9 mr-9 rounded-lg mb-3 flex mt-9">
        <img
          src={img}
          alt=""
          className="rounded-l-lg"
          style={{ height: 460 }}
        />
        <div>
          <p
            style={{ fontSize: 24 }}
            className="text-white font-semibold m-8 ml-10 mb-6 mt-6"
          >
            {truncate(name, 64, "...")}
          </p>
          <div className="flex mx-10 mb-2">
            <p className="text-gray-400 text-sm mr-2">Type:</p>
            <p className="text-white text-sm">{type}</p>
          </div>
          <div className="flex mx-10 mb-2">
            <p className="text-white text-sm">
              <span className="text-gray-400 text-sm mr-2">Plot Summary:</span>{" "}
              {truncate(description, 427, "...")}
            </p>
          </div>
          <div className="flex mx-10 mb-2">
            <p className="text-gray-400 text-sm mr-2">Genre:</p>
            <p className="text-white text-sm">{genre}</p>
          </div>
          <div className="flex mx-10 mb-2">
            <p className="text-gray-400 text-sm mr-2">Released:</p>
            <p className="text-white text-sm">{year}</p>
          </div>
          <div className="flex mx-10 mb-2">
            <p className="text-gray-400 text-sm mr-2">Status:</p>
            <p className="text-white text-sm">{status}</p>
          </div>
          <div className="flex mx-10 mb-2">
            <p className="text-gray-400 text-sm mr-2">Other names:</p>
            <p className="text-white text-sm">
              {truncate(otherNames, 26, "...")}
            </p>
          </div>
          <div className="flex mx-10 mb-2">
            <p className="text-gray-400 text-sm mr-2">Total episodes:</p>
            <p className="text-white text-sm">{totalEpisodes}</p>
          </div>
          <Link
            href={
              episodes === undefined || episodes.length === 0
                ? "/404"
                : episodes[0].url
            }
            passHref
          >
            <div className="hover:cursor-pointer ml-10 mt-9" id="btn-grad">
              <p className="text-sm font-semibold">Watch now</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex place-items-center m-7 my-6 mb-5">
        <FaGripLinesVertical size={28} color="#0251E5" />
        <p style={{ fontSize: 20 }} className="text-white font-semibold">
          Episodes
        </p>
      </div>
      <div className="bg-gray-800 ml-9 mr-9 rounded-lg mb-12 p-5 flex-wrap grid grid-cols-8">
        {episodes.map((episode, index) => {
          return (
            <Link href={episode.url} key={index} passHref>
              <div
                style={{ backgroundColor: "#101317" }}
                id="episodes"
                className="rounded-md flex justify-between h-11 px-4 place-items-center mr-4 mb-4 hover:cursor-pointer"
              >
                <p className="text-white text-sm mr-4">
                  EP
                  {episode.name.length === 1
                    ? ` 0${episode.name}`
                    : ` ${episode.name}`}
                </p>
                <div className="flex">
                  <p className="text-gray-400 mr-2 text-sm">|</p>
                  <p className="text-gray-400 text-sm">{episode.type}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
