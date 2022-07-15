import { makeAutoObservable } from "mobx";
import { Post, Tag } from "./api";

export class Store {
    posts: Post[];
    tags: Tag[];

    constructor() {
        this.posts = [];
        this.tags = [];

        makeAutoObservable(this);
    }

    addTag(tag: Tag) {
        if (!this.tags.find(t => t.tag === tag.tag))
            this.tags.push(tag);
    }

    removeTag(tag: Tag) {
        const i = this.tags.findIndex(t => t.tag === tag.tag);

        if (i !== -1)
            this.tags.slice(i, 1);
    }
}
