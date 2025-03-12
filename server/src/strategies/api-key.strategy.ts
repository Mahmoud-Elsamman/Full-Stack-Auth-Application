import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private configService: ConfigService) {
    super(
      {
        header: 'X-API-KEY',
        prefix: '',
      },
      true,
      // @ts-ignore
      async (apiKey: string, done: (error: Error | null, data) => {}) => {
        return this.validate(apiKey, done);
      },
    );
  }

  public validate = async (
    apiKey: string,
    done: (error: Error | null, data) => {},
  ) => {
    try {
      const validApiKey = this.configService.get('API_KEY');

      if (apiKey === validApiKey) {
        done(null, true);
        return;
      }

      done(new UnauthorizedException('Invalid API key'), null);
    } catch (e) {
      done(new BadRequestException(e), null);
    }
  };
}
