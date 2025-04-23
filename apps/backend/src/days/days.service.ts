import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Day } from './day.entity';
import { RecipesService } from '../recipes/recipes.service';

@Injectable()
export class DaysService {
  constructor(
    @InjectRepository(Day)
    private daysRepository: Repository<Day>,
    private recipesService: RecipesService,
  ) {}

  findAll(): Promise<Day[]> {
    return this.daysRepository.find({ relations: ['recipe'] });
  }

  async findOne(id: number): Promise<Day> {
    const day = await this.daysRepository.findOne({
      where: { id },
      relations: ['recipe'],
    });
    if (!day) {
      throw new NotFoundException(`Day with ID ${id} not found`);
    }
    return day;
  }

  async create(day: Partial<Day>): Promise<Day> {
    const newDay = this.daysRepository.create(day);
    return this.daysRepository.save(newDay);
  }

  async update(id: number, day: Partial<Day>): Promise<Day> {
    await this.findOne(id); // This will throw if not found
    await this.daysRepository.update(id, day);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // This will throw if not found
    await this.daysRepository.delete(id);
  }

  async assignRecipe(dayId: number, recipeId: number): Promise<Day> {
    const day = await this.findOne(dayId);
    const recipe = await this.recipesService.findOne(recipeId);
    day.recipe = recipe;
    return this.daysRepository.save(day);
  }
} 