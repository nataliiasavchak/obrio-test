import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  file_url: string;

  @Column()
  google_drive_id: string;

  @Column({ type: 'timestamptz' })
  created_dt: Date;
}
