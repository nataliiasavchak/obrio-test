import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file_url: string;

  @Column()
  google_drive_id: string;

  @Column()
  google_drive_url?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_dt: Date;
}
