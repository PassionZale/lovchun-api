import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToMany,
} from 'typeorm';
import { DateValueTransformer } from '@src/database/database.transformer';
import { PostEntity } from '@src/module/post/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tag')
export class TagEntity {
  @ApiProperty({ description: 'ID' })
  @PrimaryGeneratedColumn()
  id: number;

  // 标签名，唯一索引
  @ApiProperty({ description: '标签名' })
  @Index({ unique: true })
  @Column('varchar')
  name: string;

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

  @ApiProperty({ type: () => [PostEntity], description: '关联文章' })
  @ManyToMany(
    () => PostEntity,
    post => post.tags,
  )
  posts: PostEntity[];
}
