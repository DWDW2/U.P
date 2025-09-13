import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarDetectionController } from './controllers/car-detection.controller';
import { CarDetectionService } from './services/car-detection.service';

@Module({
  imports: [],
  controllers: [AppController, CarDetectionController],
  providers: [AppService, CarDetectionService],
})
export class AppModule { }
