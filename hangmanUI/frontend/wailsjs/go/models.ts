export namespace game {
	
	export class State {
	    mask: string;
	    misses: number;
	    maxMisses: number;
	    won: boolean;
	    lost: boolean;
	    guessed: string;
	
	    static createFrom(source: any = {}) {
	        return new State(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.mask = source["mask"];
	        this.misses = source["misses"];
	        this.maxMisses = source["maxMisses"];
	        this.won = source["won"];
	        this.lost = source["lost"];
	        this.guessed = source["guessed"];
	    }
	}

}

