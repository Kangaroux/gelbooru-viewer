from enum import Enum

import requests


class TagType(Enum):
    Artist = "artist"
    Copyright = "copyright"
    Character = "character"
    Deprecated = "deprecated"
    General = "general"
    Metadata = "metadata"


def get_posts(query: str, page: int) -> dict:
    resp = requests.get(
        "https://gelbooru.com/index.php",
        {
            "page": "dapi",
            "s": "post",
            "q": "index",
            "tags": query,
            "pid": page,
            "json": 1,
        },
    )

    return resp.json()


def get_tag_autocomplete_suggestions(count: int, query: str) -> dict:
    resp = requests.get(
        "https://gelbooru.com/index.php",
        {
            "page": "dapi",
            "s": "tag",
            "q": "index",
            "name_pattern": query + "%",
            "limit": count,
            "orderby": "count",
            "json": 1,
        },
    )

    return resp.json()


def map_tag_type(tag_type: int) -> TagType:
    mapping = {
        0: TagType.General,
        1: TagType.Artist,
        # 2 = ?
        3: TagType.Copyright,
        4: TagType.Character,
        5: TagType.Metadata,
        6: TagType.Deprecated,
    }

    return mapping[tag_type]
