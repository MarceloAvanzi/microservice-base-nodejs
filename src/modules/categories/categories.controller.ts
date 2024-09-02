import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { CreateCategoryUseCase } from 'src/@core/application/use-cases/create-category/create-category.use-case';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ListCategoryUseCase } from 'src/@core/application/use-cases/list-category/list-category.use-case';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private createUseCase: CreateCategoryUseCase;

  @Inject(ListCategoryUseCase)
  private listUseCase: ListCategoryUseCase;

  @Get()
  list() {
    return this.listUseCase.execute();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto);
  }
}
