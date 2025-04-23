import Link from "next/link";
import Week from "@/components/Week";

const sampleWeekData = [
  {
    dayName: "Monday",
    recipe: {
      name: "Recipe Name",
      description: "Recipe Description",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      calories: 100
    }
  },
  {
    dayName: "Tuesday",
    recipe: {
      name: "Recipe Name",
      description: "Recipe Description",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      calories: 100
    }
  },
  {
    dayName: "Wednesday",
    recipe: {
      name: "Recipe Name"
    }
  },
  {
    dayName: "Thursday",
    recipe: {
      name: "Recipe Name"
    }
  },
  {
    dayName: "Friday",
    recipe: {
      name: "Recipe Name"
    }
  },
  {
    dayName: "Saturday",
    recipe: {
      name: "Recipe Name"
    }
  },
  {
    dayName: "Sunday",
    recipe: {
      name: "Recipe Name"
    }
  }
];

export default function Home() {
  return (
    <div className="">
      <nav>
        <Link href="/">Week</Link>
        <Link href="/food">Food</Link>
        <Link href="/month">Month</Link>
      </nav>
      <Week days={sampleWeekData} />
    </div>
  );
}
