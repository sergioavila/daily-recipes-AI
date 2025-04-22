import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredient.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientsRepository.find();
  }

  async findOne(id: number): Promise<Ingredient> {
    const ingredient = await this.ingredientsRepository.findOne({
      where: { id },
    });
    if (!ingredient) {
      throw new NotFoundException(`Ingredient with ID ${id} not found`);
    }
    return ingredient;
  }

  create(ingredient: Partial<Ingredient>): Promise<Ingredient> {
    return this.ingredientsRepository.save(ingredient);
  }

  async update(
    id: number,
    ingredient: Partial<Ingredient>,
  ): Promise<Ingredient> {
    await this.findOne(id); // This will throw if not found
    await this.ingredientsRepository.update(id, ingredient);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // This will throw if not found
    await this.ingredientsRepository.delete(id);
  }
}
