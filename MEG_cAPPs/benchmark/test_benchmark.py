import requests

URL = "https://testapi.escoltesiguies.cat/test/benchmark-07-05-2026" #test"

params = {
    "chunkIndex": 0,
    "maxResultIndex": 0,
    "fieldSetIndex": 0,
    "relationshipSetIndex": 0,
    # "async": 0
}

headers = {
    "Accept": "application/json",
    "User-Agent": "Benchmark-Test-Script",
    "X-BENCHMARK-KEY": "q#xj066OI2m2F5#I$$U*"
}

r = requests.get(URL, params=params, headers=headers)

print("STATUS:", r.status_code)
print("HEADERS:", r.headers.get("content-type"))
print("BODY:", r.text[:500])