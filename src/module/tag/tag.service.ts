import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTagRequestDto } from './dto/request/create-tag.request.dto';
import { UpdateTagRequestDto } from './dto/request/update-tag.request.dto';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {}

  public async save(dto: CreateTagRequestDto): Promise<TagEntity> {
    const tag = await this.tagRepository.save(dto);

    return tag;
  }

  public async delete(id: number): Promise<boolean> {
    const result:DeleteResult = await this.tagRepository.delete(id)

    return !!result.affected
  }

  public async update(id: number, dto: UpdateTagRequestDto): Promise<boolean> {
    const result:UpdateResult = await this.tagRepository.update(id, dto)

    return !!result.affected
  }

  public async findOne(id: number): Promise<TagEntity> {
    const tag = await this.tagRepository.findOne(id)

    return tag
  }

  public async find(): Promise<TagEntity[]> {
    const tags = await this.tagRepository.find()

    return tags
  }
}
