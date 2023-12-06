import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.recipe, { eager: false })
  @JoinColumn({ name: 'userId' })
  createdBy: User;

  @Column()
  @IsOptional()
  userId: number;

  @BeforeUpdate()
  updateDate() {
    this.date = new Date();
  }
}
