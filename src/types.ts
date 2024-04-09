import { Str } from "@cloudflare/itty-router-openapi";

export const Ruc = {
	ruc: new Str({ example: "20123456789" }),
	razon_social: new Str({ example: "EMPRESA S.A.C." }),
	estado: new Str({ example: "ACTIVO" }),
	condicion: new Str({ example: "HABIDO" }),
	direccion: new Str({ example: "AV. LOREM IPSUM 123" }),
	ubigeo: new Str({ example: "150101" }),
	departamento: new Str({ example: "LIMA" , required: false }),
	provincia: new Str({ example: "LIMA" , required: false }),
	distrito: new Str({ example: "LIMA" , required: false }),
};

export interface RucInterface {
	ruc: string;
	razon_social: string;
	estado: "ACTIVO" | "SUSPENSION TEMPORAL" | "BAJA PROVISIONAL" | "BAJA DEFINITIVA" | "BAJA PROV. DE OFICIO" | "BAJA DEFINITIVA DE OFICIO";
	condicion: "HABIDO" | "NO HABIDO";
	direccion: string;
	ubigeo: string;
	departamento: string | null;
	provincia: string | null;
	distrito: string | null;
	token?: string;
}

/*
{"dni":"72310874","cliente":"JOSE ANTONIO ORTIZ FERNANDEZ","nombres":"JOSE ANTONIO","apellidos":"ORTIZ FERNANDEZ"}
*/

export const Dni = {
	dni: new Str({ example: "12345678" }),
	cliente: new Str({ example: "DINA ERCILIA BOLUARTE ZEGARRA" }),
	nombres: new Str({ example: "DINA ERCILIA" }),
	apellidos: new Str({ example: "BOLUARTE ZEGARRA" }),
};

export interface DniInterface {
	dni: string;
	cliente: string;
	nombres: string;
	apellidos: string;
}

export const Ubigeo = {
	departamento: new Str({ example: "LIMA" }),
	provincia: new Str({ example: "LIMA" }),
	distrito: new Str({ example: "JESÚS MARÍA" }),
	ubigeo: new Str({ example: "150113" }),
};

export interface UbigeoInterface {
	departamento: string;
	provincia: string;
	distrito: string;
	ubigeo: string;
}