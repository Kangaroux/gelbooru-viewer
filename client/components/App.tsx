import { observer } from "mobx-react-lite";
import React from "react";

import { store } from "..";
import { SearchButton } from "./SearchButton";
import { TagList } from "./TagList";
import { TagSearch } from "./TagSearch";
import { Viewer } from "./Viewer";

export const App = observer(() => {
    return (
        <div>
            <SearchButton />
            <TagSearch />
            <TagList tags={store.tags} />
            <Viewer />
        </div>
    );
});
