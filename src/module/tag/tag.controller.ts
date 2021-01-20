import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '@src/filter/api-exception.filter';
import { JwtAuthGuard } from '@src/guard/jwt-auth.guard';
import { CreateTagRequestDto } from './dto/request/create-tag.request.dto';
import { UpdateTagRequestDto } from './dto/request/update-tag.request.dto';
import { TagEntity } from './tag.entity';
import { TagService } from './tag.service';

@ApiTags('标签')
@ApiBearerAuth()
@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOperation({ summary: '创建标签' })
  @ApiBody({ type: CreateTagRequestDto })
  @ApiOkResponse({ type: TagEntity })
  @UseGuards(JwtAuthGuard)
  @Post('/v1/tag')
  public async create(@Body() dto: CreateTagRequestDto): Promise<TagEntity> {
    const tag = await this.tagService.create(dto);

    return tag;
  }

  @ApiOperation({ summary: '删除标签' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiOkResponse({ type: Boolean, description: '操作成功返回 TRUE' })
  @UseGuards(JwtAuthGuard)
  @Delete('/v1/tag/:id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    const result = await this.tagService.delete(id);

    if (!result) {
      throw new ApiException();
    }

    return result;
  }

  @ApiOperation({ summary: '修改标签' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiBody({ type: UpdateTagRequestDto })
  @ApiOkResponse({ type: Boolean, description: '操作成功返回 TRUE' })
  @UseGuards(JwtAuthGuard)
  @Put('/v1/tag/:id')
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateTagRequestDto,
  ): Promise<boolean> {
    const result = await this.tagService.update(id, dto);

    if (!result) {
      throw new ApiException();
    }

    return result;
  }

  @ApiOperation({ summary: '查询标签' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiOkResponse({ type: TagEntity })
  @UseGuards(JwtAuthGuard)
  @Get('/v1/tag/:id')
  public async findOne(@Param('id') id: number): Promise<TagEntity> {
    const tag = await this.tagService.findOne(id);

    if(!tag) {
      throw new ApiException('标签不存在')
    }

    return tag;
  }

  @ApiOperation({ summary: '查询全部标签' })
  @ApiOkResponse({ type: [TagEntity] })
  @UseGuards(JwtAuthGuard)
  @Get('/v1/tag')
  public async find(): Promise<TagEntity[]> {
    const tags = await this.tagService.find();

    return tags;
  }
}
