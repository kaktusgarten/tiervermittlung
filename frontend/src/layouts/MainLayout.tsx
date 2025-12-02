import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../context";
import MainImageHomePage from "../components/MainImageHomePage";

export default function MainLayout() {
  return (
    <>
      <AuthProvider>
        <div className="page flex flex-col min-h-screen">
          {/* HEADER Image ############################################ */}
          {/* <section className="mb-10">
            <MainImageHomePage
              image="./img/mood-bild-1.png"
              headline="Die Tierglück Vermittlung"
              textColor="white"
              text="Finde ein neues Zuhause für dein Tier - Wir helfen!"
            />
          </section> */}
          <Header></Header>

          <div className="container m-auto flex-1 mb-10 md:px-8 px-3 pt-8">
            <Outlet></Outlet>
          </div>

          <Footer></Footer>
        </div>
      </AuthProvider>
    </>
  );
}
