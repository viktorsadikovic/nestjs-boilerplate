import { IsInt } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Shape } from '../../../common/enums/shape.enum';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ type: 'enum', enum: Shape, default: Shape.CIRCLE })
  shape: Shape;

  @Column()
  @IsInt()
  quantity: number;
}
