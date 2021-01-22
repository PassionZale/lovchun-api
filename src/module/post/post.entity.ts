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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('post')
export class PostEntity {
  @ApiProperty({ description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  // 标题
  @ApiProperty({ description: '标题' })
  @Column('varchar')
  title: string;

  // 描述
  @ApiPropertyOptional({ description: '描述' })
  @Column('varchar', { nullable: true })
  desc: string;

  // 别名，唯一索引
  @ApiProperty({ description: '别名' })
  @Index('UQ_post_alias', { unique: true })
  @Column('varchar')
  alias: string;

  // 正文
  @ApiProperty({ description: '正文' })
  @Column('text')
  text: string;

  // 状态
  @ApiProperty({
    description: '状态',
    enum: [PostStatus.DRAFTED, PostStatus.PUBLISHED],
    default: PostStatus.DRAFTED,
  })
  @Column('enum', {
    enum: [PostStatus.DRAFTED, PostStatus.PUBLISHED],
    default: PostStatus.DRAFTED,
  })
  status: PostStatus;

  // 创建时间
  @ApiProperty({ description: '创建时间' })
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DateValueTransformer(),
  })
  created_at: Date;

  // 更新时间
  @ApiProperty({ description: '更新时间' })
  @Column('datetime', {
    default: () => 'CURRENT_TIMESTAMP',
    transformer: new DateValueTransformer(),
  })
  updated_at: Date;

  // 发布时间
  @ApiProperty({ description: '发布时间' })
  @Column('datetime', {
    nullable: true,
    transformer: new DateValueTransformer(),
  })
  published_at: Date;

  @ApiProperty({ type: () => [TagEntity], description: '关联标签' })
  @ManyToMany(
    () => TagEntity,
    tag => tag.posts,
    { cascade: true },
  )
  @JoinTable()
  tags: TagEntity[];
}
