import { Inject, Injectable } from '@nestjs/common';
import { LOCATION_INTERFACE_REPOSITORY } from './interface/locations.tokens';
import { LocationInterfaceRepository } from './interface/location.interface.repository';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { RedisService } from 'src/redis/redis.service';
import { RedisKey } from 'src/redis/enums/redis-key.enums';
import { LocationGateway } from './socket.getway';

@Injectable()
export class LocationService {
  constructor(
    @Inject(LOCATION_INTERFACE_REPOSITORY)
    private readonly locationRepository: LocationInterfaceRepository, // Replace 'any' with the actual type of your repository
    private readonly redisService: RedisService,
    private readonly eventsGateway: LocationGateway, // Inject the EventsGateway to emit events
  ) { }
  async create(createLocationDto: CreateLocationDto) {
    let createdLocation = await this.locationRepository.create(createLocationDto);
    let location = await this.locationRepository.findOne({
      where: { id: createdLocation.id }, relations: {
        tags: true, // Assuming you want to include tags in the response
      }
    });
    let server = this.eventsGateway.getServer();
    // Emit the new location event to all connected clients
    server.to('location').fetchSockets().then((sockets) => {
      sockets.forEach((socket) => {
        console.log(`Emitting new location to socket ${socket.id}`);

        socket.emit('newLocation', location);
      })
    });
    return location;
  }

  findAll() {
    return this.locationRepository.findAll({});
  }

  async findOne(id: number) {
    let cachedLocation = await this.redisService.get(RedisKey.LOCATION + id);
    if (cachedLocation) {
      return cachedLocation;
    }
    let location = await this.locationRepository.findOne({ where: { id } });
    await this.redisService.set(RedisKey.LOCATION + id, location);
    return location;
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    let location = await this.locationRepository.update(id, updateLocationDto as any);
    //delete the cache after update
    await this.redisService.del(RedisKey.LOCATION + id);
    return location;
  }

  async remove(id: number) {
    await this.locationRepository.softDelete({ where: { id } });
    //delete the cache after delete
    await this.redisService.del(RedisKey.LOCATION + id);
  }
}
