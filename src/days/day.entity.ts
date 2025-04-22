import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Recipe } from '../recipes/recipe.entity';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  dayOfWeek: string;

  @ManyToOne(() => Recipe)
  recipe: Recipe;
}
