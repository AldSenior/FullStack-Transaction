import { Controller } from '@nestjs/common'
import { AppService } from './app.service'
// localhost:3001/api/
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}
}
