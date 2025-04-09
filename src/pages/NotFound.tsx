
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-16 flex flex-col items-center justify-center">
        <h1 className="text-5xl font-display text-primary mb-4">404</h1>
        <p className="text-xl text-white/80 mb-8">Oops! This page doesn't exist.</p>
        <Link 
          to="/" 
          className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Go back to swiping
        </Link>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
