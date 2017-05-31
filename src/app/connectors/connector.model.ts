import {UUID} from "angular2-uuid";
import {StateConnector} from "../connectors/state.enum";
import {Observable} from "rxjs";

export interface Connector {
	id: UUID; // use by the database
	apiUrl: string;
	name: string; // Use by the user for get the value by the store
	interval: number;
	type: string;
	status: StateConnector;
	observable: Observable<any>;
}