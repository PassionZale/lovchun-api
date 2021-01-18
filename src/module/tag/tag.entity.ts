import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
} from 'typeorm';
import { DateValueTransformer } from '@src/database/database.transformer';
import { PostEntity } from '@src/module/post/post.entity';

@Entity('tag')
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 标签名，唯一索引
  @Index({ unique: true })
  @Column('varchar')
  name: string;

  // 创建时间
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DateValueTransformer(),
  })
  created_at: Date;

  // 更新时间
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DateValueTransformer(),
  })
  updated_at: Date;

  @ManyToMany(
    () => PostEntity,
    post => post.tags,
  )
  posts: PostEntity[];
}
