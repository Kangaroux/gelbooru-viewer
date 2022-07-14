import { makeAutoObservable } from "mobx";
import { Post } from "./api";

export class Store {
    posts: Post[];

    constructor() {
        this.posts = [];
        makeAutoObservable(this);
    }
}