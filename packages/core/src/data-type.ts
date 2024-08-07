export interface KitDataType<Data extends Record<string, unknown>> {
    name: string;
    data: Data;
}

export function defineKitDataType<Data extends Record<string, unknown>>(
    dataType: KitDataType<Data>,
) {
    return dataType;
}
