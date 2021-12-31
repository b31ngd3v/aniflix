import Link from "next/link";
import Image from "next/image";
import { FaGripLinesVertical } from "react-icons/fa";

export default function List({ pageTitle, data }) {
  const truncate = (str, max, suffix) => {
    return str.length < max
      ? str
      : `${str.substr(
          0,
          str.substr(0, max - suffix.length).lastIndexOf(" ")
        )}${suffix}`;
  };
  return (
    <>
      <div className="flex place-items-center md:m-7 lg:m-7 xl:m-7 m-6 mb-4 ml-0 mt-3">
        <FaGripLinesVertical size={28} color="#0251E5" />
        <p
          style={{ fontSize: 20 }}
          id="listinfo"
          className="text-white font-semibold"
        >
          {pageTitle}
        </p>
      </div>
      <div
        id="holder"
        className="mb-7 md:ml-9 lg:ml-9 xl:ml-9 ml-2 md:mr-5 lg:mr-5 xl:mr-5 mr-0 grid grid-cols-7"
      >
        {data.map((item, index) => {
          return (
            <Link key={index} href={item.url} passHref>
              <div className="bg-gray-800 max-w-min rounded-md w-60 md:mb-5 lg:mb-5 xl:mb-5 mb-3 hover:cursor-pointer">
                <div className="bg-gray-800 max-w-min rounded-md w-60 md:mb-5 lg:mb-5 xl:mb-5 mb-3 hover:cursor-pointer">
                  <Image
                    src={item.img}
                    width={240}
                    height={320}
                    className="rounded-t-md"
                    alt=""
                  />
                </div>
                <p
                  id="item-name"
                  className="w-56 truncate font-semibold md:text-base lg:text-base xl:text-base text-sm text-white m-4 mt-2.5 mb-0"
                >
                  {truncate(item.name, 27, "...")}
                </p>
                <p className="text-gray-400 md:text-sm lg:text-sm xl:text-sm text-xs pl-4 pt-1 pb-3">
                  Released: {item.year}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
