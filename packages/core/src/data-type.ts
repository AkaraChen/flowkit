export class KitDataType<Data extends Record<string, unknown>> {
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
