import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <div className="page flex flex-col min-h-screen">
        <div className="py-4 sticky top-0 bg-[#1D3349] border-b z-100 -translate-y-2 shadow-[0_0_20px_#000] border-[#000]">
          <div className="container m-auto">
            <Header></Header>
          </div>
        </div>

        <div className="container m-auto flex-1 mb-10 bg-base-100 md:p-8 ">
          <Outlet></Outlet>
        </div>

        <Footer></Footer>
       
      </div>
    </>
  );
}
