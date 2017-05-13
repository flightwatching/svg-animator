import { Injectable } from '@angular/core';

declare global {
    interface Window {
        store: Map<string, Object>
    }
}

@Injectable()
export class StoreService {
    
    constructor() {
        this.createTheStore();
    }
    
    /**
     * Set new value in the store with the index past
     * @param index
     */
    public putDataInStore(index: string, data: Object | Array<Object>) {
        let dataToStore = data || {};
        
        // A little security but normaly it's not necessary because the formular block
        // the creation of an empty index or index different of a string
        if((typeof index === 'string' || index instanceof String)) {
            window.store.set(index, dataToStore);
        }
    }
    
    /**
     * Use only for debug or monitoring. The user will automatically
     * past through to the global variable window.store
     * @param token the key to access an element to the store
     * @returns Object
     */
    public retrieveDataFromStore(index: string): Object {
        return (window.store[index]) ? window.store[index] : {};
    }
    
    private createTheStore(): void {
        if(window.store) {
            //Erase the previous values in the store
            window.store = null;
        }
        
        window.store = new Map();
    }
}