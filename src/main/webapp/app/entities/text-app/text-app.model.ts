import { BaseEntity } from './../../shared';

export class TextApp implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public content?: string,
    ) {
    }
}
