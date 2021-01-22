import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PostStatus } from '@src/common/enum/post-status.enum';
import { IsArray, IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePostRequestDto {
  @ApiProperty({ description: '标题' })
  @IsNotEmpty({ message: '文章标题不能为空' })
  readonly title: string;

  @ApiPropertyOptional({ description: '描述' })
  @IsOptional()
  readonly desc?: string;

  @ApiProperty({ description: '别名' })
  @IsNotEmpty({ message: '文章别名不能为空' })
  readonly alias: string;

  @ApiPropertyOptional({ description: '内容' })
  @IsNotEmpty({ message: '文章内容不能为空' })
  readonly text: string;

  @ApiPropertyOptional({
    description: '状态',
    enum: [PostStatus.DRAFTED, PostStatus.PUBLISHED],
    default: PostStatus.DRAFTED,
  })
  @IsIn([PostStatus.DRAFTED, PostStatus.PUBLISHED], {
    message: '文章状态不存在',
  })
  @IsOptional()
  readonly status?: PostStatus;

  @ApiPropertyOptional({ description: '标签 ID 集合', type: [Number] })
  @IsArray()
  @IsOptional()
  readonly tagIds?: number[];
}
