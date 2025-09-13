import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarDetectionController } from './controllers/car-detection.controller';
import { CarDetectionService } from './services/car-detection.service';
import { CarDirtyCleanController } from './controllers/car-dirty-clean.controller';
import { CarDirtyCleanService } from './services/car-dirty-clean.service';

@Module({
  imports: [],
  controllers: [AppController, CarDetectionController, CarDirtyCleanController],
  providers: [AppService, CarDetectionService, CarDirtyCleanService],
})
export class AppModule { }
