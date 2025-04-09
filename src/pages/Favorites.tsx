
import { useState } from "react";
import { useLinesStore } from "../store/linesStore";
import { Clipboard, Trash2, Share2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useLinesStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };
  
  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this pickup line from SwipeLines",
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    }
  };

  const handleDelete = (id: string) => {
    removeFromFavorites(id);
    toast.success("Removed from favorites");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-8">
        <h1 className="text-4xl font-display text-white mb-8 text-center">Your Favorites</h1>
        
        {favorites.length === 0 ? (
          <div className="text-center text-white/80 py-16">
            <p className="text-xl">No favorites yet!</p>
            <p className="mt-2">Swipe right on lines you like to save them here.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {favorites.map((line) => (
              <div 
                key={line.id}
                className="bg-white rounded-xl p-6 relative shadow-md hover:shadow-lg transition-shadow"
              >
                <p className="text-xl text-gray-800 leading-relaxed mb-4">{line.text}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCopy(line.text, line.id)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    <Clipboard className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleShare(line.text)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Share"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(line.id)}
                    className="p-2 rounded-md hover:bg-gray-100 transition-colors ml-auto"
                    aria-label="Delete"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                
                {copiedId === line.id && (
                  <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white py-1 px-2 rounded-md">
                    Copied!
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
