export interface IListItem {
    id: string | number;
    title: string;
    isDone: boolean;
    createDate?: Date | null;
    dueDate?: Date | null;
}