import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex md:justify-between lg:justify-between xl:justify-between justify-center md:pl-9 md:pr-9 lg:pl-9 lg:pr-9 xl:pl-9 xl:pr-9 md:h-16 lg:h-16 xl:h-16 h-14 bg-gray-800 place-items-center absolute bottom-0 w-full">
      <div className="text-white flex md:text-base lg:text-base xl:text-base text-sm">
        Copyright © {new Date().getFullYear()}&nbsp;
        <p className="hover:text-blue-400 font-semibold">
          <Link href="/">Aniflix</Link>
        </p>
        . All Rights Reserved.
      </div>
      <div className="md:flex lg:flex xl:flex hidden text-white w-72 justify-between">
        <p className="hover:text-blue-400 text-sm">
          <Link href="/dmca">DMCA</Link>
        </p>
        <p className="hover:text-blue-400 text-sm">
          <Link href="/terms">Terms and Condition</Link>
        </p>
        <p className="hover:text-blue-400 text-sm">
          <Link href="/contact">Contact us</Link>
        </p>
      </div>
    </div>
  );
}
