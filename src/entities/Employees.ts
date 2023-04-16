import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('employee')
export class Employee extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	username: string

	@Column({
		unique: true,
		nullable: false,
	})
	phone: string

	@Column()
	password: string

	@Column({
		default: 'ceo',
	})
	role: string

	@Column({
		type: 'numeric',
		nullable: true,
	})
	age: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
