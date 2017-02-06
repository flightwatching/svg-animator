import { Injectable, Inject } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class GridConfigService {

    constructor(private http: Http) { }

    getConfigs() {
        return this.http.get(`${environment.config.API_BASE_URL}/grid-config`)
            .map(res => res.json());
    }

    getConfig(gridConfigName: String) {
        return this.http.get(`${environment.config.API_BASE_URL}/grid-config/${gridConfigName}`)
            .map(res => res.json());
    }

    saveConfig(gridConfig: any) {
        return this.http.post(`${environment.config.API_BASE_URL}/grid-config/${gridConfig.name}`, gridConfig.content)
            .map(res => res.json());
    }
}
