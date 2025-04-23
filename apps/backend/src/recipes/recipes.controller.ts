import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.entity';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  findAll(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Recipe> {
    return this.recipesService.findOne(+id);
  }

  @Post()
  create(@Body() recipe: Partial<Recipe>): Promise<Recipe> {
    return this.recipesService.create(recipe);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() recipe: Partial<Recipe>,
  ): Promise<Recipe> {
    return this.recipesService.update(+id, recipe);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.recipesService.remove(+id);
  }

  @Post(':recipeId/ingredients/:ingredientId')
  addIngredient(
    @Param('recipeId') recipeId: string,
    @Param('ingredientId') ingredientId: string,
  ): Promise<Recipe> {
    return this.recipesService.addIngredient(+recipeId, +ingredientId);
  }
}
