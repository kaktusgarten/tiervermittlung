import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <div className="page flex flex-col min-h-screen bg-[#a0c2b5]">
        <div className="py-4 sticky top-0 bg-base-100 border-b z-100 -translate-y-2 shadow-[0_0_30px_#000] border-[#715bd6]">
          <div className="container m-auto">
            <Header></Header>
          </div>
        </div>

        <div className="container m-auto flex-1 my-4 border rounded-xl bg-base-100">
          <Outlet></Outlet>
        </div>

        <div className="bg-gray-900 py-4">
          <div className="container m-auto border">
            <Footer></Footer>
          </div>
        </div>
      </div>
    </>
  );
}
