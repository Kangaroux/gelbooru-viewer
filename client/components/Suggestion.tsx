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
    tag: Tag;
}

export const Suggestion = ({ tag }: Props) => {
    const className = classNameMap[tag.type];
    return (
        <div className="suggestion">
            <span className={className}>{tag.tag}</span>{" "}
            <span className="color-gray">{tag.count}</span>
        </div>
    );
};
