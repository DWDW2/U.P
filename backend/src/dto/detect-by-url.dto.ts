import { IsString, IsUrl } from 'class-validator';

export class DetectByUrlDto {
    @IsString()
    @IsUrl()
    imageUrl: string;
}
