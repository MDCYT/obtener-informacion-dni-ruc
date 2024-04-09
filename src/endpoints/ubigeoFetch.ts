import {
	OpenAPIRoute,
	OpenAPIRouteSchema,
	Path,
} from "@cloudflare/itty-router-openapi";
import { Ubigeo, UbigeoInterface } from "../types";

export class UbigeoFetch extends OpenAPIRoute {
	static schema: OpenAPIRouteSchema = {
		tags: ["Ubigeo"],
		summary: "Get a info from a Ubigeo",
		parameters: {
			ubigeo: Path(String, {
				description: "The Ubigeo to fetch",
			}),
		},
		responses: {
			"200": {
				description: "Returns a ubigeo object",
				schema: {
					success: Boolean,
					result: {
						type: "object",
						properties: Ubigeo,
					},
				},
			},
			"404": {
				description: "Ubigeo not found",
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
		const { ubigeo } = data.params;

		if (!ubigeo || ubigeo.length !== 6) {
			return Response.json(
				{
					success: false,
					error: "Invalid Ubigeo",
				},
				{ status: 400 }
			);
		}

		const token = env.TOKEN;
		const formData = new FormData();
		formData.append('token', token);

		try {
			const response = await fetch(`https://api.apifacturacion.com/ubigeo/${ubigeo}`, {
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error('Error en la solicitud del API');
			}

			const data = await response.json() as UbigeoInterface;

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
