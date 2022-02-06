import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Forumpost } from './forumpost.entity';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Forumpost, (post) => post.hashtags)
  posts: Forumpost[];
}
