import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from '@src/filter/api-exception.filter';
import { DeleteResult, QueryFailedError, Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { CreatePostRequestDto } from './dto/request/create-post.resquest.dto';
import { UpdatePostRequestDto } from './dto/request/update-post.resquest.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly tagService: TagService,
  ) {}

  public async create(dto: CreatePostRequestDto): Promise<PostEntity> {
    const { tagIds = [], ...others } = dto;
    const { alias } = others;

    const isPostAliasExit = await this.postRepository.findOne({
      where: { alias },
    });

    if (isPostAliasExit) throw new ApiException('文章别名已存在');

    let tags = [];

    if (tagIds.length) {
      tags = await this.tagService.findByIds(tagIds);
    }

    const post = await this.postRepository.save({ ...others, tags });

    return post;
  }

  public async delete(id: number): Promise<boolean> {
    const result: DeleteResult = await this.postRepository.delete(id);

    return !!result.affected;
  }

  public async update(id: number, dto: UpdatePostRequestDto): Promise<boolean> {
    const { tagIds = [], ...others } = dto;
    const { alias } = others;

    const post = await this.postRepository.findOneOrFail(id)

    const isPostAliasExit = await this.postRepository.findOne({
      where: { alias },
    });

    if (isPostAliasExit && post.alias !== alias) throw new ApiException('文章别名已存在');

    let tags = [];

    if (tagIds.length) {
      tags = await this.tagService.findByIds(tagIds);
    }

    const result = await this.postRepository.save({...post, ...others, tags });

    return !!result;
  }

  public async findOne(id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne(id, { relations: ["tags"] })

    return post
  }

  public async find(): Promise<PostEntity[]> {
    const posts = await this.postRepository.find({ relations: ["tags"] })

    return posts
  }
}
