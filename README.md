# Overview

### Problem Definition

Many individuals struggle to find recipes that align with their specific dietary needs and nutritional requirements.

### Solution

The proposed solution is to develop an application that allows users to easily find and create recipes with detailed nutrient information.

### Priorties

#### Must have

- Users must be able to create recipes that includes detailed nutrient information, including protein, carbohydrates, fats and calories.
- Users must be able to filter recipes based on their preferences and easily find suitable options.
- Users must be able to view the nutritional breakdown of the entire recipe and individual ingredients.

#### Should have

- Users should have the ability to rate and leave comments on recipes they have tried.

#### Could have

- The application could allow users to customize their dietary preferences and set specific nutritional goals.
- The application could allow users to create collections of their favorite recipes and save them for future reference.

#### Will not have

-

#### Domain Model Diagram

```mermaid
flowchart TD
    A[User] -->|creates| B(Recipes)
    A[User] -->|searches| B(Recipes)
    B --> |has| C(ratings/comments)
```

#### Entity Relationship Diagram

```mermaid
classDiagram
    User --> Recipe
    User --> Rating
    User --> Comment
    Recipe --> Rating
    Recipe --> Comment
    Recipe --> RecipeIngredient
    Ingredient --> RecipeIngredient
    User : int id
    User : string first_name
    User : string last_name
    User : string email
    User : password password
    class Type{
      int id
      string title
    }
    class Recipe{
      int id
      string title
      string description
      datetime created_at
      int type_id
      string user_id
    }
    class Rating{
      int id
      int stars
      datetime created_at
      string recipe_id
      string user_id
    }
    class Comment{
      int id
      string comment
      datetime created_at
      string recipe_id
      string user_id
    }
    class Ingredient{
        int id
        string name
        float protein
        float carbohydrates
        float fats
        float calories
    }
    class RecipeIngredient{
        int id
        string recipe_id
        string ingredient_id
    }
```
