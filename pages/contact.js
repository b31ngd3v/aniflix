import { FaGripLinesVertical } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Terms() {
  return (
    <>
      <Header title={`Aniflix - Cotact`} />
      <div className="min-h-screen relative">
        <Navbar page="contact" />
        <div className="pb-16">
          <div className="flex place-items-center m-7 mb-6 mt-6">
            <FaGripLinesVertical size={28} color="#0251E5" />
            <p style={{ fontSize: 20 }} className="text-white font-semibold">
              Contact us
            </p>
          </div>
          <div className="bg-gray-800 mx-9 rounded-md p-6 px-7 mb-10">
            <div className="flex">
              <p className="text-gray-300">Email:</p> &nbsp;
              <p className="text-white">contact@aniflix.eu.org</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
