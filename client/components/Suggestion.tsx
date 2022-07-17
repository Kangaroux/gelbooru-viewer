import { observer } from "mobx-react-lite";
import React from "react";

import { Tag, TagType } from "../types";

const classNameMap: Record<TagType, string> = {
    artist: "artist",
    character: "character",
    copyright: "copyright",
    general: "general",
    metadata: "metadata",
};

export interface Props {
    onClick: () => void;
    tag: Tag;
}

export const Suggestion = observer(({ onClick, tag }: Props) => {
    const className = classNameMap[tag.type ?? "general"];

    return (
        <div className="suggestion" onClick={onClick}>
            <span className={className}>{tag.tag}</span>{" "}
            {tag.count !== undefined ? (
                <span className="color-gray">{tag.count}</span>
            ) : null}
        </div>
    );
});
