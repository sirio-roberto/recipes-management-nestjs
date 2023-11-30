import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './entities/recipe.entity';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post('new')
  create(@Body() recipe: Recipe) {
    return this.recipesService.create(recipe);
  }

  @Get()
  findAll() {
    return this.recipesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.recipesService.findOne(id);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  update(@Param('id', new ParseIntPipe()) id: number, @Body() recipe: Recipe) {
    return this.recipesService.update(id, recipe);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.recipesService.remove(id);
  }
}
