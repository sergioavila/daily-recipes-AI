import React from 'react';

interface DayProps {
  dayName: string;
  recipeName: string;
  recipeDescription?: string;
  ingredients?: string[];
  calories?: number;
}

export default function Day({ 
  dayName, 
  recipeName, 
  recipeDescription, 
  ingredients, 
  calories 
}: DayProps) {
  return (
    <div className="day">
      <div className="day-name">{dayName}</div>
      <div className="recipe">
        <div className="recipe-name">{recipeName}</div>
        {recipeDescription && (
          <div className="recipe-description">{recipeDescription}</div>
        )}
        {ingredients && ingredients.length > 0 && (
          <div className="recipe-ingredients">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient">{ingredient}</div>
            ))}
          </div>
        )}
        {calories && (
          <div className="recipe-calories">Calories: {calories}</div>
        )}
      </div>
    </div>
  );
} 