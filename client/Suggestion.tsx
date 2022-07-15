import React from "react";

import { Tag, TagType } from "./api";

const classNameMap: Record<TagType, string> = {
    artist: "tag-artist",
    character: "tag-character",
    copyright: "tag-copyright",
    general: "tag-general",
    metadata: "tag-metadata",
};

export interface Props {
    tag: Tag;
}

export const Suggestion = ({ tag }: Props) => {
    const className = classNameMap[tag.type];
    return (
        <div>
            <span className={className}>{tag.tag}</span>{" "}
            <span className="gray">{tag.count}</span>
        </div>
    );
};
