import Link from "next/link";
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
      <div className="flex place-items-center m-7">
        <FaGripLinesVertical size={28} color="#0251E5" />
        <p style={{ fontSize: 20 }} className="text-white font-semibold">
          {pageTitle}
        </p>
      </div>
      <div id="holder" className="mb-7 ml-9 mr-5 grid grid-cols-5">
        {data.map((item, index) => {
          return (
            <Link key={index} href={item.url} passHref>
              <div className="bg-gray-800 max-w-min rounded-md w-60 mb-4 hover:cursor-pointer">
                <img src={item.img} className="h-80 w-60 rounded-t-md" alt="" />
                <p className="w-56 font-semibold text-white m-4 mt-2.5 mb-0">
                  {truncate(item.name, 27, "...")}
                </p>
                <p className="text-gray-400 text-sm pl-4 pt-1 pb-3">
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
