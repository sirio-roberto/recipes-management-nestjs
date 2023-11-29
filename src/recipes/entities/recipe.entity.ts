import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @Column({ type: 'json' })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  ingredients: string[] | string;

  @Column({ type: 'json' })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  directions: string[] | string;
}
