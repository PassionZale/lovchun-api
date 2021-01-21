import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
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
  // @UseGuards(JwtAuthGuard)
  @Post('/v1/post')
  public async create(@Body() dto: CreatePostRequestDto): Promise<PostEntity> {
    const post = await this.postService.create(dto)

    return post
  }

  @Delete('/v1/post/:id')
  public async delete(@Param('id') id: number): Promise<boolean> {
    const result = await this.postService.delete(id)

    return result
  }

  @Put('/v1/post/:id')
  public async update(@Param('id') id: number, @Body() dto: UpdatePostRequestDto): Promise<boolean> {
    const result = await this.postService.update(id, dto)

    return result
  }

  @Get('/v1/post/:id')
  public async findOne(@Param('id') id: number): Promise<PostEntity> {
    const post = await this.postService.findOne(id)

    return post
  }

  @Get('/v1/post')
  public async find(): Promise<PostEntity[]> {
    const posts = await this.postService.find()

    return posts
  }
}