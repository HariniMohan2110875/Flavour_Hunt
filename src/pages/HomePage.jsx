import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, Sparkles } from "lucide-react";
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients } from '../services/api';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleIngredientsSubmit = async (ingredients) => {
    setLoading(true);
    setIsSearching(true);
    const results = await searchRecipesByIngredients(ingredients);
    setRecipes(results);
    setLoading(false);
  };

  return (
    <div className="min-h-screen ">
      {/* Background pattern */}
     

      {/* Hero Background with overlay */}
      <div 
        className="fixed inset-0 z-0 "
      />

      <div className="relative z-10">
        <div className="container px-6 mx-auto">
          <motion.div
            className="flex flex-col items-center"
            animate={{
              paddingTop: isSearching ? '2rem' : '15vh',
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >
            <AnimatePresence>
              {!isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col items-center mb-12 space-y-6 text-center"
                >
                  {/* Chef's Hat with Floating Sparkles */}
                  <div className="relative">
                    <ChefHat size={64} className="text-green-700" />

                    {/* Floating Sparkles (Magical Cooking Effect) */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: -10 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.5, // Stagger animation for different sparkles
                        }}
                        style={{
                          left: `${i * 12 - 10}px`, // Spread sparkles around the hat
                          top: `${-15 - i * 5}px`,
                        }}
                      >
                        <Sparkles size={16} className="text-orange-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-4 text-center">
                    <h1 className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text leading-tight">
                      Flavour Hunt
                    </h1>
                    <p className="text-lg text-black max-w-2xl mx-auto">
                      Unleash your culinary creativity with just the ingredients you have at home. 
                      Let us show you how easy it is to create something amazing with what’s in your kitchen!
                    </p>
                  </div>

                    {/* Features */}
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
  {/* Quick & Easy */}
  <span className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 rounded-full transform transition-all hover:animate-bounce">
    📝 Check
  </span>

  {/* Personalized Results */}
  <span className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-teal-600 rounded-full transform transition-all hover:animate-bounce">
    🎯 Hunt
  </span>

  {/* 380,000+ Recipes */}
  <span className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-800 rounded-full transform transition-all hover:animate-bounce">
    📖 Cook
  </span>
</div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* Ingredient Input */}
            <motion.div 
              layout
              className="w-full flex justify-center mb-8"
            >
              <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
            </motion.div>

            <AnimatePresence>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center w-full"
                >
                  <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                </motion.div>
              ) : (
                recipes.length > 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {recipes.map((recipe) => (
                      <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex justify-center"
                      >
                        <RecipeCard recipe={recipe} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="mt-8 text-white text-lg font-semibold">{isSearching && "No Recipe Found For Given Ingredients"}</div>
                )
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
