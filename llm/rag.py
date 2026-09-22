import os


DOCUMENT_PATH = os.path.join(
    os.path.dirname(__file__),
    "cancellation_policy.txt"
)


def search_policy(query):

    with open(DOCUMENT_PATH, "r", encoding="utf-8") as file:
        document = file.read()

    # Simple prototype retrieval
    keywords = [
        "cancel",
        "cancelled",
        "cancellation",
        "refund",
        "train"
    ]

    query_lower = query.lower()

    if any(keyword in query_lower for keyword in keywords):
        return document

    return "No relevant railway policy information was found."