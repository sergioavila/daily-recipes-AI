import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { DaysService } from './days.service';
import { Day } from './day.entity';

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) {}

  @Get()
  findAll(): Promise<Day[]> {
    return this.daysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Day> {
    return this.daysService.findOne(+id);
  }

  @Post()
  create(@Body() day: Partial<Day>): Promise<Day> {
    return this.daysService.create(day);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() day: Partial<Day>): Promise<Day> {
    return this.daysService.update(+id, day);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.daysService.remove(+id);
  }

  @Post(':dayId/recipe/:recipeId')
  assignRecipe(
    @Param('dayId') dayId: string,
    @Param('recipeId') recipeId: string,
  ): Promise<Day> {
    return this.daysService.assignRecipe(+dayId, +recipeId);
  }
}
