import { observer } from "mobx-react-lite";
import React from "react";

import { store } from "..";
import { SearchButton } from "./SearchButton";
import { TagList } from "./TagList";
import { TagSearch } from "./TagSearch";
import { ScrollContainer } from "./ScrollContainer";

export const App = observer(() => {
    return (
        <div>
            <React.StrictMode>
                <SearchButton />
                <TagSearch />
                <TagList tags={store.tags} />
                <ScrollContainer posts={store.posts} />
            </React.StrictMode>
        </div>
    );
});
