import {
	Entity,
	PrimaryGeneratedColumn,
	BaseEntity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity('course')
export class Course extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column()
	name: string

	@Column()
	duration: string

	@Column()
	price: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
