import React from 'react';
import Day from './Day';

interface Recipe {
  name: string;
  description?: string;
  ingredients?: string[];
  calories?: number;
}

interface DayData {
  dayName: string;
  recipe: Recipe;
}

interface WeekProps {
  days: DayData[];
}

export default function Week({ days }: WeekProps) {
  return (
    <div className="days grid grid-cols-4">
      {days.map((day, index) => (
        <Day
          key={index}
          dayName={day.dayName}
          recipeName={day.recipe.name}
          recipeDescription={day.recipe.description}
          ingredients={day.recipe.ingredients}
          calories={day.recipe.calories}
        />
      ))}
    </div>
  );
} 