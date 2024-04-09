import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { RucFetch } from "endpoints/rucFetch";
import { DniFetch } from "endpoints/dniFetch";
import { UbigeoFetch } from "endpoints/ubigeoFetch";

export const router = OpenAPIRouter({
	docs_url: "/",
});

router.get("/ruc/:ruc", RucFetch);
router.get("/dni/:dni", DniFetch);
router.get("/ubigeo/:ubigeo", UbigeoFetch);

// 404 for everything else
router.all("*", () =>
	Response.json(
		{
			success: false,
			error: "Route not found",
		},
		{ status: 404 }
	)
);

export default {
	fetch: router.handle,
};
