import { PostStatus } from "@src/common/enum/post-status.enum";
import { IsArray, IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class UpdatePostRequestDto {
  @IsNotEmpty({ message: '文章标题不能为空' })
  readonly title: string;

  @IsOptional()
  readonly desc?: string;

  @IsNotEmpty({ message: '文章别名不能为空' })
  readonly alias: string;

  @IsNotEmpty({ message: '文章内容不能为空' })
  readonly text: string;

  @IsIn(
    [
      PostStatus.DRAFTED,
      PostStatus.PUBLISHED
    ],
    { message: '文章状态不存在' },
  )
  @IsOptional()
  readonly status?: PostStatus;

  @IsArray()
  @IsOptional()
  readonly tagIds?: number[]
}