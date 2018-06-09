import { BaseEntity } from './../../shared';

export class News implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public content?: string,
    ) {
    }
}
