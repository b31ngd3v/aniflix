import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const ref = useRef();
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
      <div className="m-10 rounded-lg flex bg-gray-800 ">
        <Plyr source={videoData} options={options} ref={ref} />
        <div className="flex flex-col flex-1">
          <p
            style={{ fontSize: 20 }}
            className="text-white font-semibold m-5 mx-6 mt-4 w-72"
          >
            {truncate(name, 90, "...")}
          </p>
          <div style={{ maxWidth: 436 }} className="flex mx-6 mb-2">
            <p className="text-white text-sm">
              <span className="text-gray-400 text-sm mr-2">Anime info:</span>
              <Link href={info}>{anime}</Link>
            </p>
          </div>
          <div className="flex mx-6 mb-2">
            <p className="text-gray-400 text-sm mr-2">Type:</p>
            <p className="text-white text-sm">{category}</p>
          </div>
          <div className="flex justify-evenly h-full mb-8 items-end">
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
      <div className="flex place-items-center m-7 my-6 mb-5">
        <FaGripLinesVertical size={28} color="#0251E5" />
        <p style={{ fontSize: 20 }} className="text-white font-semibold">
          Episodes
        </p>
      </div>
      <div className="bg-gray-800 ml-9 mr-9 rounded-lg mb-12 p-5 flex-wrap grid grid-cols-8">
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
                <p className="text-white font-bold text-sm mr-4">
                  EP
                  {episode.name.length === 1
                    ? ` 0${episode.name}`
                    : ` ${episode.name}`}
                </p>
                <div className="flex">
                  <p className="text-gray-200 mr-2 text-sm">|</p>
                  <p className="text-gray-200 text-sm">{episode.type}</p>
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
          }
        })}
      </div>
    </>
  );
}
