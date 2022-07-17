import { Post, Tag } from "./types";

export class APIError extends Error {
    name = "APIError";
    response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}

export interface PostsResponse {
    totalCount: number;
    page: number;
    posts: Post[];
}

export async function fetchPosts(query: string, page = 0) {
    const resp = await fetch(
        `/api/posts?q=${encodeURIComponent(query)}&p=${page}`
    );

    if (!resp.ok) {
        throw new APIError("error fetching posts", resp);
    }

    const data = await resp.json();

    let ret: PostsResponse = {
        totalCount: data["total_count"],
        page: data["page"],
        posts: [],
    };

    for (const p of data["posts"]) {
        ret.posts.push({
            id: p["id"],
            createdAt: p["created_at"],
            rating: p["rating"],
            tags: p["tags"],
            hasSample: p["has_sample"],
            preview: {
                width: p["preview"]["width"],
                height: p["preview"]["height"],
                url: p["preview"]["url"],
            },
            sample: {
                width: p["sample"]["width"],
                height: p["sample"]["height"],
                url: p["sample"]["url"],
            },
            full: {
                width: p["full"]["width"],
                height: p["full"]["height"],
                url: p["full"]["url"],
            },
        });
    }

    return ret;
}

export interface TagAutocompleteResponse {
    suggestions: Tag[];
}

export async function fetchTagAutocomplete(query: string, count?: number) {
    let url = `/api/tag-autocomplete?q=${query}`;

    if (count !== undefined) {
        url += `&n=${count}`;
    }

    const resp = await fetch(url);

    if (!resp.ok) {
        throw new APIError("error fetching tag suggestions", resp);
    }

    const data = await resp.json();

    let ret: TagAutocompleteResponse = {
        suggestions: [],
    };

    for (const s of data["suggestions"]) {
        ret.suggestions.push({
            count: s["count"],
            tag: s["tag"],
            type: s["type"],
        });
    }

    return ret;
}

export async function fetchMostPopularTags() {
    return fetchTagAutocomplete("", 50);
}
