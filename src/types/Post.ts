export interface Post {
    id: string | number;
    image_url: string;
    title: string;
    description: string;
    isLike: boolean;
    comment: string;
}