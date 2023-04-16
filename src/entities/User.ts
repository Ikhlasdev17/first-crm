import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm'
import { Link } from './Links'

export enum UserStatus {
	CLICKED = 'clicked',
	CALLED = 'called',
	COMPLETED = 'completed',
}

@Entity('users', {
	orderBy: {
		id: 'ASC',
	},
})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column({
		nullable: true,
	})
	phone: string

	@Column({
		type: 'enum',
		enum: UserStatus,
		default: UserStatus.CLICKED,
	})
	status: UserStatus

	@ManyToOne(() => Link, link => link.user)
	link: Link

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
