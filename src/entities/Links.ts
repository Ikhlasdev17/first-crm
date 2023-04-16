import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm'
import { User } from './User'

@Entity('link', {
	orderBy: {
		id: 'ASC',
	},
})
export class Link extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string

	@Column()
	name: string

	@Column()
	price: number

	@Column({
		default: 0,
	})
	price_for_single: number

	@Column({
		default: 0,
	})
	clicked: number

	@Column({
		default: 'bot',
	})
	type: string

	@OneToMany(() => User, user => user.link)
	user: User[]

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
