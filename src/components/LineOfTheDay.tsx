
import { Share2 } from "lucide-react";
import { useLinesStore } from "../store/linesStore";
import { toast } from "sonner";

const LineOfTheDay = () => {
  const { lineOfTheDay, addToFavorites } = useLinesStore();

  if (!lineOfTheDay) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "SwipeLines - Line of the Day",
        text: lineOfTheDay.text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(lineOfTheDay.text);
      toast.success("Copied to clipboard!");
    }
  };

  const handleSave = () => {
    addToFavorites(lineOfTheDay);
    toast.success("Added to favorites!");
  };

  return (
    <section className="container py-8 px-4">
      <div className="bg-gradient-to-r from-primary/80 to-primary rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl mb-2 font-display text-white tracking-wide">Line of the Day</h2>
        <p className="text-xl mb-4 text-white font-medium">
          "{lineOfTheDay.text}"
        </p>
        <div className="flex space-x-4">
          <button 
            onClick={handleShare}
            className="bg-white text-primary font-medium px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button 
            onClick={handleSave}
            className="bg-secondary text-white font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default LineOfTheDay;
