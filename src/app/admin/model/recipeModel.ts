export class RecipesModel{
    name?: string
    image?: string
    cuisine?: string
    ingredients?: Array<string>
    instructions?: Array<string>
    prepTimeMinutes?: number
    cookTimeMinutes?: number
    servings?: number
    difficulty?: string
    caloriesPerServing?: number
    mealType?: Array<string>
}

