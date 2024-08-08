import { KitDataType } from '@akrc/flowkit';

const number = new KitDataType<{
    value: number;
}>('number');

const string = new KitDataType<{
    value: string;
}>('string');

export const dataTypes = {
    number,
    string,
};
