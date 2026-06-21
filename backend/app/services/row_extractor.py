import re


def extract_candidate_rows(text: str):

    rows = []

    for line in text.split("\n"):

        line = line.strip()

        if not line:
            continue

        if re.search(r"\d", line):

            rows.append(line)

    return rows