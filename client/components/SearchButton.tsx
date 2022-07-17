import { observer } from "mobx-react-lite";
import React from "react";

import { store } from "..";
import { fetchPosts } from "../api";

const SearchButton = () => {
    const onClick = () => {
        const query = store.tags.map((t) => t.tag).join(" ");
        fetchPosts(query)
            .then((posts) => store.addPosts(posts.posts))
            .catch((e) => console.log(e, e.response));
    };

    return <button onClick={onClick}>Search</button>;
};

export default observer(SearchButton);
