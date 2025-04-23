import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoutes(): string {
    return `
    - \`GET /days\` - Get all days with their assigned recipes<br>
    - \`GET /days/:id\` - Get a specific day with its assigned recipe<br>
    - \`POST /days\` - Create a new day<br>
    - \`PUT /days/:id\` - Update a day<br>
    - \`DELETE /days/:id\` - Delete a day<br>
    - \`POST /days/:dayId/recipe/:recipeId\` - Assign a recipe to a day<br>
    `;
  }
}
