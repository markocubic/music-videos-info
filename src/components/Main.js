import { Outlet } from "react-router-dom";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Root from "components/Root/Root";

export default function Main() {
  return (
    <>
      <Header />
      <Root>
        <Outlet />
      </Root>
      <Footer />
    </>
  );
}
