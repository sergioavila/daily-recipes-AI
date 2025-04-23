import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { IngredientsService } from '../ingredients/ingredients.service';
import { Ingredient } from '../ingredients/ingredient.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    private ingredientsService: IngredientsService,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipesRepository.find({ relations: ['ingredients'] });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }
    return recipe;
  }

  async create(recipe: Partial<Recipe>): Promise<Recipe> {
    const newRecipe = this.recipesRepository.create(recipe);
    return this.recipesRepository.save(newRecipe);
  }

  async update(id: number, recipe: Partial<Recipe>): Promise<Recipe> {
    await this.findOne(id); // This will throw if not found
    await this.recipesRepository.update(id, recipe);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // This will throw if not found
    await this.recipesRepository.delete(id);
  }

  async addIngredient(recipeId: number, ingredientId: number): Promise<Recipe> {
    const recipe = await this.findOne(recipeId);
    const ingredient = await this.ingredientsService.findOne(ingredientId);

    if (!recipe.ingredients) {
      recipe.ingredients = [];
    }

    recipe.ingredients.push(ingredient);
    return this.recipesRepository.save(recipe);
  }
}
