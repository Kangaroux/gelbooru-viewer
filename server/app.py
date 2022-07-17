import json
from datetime import datetime, timezone

from flask import Flask, render_template, request, Response

from . import gelbooru as gb

app = Flask(
    __name__,
    static_url_path="/static",
    static_folder="../dist",
    template_folder=".",
)


def json_response(data: dict, status=200, *args, **kwargs):
    return Response(json.dumps(data), status, *args, **kwargs)


def message_response(message: str, *args, **kwargs):
    return json_response({"message": message}, *args, **kwargs)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/posts")
def posts():
    """
    Returns a list of posts based on the provided tags.

    Method: GET
    Params:
        p: The page number used for pagination (defaults to 0).
        q: The search query.
    Responses:
        200: A list of up to 100 posts.
        400: Error response if the p param is not a number or is negative.
    Schema:
        {
            "total_count": 12345,
            "page": 123,
            "posts": [
                {
                    "id": 12345,
                    "created_at": "2022-07-14T05:02:57Z",
                    "rating": "general" | "sensitive" | "questionable" | "explicit",
                    "tags": ["tag1", "tag2", "tag3"],
                    "has_sample": true | false,
                    "preview": {
                        "width": 1234,
                        "height": 1234,
                        "url": "http://example.com/image.jpg",
                    },
                    "sample": {
                        "width": 1234,
                        "height": 1234,
                        "url": "http://example.com/image.jpg",
                    },
                    "full": {
                        "width": 1234,
                        "height": 1234,
                        "url": "http://example.com/image.jpg",
                    },
                }
            ],
        }
    """
    query = request.args.get("q")

    try:
        page = request.args.get("p", default=0, type=int)
    except ValueError:
        return message_response(
            "Page must be a number.",
            status=400,
        )

    if page < 0:
        return message_response(
            "Page must not be negative.",
            status=400,
        )

    gb_resp = gb.get_posts(query, page)
    data = []

    for post in gb_resp.get("post", []):
        # Timestamp is returned in the form "Wed Jul 13 23:31:46 -0500 2022"
        created_at = datetime.strptime(post["created_at"], "%a %b %d %H:%M:%S %z %Y")
        created_at = created_at.astimezone(timezone.utc)

        data.append(
            {
                "id": post["id"],
                "created_at": created_at.isoformat().replace("+00:00", "Z"),
                "rating": post["rating"],
                "tags": post["tags"].split(" "),
                "has_sample": post["sample"] == 1,
                "preview": {
                    "width": post["preview_width"],
                    "height": post["preview_height"],
                    "url": post["preview_url"],
                },
                "sample": {
                    "width": post["sample_width"],
                    "height": post["sample_height"],
                    "url": post["sample_url"],
                },
                "full": {
                    "width": post["width"],
                    "height": post["height"],
                    "url": post["file_url"],
                },
            }
        )

    return json_response(
        {
            "total_count": gb_resp["@attributes"]["count"],
            "page": page,
            "posts": data,
        }
    )


@app.route("/api/tag-autocomplete")
def tag_autocomplete():
    """
    Returns a list of tag autocomplete suggestions.

    Method: GET
    Params:
        n: The max number of tags to fetch (default: 20)
        q: The tag name to autocomplete.
    Responses:
        200: A list of up to 20 tag suggestions (excluding deprecated tags).
    Schema:
        {
            "suggestions": [
                {
                    "count": 123,
                    "tag": "autocomplete suggestion",
                    "type": "artist" | "copyright" | "character" | "general" | "metadata",
                }
            ]
        }
    """
    count = request.args.get("n", 20, type=int)
    query = request.args.get("q", "")
    gb_resp = gb.get_tag_autocomplete_suggestions(count=count, query=query)
    data = []

    for tag in gb_resp.get("tag", []):
        tag_type = gb.map_tag_type(tag["type"])

        if tag_type == gb.TagType.Deprecated:
            continue
        elif tag["count"] == 0:
            continue

        data.append(
            {
                "count": tag["count"],
                "tag": tag["name"],
                "type": tag_type.value,
            }
        )

    return json_response({"suggestions": data})
