export class KitDataType<Data> {
    // will be used in the future, for the computing flow feature
    define(data: Data): {
        type: string;
        data: Data;
    } {
        return {
            type: this.name,
            data,
        };
    }

    constructor(public name: string) {}
}
