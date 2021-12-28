import { FaGripLinesVertical } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

export default function Terms() {
  return (
    <>
      <Header title={`Aniflix - Terms`} />
      <div className="min-h-screen relative">
        <Navbar page="terms" />
        <div className="pb-16">
          <div className="flex place-items-center m-7 mb-6 mt-6">
            <FaGripLinesVertical size={28} color="#0251E5" />
            <p style={{ fontSize: 20 }} className="text-white font-semibold">
              Aniflix Anime&apos;s Website Terms and Conditions of Use
            </p>
          </div>
          <div className="bg-gray-800 mx-9 rounded-md p-6 px-7 mb-10">
            <p className="text-white text-lg font-semibold mb-2">1. Terms</p>
            <p className="text-gray-400 text-sm leading-6">
              By accessing this Website, accessible from https://aniflix.eu.org,
              you are agreeing to be bound by these Website Terms and Conditions
              of Use and agree that you are responsible for the agreement with
              any applicable local laws. If you disagree with any of these
              terms, you are prohibited from accessing this site. The materials
              contained in this Website are protected by copyright and trade
              mark law.
            </p>
            <p className="text-white text-lg font-semibold mt-5 mb-2">
              2. Use License
            </p>
            <p className="text-gray-400 text-sm leading-6">
              Permission is granted to temporarily download one copy of the
              materials on Aniflix Anime&apos;s Website for personal,
              non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may
              not:
            </p>
            <ul className="list-disc mt-3 mb-4">
              <li className="text-gray-300 ml-4 mb-2">
                modify or copy the materials;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                use the materials for any commercial purpose or for any public
                display;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                attempt to reverse engineer any software contained on Aniflix
                Anime&apos;s Website;
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li className="text-gray-300 ml-4 mb-2">
                transferring the materials to another person or
                &quot;mirror&quot; the materials on any other server.
              </li>
            </ul>
            <p className="text-gray-400 text-sm leading-6">
              This will let Aniflix Anime to terminate upon violations of any of
              these restrictions. Upon termination, your viewing right will also
              be terminated and you should destroy any downloaded materials in
              your possession whether it is printed or electronic format.
            </p>
            <p className="text-white text-lg font-semibold mt-5 mb-2">
              3. Disclaimer
            </p>
            <p className="text-gray-400 text-sm leading-6">
              All the materials on Aniflix Anime’s Website are provided &quot;as
              is&quot;. Aniflix Anime makes no warranties, may it be expressed
              or implied, therefore negates all other warranties. Furthermore,
              Aniflix Anime does not make any representations concerning the
              accuracy or reliability of the use of the materials on its Website
              or otherwise relating to such materials or any sites linked to
              this Website.
            </p>
            <p className="text-white text-lg font-semibold mt-5 mb-2">
              4. Limitations
            </p>
            <p className="text-gray-400 text-sm leading-6">
              Aniflix Anime or its suppliers will not be hold accountable for
              any damages that will arise with the use or inability to use the
              materials on Aniflix Anime’s Website, even if Aniflix Anime or an
              authorize representative of this Website has been notified, orally
              or written, of the possibility of such damage. Some jurisdiction
              does not allow limitations on implied warranties or limitations of
              liability for incidental damages, these limitations may not apply
              to you.
            </p>
            <p className="text-white text-lg font-semibold mt-5 mb-2">
              5. Revisions and Errata
            </p>
            <p className="text-gray-400 text-sm leading-6">
              The materials appearing on Aniflix Anime’s Website may include
              technical, typographical, or photographic errors. Aniflix Anime
              will not promise that any of the materials in this Website are
              accurate, complete, or current. Aniflix Anime may change the
              materials contained on its Website at any time without notice.
              Aniflix Anime does not make any commitment to update the
              materials.
            </p>
            <p className="text-white text-lg font-semibold mt-5 mb-2">
              6. Links
            </p>
            <p className="text-gray-400 text-sm leading-6">
              Aniflix Anime has not reviewed all of the sites linked to its
              Website and is not responsible for the contents of any such linked
              site. The presence of any link does not imply endorsement by
              Aniflix Anime of the site. The use of any linked website is at the
              user’s own risk.
            </p>
            <p className="text-white text-lg font-semibold mt-5 mb-2">
              7. Site Terms of Use Modifications
            </p>
            <p className="text-gray-400 text-sm leading-6">
              Aniflix Anime may revise these Terms of Use for its Website at any
              time without prior notice. By using this Website, you are agreeing
              to be bound by the current version of these Terms and Conditions
              of Use.
            </p>
            <p className="text-white text-lg font-semibold mt-5 mb-2">
              8. Governing Law
            </p>
            <p className="text-gray-400 text-sm leading-6">
              Any claim related to Aniflix Anime&apos;s Website shall be
              governed by the laws of bq without regards to its conflict of law
              provisions.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
