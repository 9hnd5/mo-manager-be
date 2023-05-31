import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryInput } from './dto/create-category.input';
import { FindCategoriesArgs } from './dto/find-categories.args';
import { FindCategoryArgs } from './dto/find-category.args';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  find(args: FindCategoriesArgs) {
    return this.categoryRepo.find({ where: { createdById: args.createdById } });
  }

  async findOne(args: FindCategoryArgs) {
    const a = await this.categoryRepo.findOne({ where: { ...args } });
    return this.categoryRepo.findOne({ where: { ...args } });
  }

  create(input: CreateCategoryInput) {
    return this.categoryRepo.save({
      name: input.name,
      createdById: input.createdById,
    });
  }

  async delete(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) return;

    await this.categoryRepo.remove(category);

    return { ...category, id };
  }
}
