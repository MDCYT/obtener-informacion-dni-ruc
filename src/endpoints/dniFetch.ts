import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
	Header
} from "@cloudflare/itty-router-openapi";
import { Dni, DniInterface } from "../types";
import { verifyToken } from "../utils/token";

export class DniFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Dni"],
		summary: "Get a info from a DNI",
		parameters: {
			dni: Path(String, {
				description: "The DNI to fetch",
			}),
			token: Header(String, {
				description: "The token to use the API",
			}),
		},
		responses: {
			"200": {
				description: "Returns a dni object",
				schema: {
					success: Boolean,
					result: {
						type: "object",
						properties: Dni,
					},
				},
			},
			"404": {
				description: "Dni not found",
				schema: {
					success: Boolean,
					error: String,
				},
			},
			"403": {
				description: "Forbidden",
				schema: {
					success: Boolean,
					error: String,
				},
			},
		},
	};

	async handle(
		request: Request,
		env: any,
		context: any,
		data: Record<string, any>
	) {
		// Retrieve the validated slug
		const { dni } = data.params;

		const { token } = data.headers;

		if (!token && await verifyToken(token)) {
			return Response.json(
				{
					success: false,
					error: "Invalid token",
				},
				{ status: 403 }
			);
		}

		if (!dni || dni.length !== 8) {
			return Response.json(
				{
					success: false,
					error: "Invalid DNI",
				},
				{ status: 400 }
			);
		}

		const formData = new FormData();
		formData.append('token', env.TOKEN);

		try {
			const response = await fetch(`https://api.apifacturacion.com/dni/${dni}`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Error en la solicitud del API');
			}

			const data = await response.json() as DniInterface;

			return Response.json({
				success: true,
				result: data,
			});
		} catch (error) {
			return Response.json({
				success: false,
				error: error.message,
			}, { status: 500 });
		}
	}
}
