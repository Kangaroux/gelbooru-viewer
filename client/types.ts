export type PostRating = "general" | "sensitive" | "questionable" | "explicit";

export interface Post {
    id: number;
    createdAt: Date;
    rating: PostRating;
    tags: string[];
    hasSample: boolean;

    preview: {
        width: number;
        height: number;
        url: string;
    };

    sample: {
        width: number;
        height: number;
        url: string;
    };

    full: {
        width: number;
        height: number;
        url: string;
    };
}

export type TagType =
    | "artist"
    | "copyright"
    | "character"
    | "general"
    | "metadata";

export interface Tag {
    tag: string;

    // This could be undefined if the user entered it manually.
    count?: number;
    type?: TagType;
}
