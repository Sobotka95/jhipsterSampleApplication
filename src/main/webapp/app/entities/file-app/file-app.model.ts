import { BaseEntity } from './../../shared';

export class FileApp implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public folders?: BaseEntity[],
    ) {
    }
}
