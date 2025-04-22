export type FileStatus = 'Revisado' | 'Pendiente';

export interface UserFile {
    id: number;
    name: string;
    userId: string;
    period: string;
    status: FileStatus;
    summary: string;
    tags: string[];
}