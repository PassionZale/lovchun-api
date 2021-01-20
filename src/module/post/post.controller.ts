import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@src/guard/jwt-auth.guard";
import { CreatePostRequestDto } from "./dto/request/create-post.resquest.dto";
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
}