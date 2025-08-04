import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { LOCATION_INTERFACE_REPOSITORY, LOCATION_INTERFACE_SCHEMA_FACTORY } from './interface/locations.tokens';
import { LocationsRepository } from './db/location.repository';
import { LocationSchemaFactory } from './db/location.schema.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locations } from './db/location.entity';
import { LocationsProfile } from 'src/automapper/locations.profile';
import { LocationGateway } from './socket.getway';

@Module({
  controllers: [LocationController],
  providers: [LocationService,
    {
      provide: LOCATION_INTERFACE_REPOSITORY,
      useClass: LocationsRepository, // Assuming you have a LocationsRepository similar to TagsRepository
    },
    {
      provide: LOCATION_INTERFACE_SCHEMA_FACTORY,
      useClass: LocationSchemaFactory, // Assuming you have a LocationSchemaFactory similar to TagSchemaFactory
    },
    LocationsProfile,
    LocationGateway
  ],
  imports: [
    TypeOrmModule.forFeature([Locations]), // Register the Locations entity with TypeORM
  ]
})
export class LocationModule { }
