import { BaseEntity } from './../../shared';

export class File implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public ext?: string,
        public folder?: BaseEntity,
    ) {
    }
}
