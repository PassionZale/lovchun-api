import { IsNotEmpty } from 'class-validator';

export class CreateTagRequestDto {
  @IsNotEmpty({ message: '标签名称不能为空' })
  readonly name: string;
}
