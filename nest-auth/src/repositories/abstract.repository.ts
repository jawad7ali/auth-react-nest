import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T> {
    constructor(protected readonly model: Model<T>) {}

    async findAll(filter = {}): Promise<T[]> {
        return this.model.find(filter).exec();
    }

    async findOne(filter = {}): Promise<T> {
        return this.model.findOne(filter).exec();
    }

    async create(item: T): Promise<T> {
        return this.model.create(item);
    }
    
    async update(id: string, item: T): Promise<T> {
        return this.model.findByIdAndUpdate(id, item, { new: true }).exec();
    }

    async delete(id: string): Promise<T> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
