import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { TagService } from '../tag/tag.service';
import { CreatePostRequestDto } from './dto/request/create-post.resquest.dto';
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

    let tags = [];

    if (tagIds.length) {
      tags = await this.tagService.findByIds(tagIds);
    }

    try {
      const post = await this.postRepository.save({ ...others, tags });

      return post;
    } catch (error) {
      // https://github.com/typeorm/typeorm/issues/3555#issuecomment-459857901
      Logger.debug(error)
    }


  }
}
