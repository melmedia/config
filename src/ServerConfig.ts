import * as os from 'os';
import { injectable } from 'inversify';
import { Config } from './Config';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

@injectable()
export class ServerConfig extends Config {
  @IsNotEmpty()
  public host!: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1024)
  @Max(65536)
  public port!: number;

  @IsInt()
  @Min(2)
  @Max(os.cpus().length)
  public workers!: number;

  protected getName(): string {
    return 'server';
  }

  protected async validate() {
    super.validate();
    super.validateIpOrHostname(this.host, 'host');
  }

}
