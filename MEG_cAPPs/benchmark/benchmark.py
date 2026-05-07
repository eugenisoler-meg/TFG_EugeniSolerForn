import requests
import time
import statistics

URL = "https://testapi.escoltesiguies.cat/test/benchmark-07-05-2026"

headers = {
    "Accept": "application/json",
    "User-Agent": "Benchmark-Test-Script",
    "X-BENCHMARK-KEY": "q#xj066OI2m2F5#I$$U*"
}

def run_test(chunk, max_r, fields, rels, iterations=5):

    times = []
    records = []
    api_calls = []

    for i in range(iterations):
        params = {
            "chunkIndex": chunk,
            "maxResultIndex": max_r,
            "fieldSetIndex": fields,
            "relationshipSetIndex": rels,
            "async": 0
        }

        start = time.time()
        r = requests.get(URL, params=params, headers=headers)
        end = time.time()

        if r.status_code != 200:
            print("ERROR:", r.status_code, r.text[:200])
            continue

        data = r.json()["test"]

        times.append((end - start) * 1000)
        records.append(data.get("records", 0))
        api_calls.append(data.get("api_calls", 0))

    return {
        "avg_time_ms": statistics.mean(times) if times else None,
        "avg_records": statistics.mean(records) if records else None,
        "avg_api_calls": statistics.mean(api_calls) if api_calls else None,
    }


# Example run
result = run_test(0, 0, 0, 0)

print("\nRESULT:")
print(result)