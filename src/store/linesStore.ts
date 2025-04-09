
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { pickupLines } from '../data/pickupLines';

export interface PickupLine {
  id: string;
  text: string;
  category?: string;
}

interface LinesState {
  lines: PickupLine[];
  currentLineIndex: number;
  favorites: PickupLine[];
  lineOfTheDay: PickupLine | null;
  seenLineIds: string[];
  
  // Actions
  addToFavorites: (line: PickupLine) => void;
  removeFromFavorites: (id: string) => void;
  nextLine: () => void;
  resetLines: () => void;
  setLineOfTheDay: () => void;
  isFavorite: (id: string) => boolean;
}

export const useLinesStore = create<LinesState>()(
  persist(
    (set, get) => {
      // Check if it's a new day for Line of the Day
      const lastUpdated = localStorage.getItem('lineOfTheDayLastUpdated');
      const today = new Date().toDateString();
      const needsNewLineOfTheDay = !lastUpdated || lastUpdated !== today;

      return {
        lines: [...pickupLines].sort(() => Math.random() - 0.5),
        currentLineIndex: 0,
        favorites: [],
        lineOfTheDay: null,
        seenLineIds: [],

        addToFavorites: (line) => {
          const isFavorited = get().favorites.some((fav) => fav.id === line.id);
          if (!isFavorited) {
            set((state) => ({
              favorites: [...state.favorites, line],
            }));
          }
        },

        removeFromFavorites: (id) => {
          set((state) => ({
            favorites: state.favorites.filter((line) => line.id !== id),
          }));
        },

        nextLine: () => {
          const currentIndex = get().currentLineIndex;
          const lines = get().lines;
          
          // Add current line to seen lines
          const currentLine = lines[currentIndex];
          if (currentLine) {
            set((state) => ({
              seenLineIds: [...state.seenLineIds, currentLine.id]
            }));
          }
          
          // Move to next line
          if (currentIndex < lines.length - 1) {
            set((state) => ({ currentLineIndex: state.currentLineIndex + 1 }));
          } else {
            // If we've gone through all lines, shuffle and start over
            set({
              lines: [...pickupLines].sort(() => Math.random() - 0.5),
              currentLineIndex: 0,
            });
          }
        },

        resetLines: () => {
          set({
            lines: [...pickupLines].sort(() => Math.random() - 0.5),
            currentLineIndex: 0,
            seenLineIds: [],
          });
        },

        setLineOfTheDay: () => {
          const randomIndex = Math.floor(Math.random() * pickupLines.length);
          const selected = pickupLines[randomIndex];
          set({ lineOfTheDay: selected });
          localStorage.setItem('lineOfTheDayLastUpdated', new Date().toDateString());
        },

        isFavorite: (id) => {
          return get().favorites.some((line) => line.id === id);
        },
      };
    },
    {
      name: 'swipe-lines-storage',
      partialize: (state) => ({ favorites: state.favorites }),
      onRehydrateStorage: () => (state) => {
        // Set line of the day if needed
        const lastUpdated = localStorage.getItem('lineOfTheDayLastUpdated');
        const today = new Date().toDateString();
        if (!lastUpdated || lastUpdated !== today) {
          if (state) {
            state.setLineOfTheDay();
          }
        }
      },
    }
  )
);

// Initialize line of the day
const lastUpdated = localStorage.getItem('lineOfTheDayLastUpdated');
const today = new Date().toDateString();
if (!lastUpdated || lastUpdated !== today) {
  useLinesStore.getState().setLineOfTheDay();
}
