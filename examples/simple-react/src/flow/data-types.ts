import { KitDataType } from '@akrc/flowkit';

const number = new KitDataType<number>('number');
const string = new KitDataType<string>('string');
const image = new KitDataType<
    | {
          type: 'blob';
          data: ArrayBufferLike;
      }
    | {
          type: 'url';
          data: string;
      }
>('image');

export const dataTypes = {
    number,
    string,
    image,
};
