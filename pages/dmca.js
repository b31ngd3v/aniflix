import Link from "next/link";
import { FaGripLinesVertical } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function DMCA() {
  return (
    <>
      <Header title={`Aniflix - DMCA`} />
      <div className="min-h-screen relative">
        <Navbar page="dmca" />
        <div className="pb-16">
          <div className="flex place-items-center m-7 mb-6 mt-6">
            <FaGripLinesVertical size={28} color="#0251E5" />
            <p style={{ fontSize: 20 }} className="text-white font-semibold">
              DMCA Takedown Request Requirements
            </p>
          </div>
          <div className="bg-gray-800 mx-9 rounded-md p-6 px-7 mb-10">
            <p className="text-gray-400 text-sm leading-6">
              We take the intellectual property rights of others seriously and
              require that our Users do the same. The Digital Millennium
              Copyright Act (DMCA) established a process for addressing claims
              of copyright infringement. If you own a copyright or have
              authority to act on behalf of a copyright owner and want to report
              a claim that a third party is infringing that material on, please
              submit a DMCA report on our Contact page, and we will take
              appropriate action.
            </p>
            <p className="text-white text-lg font-semibold pt-5 pb-3">
              DMCA Report Requirements
            </p>

            <ul className="list-disc">
              <li className="text-gray-300 ml-4 mb-2">
                A description of the copyrighted work that you claim is being
                infringed;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                A description of the material you claim is infringing and that
                you want removed or access to which you want disabled and the
                URL or other location of that material;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                Your name, title (if acting as an agent), address, telephone
                number, and email address;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                The following statement:
                <i>
                  &quot;I have a good faith belief that the use of the
                  copyrighted material I am complaining of is not authorized by
                  the copyright owner, its agent, or the law (e.g., as a fair
                  use)&quot;
                </i>
                ;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                The following statement:
                <i>
                  &quot;The information in this notice is accurate and, under
                  penalty of perjury, I am the owner, or authorized to act on
                  behalf of the owner, of the copyright or of an exclusive right
                  that is allegedly infringed&quot;
                </i>
                ;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                An electronic or physical signature of the owner of the
                copyright or a person authorized to act on the owner&apos;s
                behalf.
              </li>
            </ul>
            <p>&nbsp;</p>
            <p className="text-gray-400 text-sm pb-2">
              Your DMCA take down request should be submit here:&nbsp;
              <Link href="/contact">https://aniflix.eu.org/contact</Link>
            </p>
            <p className="text-gray-400 text-sm">
              We will then review your DMCA request and take proper actions,
              including removal of the content from the website.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
