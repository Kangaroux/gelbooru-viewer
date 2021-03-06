import { observer } from "mobx-react-lite";
import React, { useMemo } from "react";

import { Tag } from "../types";
import Suggestion from "./Suggestion";
import "./SuggestionList.scss";

interface Props {
    onPick: (tag: Tag) => void;
    tags: Tag[];
}

const SuggestionList = ({ onPick, tags }: Props) => {
    const sortedTags = useMemo(
        () => [...tags].sort((a, b) => b.count! - a.count!),
        [tags]
    );

    return (
        <div className="suggestion-list">
            {sortedTags.map((t) => (
                <Suggestion key={t.tag} onClick={() => onPick(t)} tag={t} />
            ))}
        </div>
    );
};

export default observer(SuggestionList);
