import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiException } from "@src/filter/api-exception.filter";
import { JwtAuthGuard } from "@src/guard/jwt-auth.guard";
import { CreatePostRequestDto } from "./dto/request/create-post.resquest.dto";
import { UpdatePostRequestDto } from "./dto/request/update-post.resquest.dto";
import { PostEntity } from "./post.entity";
import { PostService } from "./post.service";

@ApiTags('文章')
@ApiBearerAuth()
@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: '创建文章' })
  @ApiBody({ type: CreatePostRequestDto })
  @ApiOkResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Post('/v1/post')
  public async create(@Body() dto: CreatePostRequestDto): Promise<PostEntity> {
    const post = await this.postService.create(dto)

    return post
  }

  @ApiOperation({ summary: '删除文章' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiOkResponse({ type: Boolean, description: '操作成功返回 TRUE' })
  @UseGuards(JwtAuthGuard)
  @Delete('/v1/post/:id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    const result = await this.postService.delete(id)

    if(!result) {
      throw new ApiException()
    }

    return result
  }

  @ApiOperation({ summary: '修改文章' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiBody({ type: UpdatePostRequestDto })
  @ApiOkResponse({ type: Boolean, description: '操作成功返回 TRUE' })
  @UseGuards(JwtAuthGuard)
  @Put('/v1/post/:id')
  public async update(@Param('id') id: number, @Body() dto: UpdatePostRequestDto): Promise<boolean> {
    const result = await this.postService.update(id, dto)

    if(!result) {
      throw new ApiException()
    }

    return result
  }

  @ApiOperation({ summary: '查询文章' })
  @ApiParam({ name: 'id', description: 'ID' })
  @ApiOkResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  @Get('/v1/post/:id')
  public async findOne(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.postService.findOne(id)

    return post
  }

  @ApiOperation({ summary: '查询全部文章' })
  @ApiOkResponse({ type: [PostEntity] })
  @UseGuards(JwtAuthGuard)
  @Get('/v1/post')
  public async find(): Promise<PostEntity[]> {
    const posts = await this.postService.find()

    return posts
  }
}