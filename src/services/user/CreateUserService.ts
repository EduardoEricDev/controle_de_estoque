import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { userRequest } from "../../models/interfaces/user/userRequest";

class CreateUserService {
	async execute({ name, email, password }: userRequest) {
		if (!name || name == "" || name == null) {
			throw new Error("Blanket user name");
		}

		if (!email || email == "" || email == null) {
			throw new Error("Blanket user email");
		}

		const userAlreadyExists = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});
		if (userAlreadyExists) {
			throw new Error("User email already registered");
		}

		if (!password || password == "" || password == null) {
			throw new Error("Blanket user password");
		}

		//Encriptando a senha do usuário
		const passwordHash = await hash(password, 8);

		//Criando usuário
		const user = prismaClient.user.create({
			data: {
				name: name,
				email: email,
				password: passwordHash,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});

        return user;
	}
}

export { CreateUserService };
