
import { useLinesStore } from "../store/linesStore";
import SwipeCard from "../components/SwipeCard";
import LineOfTheDay from "../components/LineOfTheDay";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Index = () => {
  const { lines, currentLineIndex } = useLinesStore();
  const currentLine = lines[currentLineIndex];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-8 flex flex-col">
        <LineOfTheDay />
        
        <div className="flex-1 flex items-center justify-center py-8">
          {currentLine && <SwipeCard line={currentLine} />}
        </div>
        
        <div className="text-center mt-4 mb-8">
          <p className="text-white/80 text-sm">
            Swipe right to save, left to skip
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
