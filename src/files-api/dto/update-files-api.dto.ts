import { PartialType } from '@nestjs/mapped-types';
import { CreateFilesApiDto } from './create-files-api.dto';

export class UpdateFilesApiDto extends PartialType(CreateFilesApiDto) {}
