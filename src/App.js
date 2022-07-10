import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import AppRoutes from "navigation/routes";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;