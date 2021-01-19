import { IsNotEmpty } from 'class-validator';

export class UpdateTagRequestDto {
  @IsNotEmpty({ message: '标签名称不能为空' })
  readonly name: string;
}
