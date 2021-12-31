import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGripLinesVertical } from "react-icons/fa";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

export default function Player({
  name,
  anime,
  info,
  category,
  episodes,
  currentEpisode,
  videoData,
}) {
  const [previous, setPrevious] = useState("");
  const [next, setNext] = useState("");
  const options = {
    autoplay: true,
    controls: [
      "rewind",
      "play",
      "fast-forward",
      "progress",
      "current-time",
      "duration",
      "mute",
      "volume",
      "settings",
      "fullscreen",
    ],
    i18n: {
      restart: "Restart",
      rewind: "Rewind {seektime}s",
      play: "Play",
      pause: "Pause",
      fastForward: "Forward {seektime}s",
      seek: "Seek",
      seekLabel: "{currentTime} of {duration}",
      played: "Played",
      buffered: "Buffered",
      currentTime: "Current time",
      duration: "Duration",
      volume: "Volume",
      mute: "Mute",
      unmute: "Unmute",
      enableCaptions: "Enable captions",
      disableCaptions: "Disable captions",
      download: "Download",
      enterFullscreen: "Enter fullscreen",
      exitFullscreen: "Exit fullscreen",
      frameTitle: "Player for {title}",
      captions: "Captions",
      settings: "Settings",
      menuBack: "Go back to previous menu",
      speed: "Speed",
      normal: "Normal",
      quality: "Quality",
      loop: "Loop",
    },
  };
  useEffect(() => {
    async function a() {
      if (currentEpisode > 1 && episodes.length != 0) {
        setPrevious(episodes[currentEpisode - 2].url);
      } else {
        setPrevious("");
      }
      if (currentEpisode < episodes.length && episodes.length != 0) {
        setNext(episodes[currentEpisode].url);
      } else {
        setNext("");
      }
    }
    a();
  }, [episodes, currentEpisode]);

  const attachEventHandler = () => {
    try {
      document
        .getElementsByClassName("plyr__controls__item plyr__control")[3]
        .addEventListener("click", rotate);
      if (document.getElementsByTagName("video")[0].attributes.src != "") {
        clearInterval(intervalId);
      }
    } catch {}
  };

  try {
    var intervalId = window.setInterval(attachEventHandler, 500);
  } catch {}

  const getOppositeOrientation = () => {
    const { type } = screen.orientation;
    return type.startsWith("portrait") ? "landscape" : "portrait";
  };

  const rotate = async () => {
    try {
      const newOrientation = getOppositeOrientation();
      await screen.orientation.lock(newOrientation);
    } catch {}
  };

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
      <div className="md:m-10 lg:m-10 xl:m-10 m-2 rounded-lg md:flex lg:flex xl:flex bg-gray-800 ">
        <Plyr source={videoData} options={options} />
        <div className="flex flex-col flex-1">
          <p
            style={{ fontSize: 20 }}
            id="player-title"
            className="text-white font-semibold md:my-5 md:mx-6 md:mt-4 md:w-72 lg:my-5 lg:mx-6 lg:mt-4 lg:w-72 xl:my-5 xl:mx-6 xl:mt-4 xl:w-72 mx-5 my-3"
          >
            {truncate(name, 90, "...")}
          </p>
          <div
            style={{ maxWidth: 436 }}
            className="flex md:mx-6 lg:mx-6 xl:mx-6 mx-5 mb-2"
          >
            <p className="text-white text-sm">
              <span className="text-gray-400 text-sm mr-2">Anime info:</span>
              <Link href={info === undefined ? "#" : info} passHref>
                <span className="hover:cursor-pointer">{anime}</span>
              </Link>
            </p>
          </div>
          <div className="flex md:mx-6 lg:mx-6 xl:mx-6 mx-5 mb-2">
            <p className="text-gray-400 text-sm mr-2">Type:</p>
            <p className="text-white text-sm">{category}</p>
          </div>
          <div className="flex md:justify-evenly lg:justify-evenly xl:justify-evenly justify-between md:mx-0 lg:mx-0 xl:mx-0 mx-5 h-full md:mt-0 lg:mt-0 xl:mt-0 mt-3 md:mb-8 lg:mb-8 xl:mb-8 mb-5 items-end">
            {!previous ? (
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
              <Link href={previous} passHref>
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
              <Link href={next} passHref>
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
          if (parseInt(currentEpisode) - 1 === index) {
            return (
              <div
                style={{
                  backgroundImage: `linear-gradient(
    to right,
    #1673ff 0%,
    #0051e7 31%,
    #003cff 100%
  )`,
                }}
                id="episodes"
                key={index}
                className="rounded-md flex justify-between h-11 px-4 place-items-center mr-4 mb-4 hover:cursor-not-allowed"
              >
                <p className="text-white font-bold md:text-sm lg:text-sm xl:text-sm text-xs md:mr-4 lg:mr-4 xl:mr-4 mr-1">
                  EP
                  {episode.name.length === 1
                    ? ` 0${episode.name}`
                    : ` ${episode.name}`}
                </p>
                <div className="flex">
                  <p className="text-gray-200 md:mr-2 lg:mr-2 xl:mr-2 mr-1 md:text-sm lg:text-sm xl:text-sm text-xs">
                    |
                  </p>
                  <p className="text-gray-200 md:text-sm lg:text-sm xl:text-sm text-xs">
                    {episode.type}
                  </p>
                </div>
              </div>
            );
          } else {
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
          }
        })}
      </div>
    </>
  );
}
