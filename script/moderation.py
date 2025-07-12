import re
import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

# -------------------------------
# Local Filtering
# -------------------------------
BANNED_WORDS = [
    "idiot", "stupid", "dumb", "moron", "useless", "trash", "shut up",
    "kill yourself", "hate", "nonsense", "retard", "toxic", "loser", "scam"
]

SPAM_PATTERNS = [
    r"http[s]?://(?!stackoverflow\.com|github\.com|imgur\.com)",
    r"buy now", r"limited offer", r"click here", r"free money", r"work from home",
    r"discount", r"promo code", r"subscribe to", r"visit my website", r"earn \$?\d+",
    r"dm me", r"contact me", r"whatsapp \+?\d+", r"telegram", r"cashapp"
]

LOW_QUALITY_PATTERNS = [
    r"asdf", r"qwerty", r"test123", r"lorem ipsum",
    r"(.)\1{5,}", r"\b(?:help|pls|urgent)\b"
]

def run_basic_filter(text):
    lower_text = text.lower()

    for word in BANNED_WORDS:
        if word in lower_text:
            return "Flagged - Inappropriate (keyword)"

    for pattern in SPAM_PATTERNS:
        if re.search(pattern, lower_text):
            return "Flagged - Spam"

    for pattern in LOW_QUALITY_PATTERNS:
        if re.search(pattern, lower_text):
            return "Flagged - Low quality or filler"

    if len(lower_text.split()) < 4:
        return "Flagged - Too short"

    if re.search(r"[!?]{4,}", lower_text):
        return "Flagged - Excessive punctuation"

    return "Pass"

# -------------------------------
# Perspective API
# -------------------------------
def run_perspective_moderation(content):
    api_key = os.getenv("PERPLEXITY_API_KEY")  # make sure it's set

    url = f"https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key={api_key}"

    data = {
        "comment": {"text": content},
        "languages": ["en"],
        "requestedAttributes": {
            "TOXICITY": {}, "INSULT": {}, "SPAM": {}, "PROFANITY": {}
        }
    }

    response = requests.post(url, json=data)
    response.raise_for_status()

    result = response.json()

    scores = {
        attr: round(result["attributeScores"][attr]["summaryScore"]["value"], 3)
        for attr in result["attributeScores"]
    }

    return scores

# -------------------------------
# Hybrid Moderation
# -------------------------------
def moderate_post(content):
    local_result = run_basic_filter(content)

    if local_result == "Pass":
        try:
            scores = run_perspective_moderation(content)

            if scores["TOXICITY"] > 0.8 or scores["INSULT"] > 0.75:
                return {"status": "Warn", "reason": "Toxic or insulting"}
            if scores["SPAM"] > 0.7:
                return {"status": "Warn", "reason": "Spam detected"}
            if scores["PROFANITY"] > 0.7:
                return {"status": "Warn", "reason": "Profanity detected"}

            return {"status": "Approved"}

        except Exception as e:
            return {"status": "Error", "reason": str(e)}

    else:
        return {"status": "Flagged", "reason": local_result}
