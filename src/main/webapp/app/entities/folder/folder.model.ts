import { BaseEntity } from './../../shared';

export class Folder implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public fileApp?: BaseEntity,
        public folder?: BaseEntity,
        public folders?: BaseEntity[],
        public files?: BaseEntity[],
    ) {
    }
}
