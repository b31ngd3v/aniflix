import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between pl-9 pr-9 h-16 bg-gray-800 place-items-center absolute bottom-0 w-full">
      <div className="text-white flex">
        Copyright © {new Date().getFullYear()}&nbsp;
        <p className="hover:text-blue-400 font-semibold">
          <Link href="/">Aniflix</Link>
        </p>
        . All Rights Reserved.
      </div>
      <div className="flex text-white w-72 justify-between">
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
