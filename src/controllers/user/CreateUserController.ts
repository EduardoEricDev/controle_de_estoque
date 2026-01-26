import { Request, Response } from "express";
import { userRequest } from "../../models/interfaces/user/userRequest";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
	async handle(request: Request, response: Response) {
		const { name, email, password }: userRequest = request.body;
		const createUserService = new CreateUserService();
		const user = await createUserService.execute({ name, email, password });
        
        return response.json(user);
	}
}

export { CreateUserController };
