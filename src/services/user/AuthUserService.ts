import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import prismaClient from "../../prisma";
import { AuthRequest } from "../../models/interfaces/user/auth/AuthRequest";

class AuthUserService {
	async execute({ email, password }: AuthRequest) {
		if (!email || email == "" || email == null) {
			throw new Error("Blanked user email");
		}
		if (!password || password == "" || password == null) {
			throw new Error("Blanked user password");
		}

		//Verificando se existe um usuário com o email passado
		const user = await prismaClient.user.findFirst({
			where: {
				email: email,
			},
		});
		if (!user) {
			throw new Error("Email not registered");
		}

		//Verificando se a senha do usuário está correta
		const passwordMatch = await compare(password, user?.password);
		if (!passwordMatch) {
			throw new Error("Wrong password");
		}

		const token = sign(
			{
				name: user?.name,
				email: user?.email,
			},
			process.env.JWT_SECRET as string,
			{
				subject: user?.id,
				expiresIn: "15d",
			},
		);
		return {
			id: user?.id,
			name: user?.name,
			email: user?.email,
			token: token,
		};
	}
}

export { AuthUserService };
