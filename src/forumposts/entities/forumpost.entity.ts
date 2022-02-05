import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Forumpost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column()
  hashtags: string;
}
