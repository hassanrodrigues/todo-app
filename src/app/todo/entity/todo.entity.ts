import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: "todos" })
export class TodoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @ApiProperty()
    task: string;

    @Column({ name: 'is_done', type: 'tinyint', width: 1 })
    @ApiProperty()
    isDone: number;

    @CreateDateColumn({ name: 'created_at' })
    @ApiProperty()
    createdAt: string;

    @UpdateDateColumn({ name: 'updated_at' })
    @ApiProperty()
    updatedAt: string;

    @DeleteDateColumn({ name: 'delete_at' })
    @ApiProperty()
    deletedAt: string;
}