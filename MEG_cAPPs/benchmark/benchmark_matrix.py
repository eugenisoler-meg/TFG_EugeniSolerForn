import json
import time
from benchmark import run_test
import os

RESULTS_FILE = "benchmark_results.jsonl"
def append_result(result):
    with open(RESULTS_FILE, "a") as f:
        f.write(json.dumps(result) + "\n")

chunkSizes = [0, 1, 2, 3]
maxResults = [0, 1, 2]
fieldSets = [0, 1, 2]
relSets = [0, 1, 2]

results = []

completed = set()
if os.path.exists(RESULTS_FILE):
    with open(RESULTS_FILE) as f:
        for line in f:
            item = json.loads(line)
            key = (
                item["chunk"],
                item["max_results"],
                item["fields"],
                item["relationships"], 
            )
            completed.add(key)


for c in chunkSizes:
    for m in maxResults:
        for f in fieldSets:
            for r in relSets:
                key = (c, m, f, r)
                if key in completed:
                    print(f"Skipping completed {key}")
                    continue

                time.sleep(.5)
                print(f"\nITERATION {r+f*3+m*9+c*27 + 1}")
                print(f"Running SEQ c={c} m={m} f={f} r={r}")
                seq_result = run_test(c, m, f, r, seq=True)
                
                time.sleep(.5)
                print(f"Running ASYNC c={c} m={m} f={f} r={r}")
                async_result = run_test(c, m, f, r, seq=False)
                
                result = {
                    "chunk": c,
                    "max_results": m,
                    "fields": f,
                    "relationships": r,

                    "seq_total_ms": seq_result["avg_time_total_ms"],
                    "seq_exec_ms": seq_result["avg_time_execution_ms"],
                    "seq_process_ms": seq_result["avg_time_process_ms"],
                    "seq_crm_ms": seq_result["avg_time_crm_ms"],

                    "async_total_ms": async_result["avg_time_total_ms"],
                    "async_exec_ms": async_result["avg_time_execution_ms"],
                    "async_process_ms": async_result["avg_time_process_ms"],
                    "async_crm_ms": async_result["avg_time_crm_ms"],

                    "records": seq_result["avg_records"],
                    "api_calls": seq_result["avg_api_calls"],

                    "speedup_total":
                        round( seq_result["avg_time_total_ms"] / async_result["avg_time_total_ms"],
                            2 )
                        if async_result["avg_time_total_ms"]
                        else None,
                    "speedup_exec":
                        round( seq_result["avg_time_execution_ms"] / async_result["avg_time_execution_ms"],
                            2 )
                        if async_result["avg_time_execution_ms"]
                        else None,
                    "speedup_process":
                        round( seq_result["avg_time_process_ms"] / async_result["avg_time_process_ms"],
                            2 )
                        if async_result["avg_time_process_ms"]
                        else None,
                    "speedup_crm":
                        round( seq_result["avg_time_crm_ms"] / async_result["avg_time_crm_ms"],
                            2 )
                        if async_result["avg_time_crm_ms"]
                        else None,

                    "seq_errors" : seq_result["avg_errors"],
                    "async_errors" : async_result["avg_errors"],
                }

                append_result(result)

print("\nBenchmark completed.")