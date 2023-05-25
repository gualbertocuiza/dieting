# Overview

### Problem Definition

Many individuals struggle to find recipes that align with their specific dietary needs and nutritional requirements.

### Solution

The proposed solution is to develop an application that allows users to easily find and create recipes with detailed nutrient information.

### Priorties

#### Must have

- Users must be able to create recipes that includes detailed nutrient information, including protein, carbohydrates, fats, calories, vitamins, and minerals.
- Users must be able to filter recipes based on their preferences and easily find suitable options.
- Users must be able to view the nutritional breakdown of the entire recipe and individual ingredients, enabling them to make informed choices based on their dietary goals.

#### Should have

- Users should have the ability to rate and leave comments on recipes they have tried.

#### Could have

- The application could allow users to customize their dietary preferences and set specific nutritional goals.
- The application could allow users to create collections of their favorite recipes and save them for future reference.

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
    User --> Comments
    Recipe --> Rating
    Recipe --> Comments
    Recipe --> Ingredient
    Recipe --> RecipeIngredient
    Ingredient --> RecipeIngredient
    User : +string id
    User : +string name
    User : +string email
    User : +password password
    class Recipe{
      +string id
      +string title
      +string description
      +string type
    }
    class Rating{
      +string id
      -int stars
    }
    class Comments{
      +string id
      +string comment
    }
    class Ingredient{
        +string name
        +float protein
        +float carbohydrates
        +float fats
        +float calories
    }
    class RecipeIngredient{
        string recipe_id
        string ingredient_id
    }
```
