import Header from "../components/headers.jsx";
import MobileForm from "../components/mobileForm.jsx";
import Footer from "../components/footer.jsx";


const App = () => {
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

export default App;

