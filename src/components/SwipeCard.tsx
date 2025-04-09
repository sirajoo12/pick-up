
import { useState, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";
import { useLinesStore, PickupLine } from "../store/linesStore";
import { cn } from "../lib/utils";

interface SwipeCardProps {
  line: PickupLine;
}

const SwipeCard = ({ line }: SwipeCardProps) => {
  const { addToFavorites, nextLine, isFavorite } = useLinesStore();
  const [direction, setDirection] = useState<null | "left" | "right">(null);
  const [isFavorited, setIsFavorited] = useState(isFavorite(line.id));
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      // Swiped right - add to favorites
      handleSwipeRight();
    } else if (info.offset.x < -threshold) {
      // Swiped left - skip
      handleSwipeLeft();
    }
  };
  
  const handleSwipeRight = () => {
    setDirection("right");
    addToFavorites(line);
    setIsFavorited(true);
    setTimeout(() => {
      nextLine();
      setDirection(null);
    }, 500);
  };

  const handleSwipeLeft = () => {
    setDirection("left");
    setTimeout(() => {
      nextLine();
      setDirection(null);
    }, 500);
  };

  return (
    <div className="swipe-card-container">
      <motion.div
        ref={cardRef}
        className={cn(
          "swipe-card bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center",
          direction === "right" && "animate-swipe-right",
          direction === "left" && "animate-swipe-left",
          !direction && "animate-card-enter"
        )}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.9}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 1.05 }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <p className="text-2xl md:text-3xl font-sans text-gray-800 leading-relaxed">
            {line.text}
          </p>
          {isFavorited && (
            <div className="absolute top-4 right-4">
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </div>
          )}
        </div>
      </motion.div>
      
      <div className="flex justify-center mt-8 gap-8">
        <button 
          onClick={handleSwipeLeft}
          className="bg-secondary rounded-full p-4 text-white hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        <button 
          onClick={handleSwipeRight}
          className="bg-primary rounded-full p-4 text-white hover:bg-pink-600 transition-colors"
        >
          <ArrowRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default SwipeCard;
