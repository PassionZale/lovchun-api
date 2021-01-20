import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTagRequestDto {
  @ApiProperty({ description: '标签名称' })
  @IsNotEmpty({ message: '标签名称不能为空' })
  readonly name: string;
}
