import re


def analyze_range(
    value: str,
    reference_range: str
) -> str:

    try:

        value = float(value)

        numbers = re.findall(
            r"\d+(?:\.\d+)?",
            reference_range
        )

        if len(numbers) < 2:

            return "UNKNOWN"

        lower = float(numbers[0])
        upper = float(numbers[1])

        if value < lower:
            return "LOW"

        if value > upper:
            return "HIGH"

        return "NORMAL"

    except Exception:

        return "UNKNOWN"