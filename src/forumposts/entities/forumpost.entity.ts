import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hashtag } from './hashtag.entity';

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

  @ManyToMany(() => Hashtag, (hashtag) => hashtag.posts, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  hashtags: Hashtag[];

  @Column({ type: 'timestamptz' })
  creationTimestamp: Date;

  @Column({ type: 'timestamptz', nullable: true })
  editTimestamp: Date;
}
