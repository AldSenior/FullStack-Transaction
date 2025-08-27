import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { AuthorGuard } from 'src/guard/author.guard'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { TransactionService } from './transaction.service'

@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
		return this.transactionService.create(
			createTransactionDto,
			+req.user.id,
		)
	}

	@Get(':type/find')
	@UseGuards(JwtAuthGuard)
	findAllByType(@Req() req, @Param('type') type: string) {
		return this.transactionService.findAllByType(+req.user.id, type)
	}
	//url/transaction/pagination?page=1&limit=3
	@Get('pagination')
	@UseGuards(JwtAuthGuard)
	findAllWithPagination(
		@Req() req,
		@Query('page') page: number = 1,
		@Query('limit') limit: number = 3,
	) {
		return this.transactionService.findAllWithPagination(
			+req.user.id,
			+page,
			+limit,
		)
	}
	@Get()
	@UseGuards(JwtAuthGuard)
	findAll(@Req() req) {
		return this.transactionService.findAll(+req.user.id)
	}

	// url/transactions/transaction/1
	@Get(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	findOne(@Param('id') id: string) {
		return this.transactionService.findOne(+id)
	}

	@Patch(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	update(
		@Param('id') id: string,
		@Body() updateTransactionDto: UpdateTransactionDto,
	) {
		return this.transactionService.update(+id, updateTransactionDto)
	}

	@Delete(':type/:id')
	@UseGuards(JwtAuthGuard, AuthorGuard)
	remove(@Param('id') id: string) {
		return this.transactionService.remove(+id)
	}
}
