import React from "react";
import { Tag } from "../types";
import { Suggestion } from "./Suggestion";

export interface Props {
    tags: Tag[];
}

export const SuggestionList = ({ tags }: Props) => {
    return (
        <div>
            {tags.map((t) => (
                <Suggestion tag={t} />
            ))}
        </div>
    );
};
