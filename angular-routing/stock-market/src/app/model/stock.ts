export class Stock {
    constructor(
        public name: string,
        public code: string,
        public price: number,
        public previousPrice: number,
        public exchange: string,
        public favorite: boolean = false
        ) {}
}
