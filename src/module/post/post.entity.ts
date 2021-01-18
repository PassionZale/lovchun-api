import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DateValueTransformer } from '@src/database/database.transformer';
import { PostStatus } from '@src/common/enum/post-status.enum';
import { TagEntity } from '@src/module/tag/tag.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 标题
  @Column('varchar')
  title: string;

  // 描述
  @Column('varchar', { nullable: true })
  desc: string;

  // 别名，唯一索引
  @Index({ unique: true })
  @Column('varchar')
  alias: string;

  // 正文
  @Column('text')
  text: string;

  // 状态
  @Column('enum', {
    enum: [PostStatus.DRAFTED, PostStatus.PUBLISHED],
    default: PostStatus.DRAFTED,
  })
  status: PostStatus;

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

  // 发布时间
  @Column('datetime', {
    nullable: true,
    transformer: new DateValueTransformer(),
  })
  published_at: Date;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags: TagEntity[];
}
