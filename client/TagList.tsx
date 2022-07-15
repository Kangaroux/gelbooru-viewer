import React from "react";
import { Tag } from "./api";
import { TagListItem } from "./TagListItem";

export interface Props {
    tags: Tag[];
}

export const TagList = ({ tags }: Props) => {
    return (
        <div>
            <ul>
                {tags.map((t) => (
                    <TagListItem tag={t} />
                ))}
            </ul>
        </div>
    );
};
