import { Injectable } from '@nestjs/common/decorators';
import { DataSource, Repository } from 'typeorm';
import { BusinessEntity } from './business.entity';

@Injectable()
export class BidRepository extends Repository<BusinessEntity> {
    constructor(dataSource: DataSource) {
        super(BusinessEntity, dataSource.createEntityManager())
    }
  
}