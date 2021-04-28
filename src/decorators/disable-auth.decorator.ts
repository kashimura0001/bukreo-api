import { SetMetadata } from '@nestjs/common';

export const DisableAuth = () => SetMetadata('disableAuth', true);
