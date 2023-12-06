import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Column()
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.createdBy, { cascade: true })
  recipe: Recipe[];
}
