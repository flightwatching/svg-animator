import {UUID} from "angular2-uuid";
export interface Connector {
	id: UUID;
	apiUrl: string;
	index: string;
	interval: number;
	type: string;
}