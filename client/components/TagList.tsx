import React from "react";
import { Tag } from "../types";
import { TagComponent } from "./Tag";

export interface Props {
    tags: Tag[];
}

export const TagList = ({ tags }: Props) => {
    return (
        <div>
            <ul>
                {tags.map((t) => (
                    <TagComponent tag={t} />
                ))}
            </ul>
        </div>
    );
};
