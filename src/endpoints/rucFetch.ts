import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
	Header,
} from "@cloudflare/itty-router-openapi";
import { Ruc, RucInterface } from "../types";
import { verifyToken } from "utils/token";

export class RucFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Ruc"],
		summary: "Get a info from a RUC",
		parameters: {
			ruc: Path(String, {
				description: "The RUC to fetch",
			}),
			token: Header(String, {
				description: "The token to use the API",
			}),
		},
		responses: {
			"200": {
				description: "Returns a ruc object",
				schema: {
					success: Boolean,
					result: {
						type: "object",
						properties: Ruc,
					},
				},
			},
			"404": {
				description: "Ruc not found",
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

		// Retrieve the validated slug
		const { ruc } = data.params;

		if (!ruc || ruc.length !== 11) {
			return Response.json(
				{
					success: false,
					error: "Invalid RUC",
				},
				{ status: 400 }
			);
		}

		const formData = new FormData();
		formData.append('token', env.TOKEN);

		try {
			const response = await fetch(`https://api.apifacturacion.com/ruc/${ruc}`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Error en la solicitud del API');
			}

			const data = await response.json() as RucInterface;
			delete data.token;

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
