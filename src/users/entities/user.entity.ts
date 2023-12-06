import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
