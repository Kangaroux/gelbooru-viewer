import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";
import { Tag } from "../types";
import { Suggestion } from "./Suggestion";

export interface Props {
    onPick: (tag: Tag) => void;
    tags: Tag[];
}

export const SuggestionList = observer(({ onPick, tags }: Props) => {
    const sortedTags = useMemo(
        () => [...tags].sort((a, b) => b.count - a.count),
        [tags]
    );

    return (
        <div className="suggestion-list">
            {sortedTags.map((t) => (
                <Suggestion onClick={() => onPick(t)} tag={t} />
            ))}
        </div>
    );
});
