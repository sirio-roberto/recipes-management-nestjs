import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Recipe } from './entities/recipe.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
  ) {}

  async create(recipe: Recipe) {
    recipe = this.jsonStringfyArrayFields(recipe);

    const createdRecipe = await this.recipeRepo.save(recipe);
    return { id: createdRecipe.id };
  }

  jsonStringfyArrayFields(recipe: Recipe): Recipe {
    recipe.ingredients = JSON.stringify(recipe.ingredients as string[]);
    recipe.directions = JSON.stringify(recipe.directions as string[]);
    return recipe;
  }

  async findAll() {
    const recipes = await this.recipeRepo.find();
    return recipes.map((recipe) => this.jsonParseArrayFields(recipe));
  }

  async findOne(id: number) {
    try {
      let recipe: Recipe = await this.recipeRepo.findOneOrFail({
        where: {
          id,
        },
      });

      recipe = this.jsonParseArrayFields(recipe);

      return recipe;
    } catch {
      throw new NotFoundException('Recipe not found');
    }
  }

  jsonParseArrayFields(recipe: Recipe): Recipe {
    recipe.ingredients = JSON.parse(recipe.ingredients as string);
    recipe.directions = JSON.parse(recipe.directions as string);
    return recipe;
  }

  async update(id: number, recipe: Recipe) {
    await this.findOne(id);

    recipe = this.jsonStringfyArrayFields(recipe);
    recipe.date = new Date();

    this.recipeRepo.update(id, recipe);
  }

  async remove(id: number) {
    await this.findOne(id);
    this.recipeRepo.delete(id);
  }

  async findByCategoryOrName(props: any) {
    if (
      !props ||
      Object.keys(props).length !== 2 ||
      (!props.category && !props.name) ||
      (props.category && props.name)
    ) {
      throw new BadRequestException(
        'Please specify only category or name search parameter',
      );
    }

    let recipes: Recipe[] = [];
    if (props.category) {
      recipes = await this.recipeRepo.find({
        where: {
          category: ILike(`${props.category}`),
        },
        order: { date: 'DESC' },
      });
    } else {
      recipes = await this.recipeRepo.find({
        where: {
          name: ILike(`%${props.name}%`),
        },
        order: { date: 'DESC' },
      });
    }

    recipes.map(this.jsonParseArrayFields);
    return recipes;
  }
}
