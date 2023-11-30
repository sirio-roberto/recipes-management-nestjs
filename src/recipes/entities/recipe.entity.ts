import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  category: string;

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

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  @IsDate()
  @IsOptional()
  date?: Date;

  @BeforeUpdate()
  updateDate() {
    this.date = new Date();
  }
}
