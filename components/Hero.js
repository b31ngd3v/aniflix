import { MdStars } from "react-icons/md";
import { BiPieChart, BiPlayCircle } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import Link from "next/link";

export default function Hero({
  name,
  img,
  description,
  genre,
  totalEpisodes,
  rating,
  url,
}) {
  return (
    <>
      <div
        className="m-9 mt-6 rounded-lg"
        style={{
          height: 354,
          background: `linear-gradient(to right, rgba(0, 0, 0, .5), rgba(0, 0, 0, .2), rgba(0, 0, 0, .0)), url(${img})`,
          backgroundSize: "cover",
        }}
      >
        <div className="text-white font-extrabold text-3xl p-12 pt-10 pb-6">
          {name.split("<br/>").map((line, index) => {
            return <p key={index}>{line}</p>;
          })}
        </div>
        <div className="flex pl-12">
          <div className="flex bg-black bg-opacity-40 mr-2 rounded-lg place-items-center">
            <MdStars
              color="#0158F9"
              style={{ marginLeft: 0.5, marginBottom: 1, marginTop: 0.5 }}
              size={17}
              className="mr-1"
            />
            <p
              style={{ fontSize: 10 }}
              className="text-white font-semibold pr-2"
            >
              {rating}
            </p>
          </div>
          <div className="flex bg-black bg-opacity-40 mr-2 rounded-lg place-items-center">
            <BiPieChart
              color="#0158F9"
              style={{ marginLeft: 0.5, marginBottom: 1, marginTop: 0.5 }}
              size={17}
              className="mr-1"
            />
            <p
              style={{ fontSize: 10 }}
              className="text-white font-semibold pr-2"
            >
              {totalEpisodes} episodes
            </p>
          </div>
          <div className="flex bg-black bg-opacity-40 mr-2 rounded-lg place-items-center">
            <BiPlayCircle
              color="#0158F9"
              style={{ marginLeft: 0.5, marginBottom: 1, marginTop: 0.5 }}
              size={17}
              className="mr-1"
            />
            {genre.map((one, index) => {
              if (index == genre.length - 1) {
                return (
                  <div key={index} className="flex">
                    <p
                      style={{ fontSize: 10 }}
                      className="text-white font-semibold pr-2"
                    >
                      {one}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="flex">
                    <p
                      style={{ fontSize: 10 }}
                      className="text-white font-semibold"
                    >
                      {one}
                    </p>
                    <BsDot color="#0158F9" />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <p
          style={{ fontSize: 12, width: 450 }}
          className="text-white font-semibold pl-12 pt-6"
        >
          {description}
        </p>
        <Link href={url} passHref>
          <div className="hover:cursor-pointer ml-12 mt-10" id="btn-grad">
            <p className="text-sm font-semibold">Watch now</p>
          </div>
        </Link>
      </div>
    </>
  );
}
