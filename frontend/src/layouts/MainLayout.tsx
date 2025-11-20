import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <div className="page flex flex-col min-h-screen">
        <div className="py-4 sticky top-0 bg-white border-b shadow-xl z-100">
          <div className="container m-auto">
            <Header></Header>
          </div>
        </div>

        <div className="container m-auto flex-1 my-4 border">
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
