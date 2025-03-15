import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container" style={{ marginTop: "5rem" }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
