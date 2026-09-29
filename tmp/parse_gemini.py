import json

with open("/tmp/gemini_share_response.txt") as f:
    raw = f.read()

# remove leading )]}'
raw = raw.strip()
if raw.startswith(")]}'"):
    raw = raw[4:].strip()

data = json.loads(raw)
inner_raw = data[0][2]
inner = json.loads(inner_raw)

# Save pretty inner JSON to inspect
with open("/tmp/inner_chat.json", "w") as f:
    json.dump(inner, f, indent=2)

print("Saved inner_chat.json successfully.")
