import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { FindCategoriesArgs } from './dto/find-categories.args';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from 'src/entities/category.entity';

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query((returns) => [Category])
  categories(@Args() args: FindCategoriesArgs) {
    return this.categoryService.find(args);
  }

  @Mutation((returns) => Category)
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Mutation((returns) => Category)
  deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.delete(id);
  }
}
