import { makeAutoObservable } from "mobx";
import { Post, Tag } from "./types";

export class Store {
    posts: Post[];
    mostPopularTags: Tag[];
    tags: Tag[];

    constructor() {
        this.posts = [];
        this.mostPopularTags = [];
        this.tags = [];

        makeAutoObservable(this);
    }

    setMostPopularTags(tags: Tag[]) {
        this.mostPopularTags = tags;
    }

    addTag(tag: Tag) {
        if (!this.tags.find((t) => t.tag === tag.tag)) {
            this.tags.push(tag);
        }
    }

    removeTag(tag: Tag) {
        const i = this.tags.findIndex((t) => t.tag === tag.tag);

        if (i !== -1) {
            this.tags.slice(i, 1);
        }
    }
}
