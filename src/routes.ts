import { Router, Request, Response } from "express";

const router = Router();

// Rota para testar as rotas estão funcionando
// router.get("/test", (request: Request, response: Response) => {
// 	return response.json({ ok: true });
// });

// Rota para testar o middleware de erro
// router.get('/test-error', async (req, res) => {
//   // Simulando um erro que aconteceria, por exemplo, se um produto não fosse encontrado
//   throw new Error("Este é um erro de teste capturado pelo middleware!");
// });

export { router };
