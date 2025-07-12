from moderation import moderate_post  # assuming you saved the above code in moderation.py

# -------------------------------
# Test Inputs
# -------------------------------
test_cases = [
    "How can I implement memoization in Python?",
    "You all are dumb and this platform is trash!",
    "Buy now and earn free money: http://spammer.com",
    "asdfasdfasdf",
    "Please help urgent",
    "Hey guys?????",
    "Visit my website for free offers",
    "Can someone explain recursion with a simple example?",
    "Contact me on WhatsApp +919999999999",
    "This code is completely useless and you're stupid",
    "test123 test123 test123",
    "Can I use async/await inside a for loop in JavaScript?",
]

# -------------------------------
# Run Moderation
# -------------------------------
def run_tests():
    print("Running moderation tests...\n")
    for idx, content in enumerate(test_cases, start=1):
        result = moderate_post(content)
        print(f"Test Case {idx}: {content}")
        print("Moderation Result:")
        for k, v in result.items():
            print(f"  {k}: {v}")
        print("-" * 50)

if __name__ == "__main__":
    run_tests()
