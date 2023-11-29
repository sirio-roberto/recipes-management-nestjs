import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'json' })
  ingredients: string[] | string;

  @Column({ type: 'json' })
  directions: string[] | string;
}
