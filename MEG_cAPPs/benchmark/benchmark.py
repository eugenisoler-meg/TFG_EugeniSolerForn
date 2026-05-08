import requests
import time
import statistics

URL = "https://testapi.escoltesiguies.cat/test/benchmark-07-05-2026"

headers = {
    "Accept": "application/json",
    "User-Agent": "Benchmark-Test-Script",
    "X-BENCHMARK-KEY": "q#xj066OI2m2F5#I$$U*"
}

def run_test(chunk, max_r, fields, rels, seq, iterations=5):
    times_total = []
    times_exec = []
    times_process = []
    times_crm = []
    records = []
    api_calls = []
    errors = []

    for i in range(iterations):
        params = {
            "chunkIndex": chunk,
            "maxResultIndex": max_r,
            "fieldSetIndex": fields,
            "relationshipSetIndex": rels,
        }

        if not seq:
            params["async"] = 1

        start = time.time()
        r = requests.get(URL, params=params, headers=headers)
        end = time.time()

        if r.status_code != 200:
            print("ERROR:", r.status_code, r.text)
            continue

        data = r.json()["test"]
        _async = r.json()["meta"]["async"]
        times_total.append(round((end - start) * 1000, 2))
        times_exec.append(round(data.get("time_ms"), 2))
        times_process.append(round(data.get("process_time_ms"), 2))
        times_crm.append(round(data.get("fetch_time_ms"), 2))
        records.append(data.get("records", 0))
        api_calls.append(data.get("api_calls", 0))
        errors.append(data.get("errors", 0))
        api_calls.append(data.get("api_calls", 0))
        time.sleep(.5)
    
    avg_time_total_ms = round(statistics.mean(times_total), 2) if times_total else None
    print("AVG REQUEST TIME (ms):", avg_time_total_ms, _async)
    return {
        "avg_time_total_ms":    avg_time_total_ms,
        "avg_time_execution_ms":round(statistics.mean(times_exec), 2)   if times_exec else None,
        "avg_time_process_ms":  round(statistics.mean(times_process), 2)if times_process else None,
        "avg_time_crm_ms" :     round(statistics.mean(times_crm), 2)    if times_crm else None,

        "avg_records":  round(statistics.mean(records), 2)  if records else None,
        "avg_api_calls":round(statistics.mean(api_calls), 2)if api_calls else None,
        "avg_errors":   round(statistics.mean(errors), 2)   if errors else None,
        "avg_memory_mb":round(statistics.mean(api_calls), 2)if api_calls else None,

        "meta": [ chunk, max_r, fields, rels, _async ]
    }

# Example run
# result = run_test(0, 0, 0, 0, False)
# print(result)