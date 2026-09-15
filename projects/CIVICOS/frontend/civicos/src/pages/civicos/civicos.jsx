import Header from "../../components/headers.jsx";
import MobileForm from "../../components/mobileForm.jsx";
import Footer from "../../components/footer.jsx";

import "./civicos.css";

const Civicos = () => {
  return (
    <div className="page">
      <Header />

      <main className="main-content">
        <MobileForm />
      </main>

      <Footer />
    </div>
  );
};

export default Civicos;