import { PartialType } from '@nestjs/swagger';
import { CreateForumpostDto } from './create-forumpost.dto';

export class UpdateForumpostDto extends PartialType(CreateForumpostDto) {}
