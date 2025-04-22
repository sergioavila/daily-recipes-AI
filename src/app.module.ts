import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { RecipesModule } from './recipes/recipes.module';
import { DaysModule } from './days/days.module';
import { Ingredient } from './ingredients/ingredient.entity';
import { Recipe } from './recipes/recipe.entity';
import { Day } from './days/day.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Ingredient, Recipe, Day],
      synchronize: true,
    }),
    IngredientsModule,
    RecipesModule,
    DaysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
