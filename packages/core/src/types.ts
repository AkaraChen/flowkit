export interface DataType {
    label: string;
    name: string;
}

export interface KitNodeTypeBase<Data> {
    name: string;
    defaultData: () => Data;
}
