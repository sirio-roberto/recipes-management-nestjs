import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';
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
        select: {
          name: true,
          description: true,
          ingredients: true,
          directions: true,
        },
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

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${updateRecipeDto.id} recipe`;
  }

  async remove(id: number) {
    await this.findOne(id);
    this.recipeRepo.delete(id);
  }
}
