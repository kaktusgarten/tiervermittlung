import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function MainLayout() {
  return (
    <>
      <div className="page flex flex-col min-h-screen">
        <Header></Header>

        <div className="container m-auto flex-1 mb-10 bg-base-100 md:px-8 px-3">
          <Outlet></Outlet>
        </div>

        <Footer></Footer>
      </div>
    </>
  );
}
