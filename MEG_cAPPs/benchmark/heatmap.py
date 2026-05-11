import json
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

data = []
with open("benchmark_results.jsonl") as f:
    for line in f:
        data.append(json.loads(line))

df = pd.DataFrame(data)
df["chunk"] = df["chunk"].astype(int)
df["max_results"] = df["max_results"].astype(int)

# ----------------------------------------
# REAL VALUES (better readability)
# ----------------------------------------

chunk_map = {
    0: 10,
    1: 25,
    2: 50,
    3: 100
}

max_map = {
    0: 10,
    1: 100,
    2: 1000
}

field_map = {
    0: 1,
    1: 4,
    2: 8
}

rel_map = {
    0: 3,
    1: 2,
    2: 1
}

df["chunk"] =         df["chunk"].map(chunk_map)
df["max_results"] =   df["max_results"].map(max_map)
df["fields"] =        df["fields"].map(field_map)
df["relationships"] = df["relationships"].map(rel_map)

# ========================================
# 1. TOTAL TIME
# ========================================

pivot = df.pivot_table(
    values="async_total_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="viridis")

plt.title("Async Total Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("async_total_heatmap.png", dpi=300)
plt.close()

pivot = df.pivot_table(
    values="seq_total_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="viridis")

plt.title("Sequential Total Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("seq_total_heatmap.png", dpi=300)
plt.close()

# ========================================
# 2. EXECUTION TIME (MS IN CONTROLLER)
# ========================================

pivot = df.pivot_table(
    values="async_exec_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="coolwarm")

plt.title("Async Execution Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("async_exec_heatmap.png", dpi=300)
plt.close()

pivot = df.pivot_table(
    values="seq_exec_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="coolwarm")

plt.title("Sequential Execution Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("seq_exec_heatmap.png", dpi=300)
plt.close()

# ========================================
# 3. CRM TIME (MS REST ANSWER)
# ========================================

pivot = df.pivot_table(
    values="async_crm_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="magma")

plt.title("CRM Async Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("async_crm_heatmap.png", dpi=300)
plt.close()

pivot = df.pivot_table(
    values="seq_crm_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="magma")

plt.title("CRM Sequential Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("seq_crm_heatmap.png", dpi=300)
plt.close()

# ========================================
# 4. PROCESSING TIME (PHP OBJECT CREATION)
# ========================================

pivot = df.pivot_table(
    values="seq_process_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="YlGnBu")

plt.title("Sequential Processing Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("seq_process_heatmap.png", dpi=300)
plt.close()

pivot = df.pivot_table(
    values="async_process_ms",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="YlGnBu")

plt.title("Async Processing Time (ms)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("async_process_heatmap.png", dpi=300)
plt.close()

# ========================================
# 5. SPEEDUP (TOTAL WIN IN SPEED)
# ========================================
pivot = df.pivot_table(
    values="speedup_total",
    index="chunk",
    columns="max_results",
    aggfunc="mean"
)

plt.figure(figsize=(10, 6))
sns.heatmap(pivot, annot=True, cmap="RdYlGn")

plt.title("Async Speedup vs Sequential (Total)")
plt.xlabel("Max Results")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("speedup_heatmap.png", dpi=300)
plt.close()

# ========================================
# 6. BEST CONFIGURATIONS (THROUGHPUT, MS/RECORD)
# ========================================

df["seq_throughput"] = df["records"] / df["seq_total_ms"]
df["async_throughput"] = df["records"] / df["async_total_ms"]

best_seq = df.sort_values("seq_throughput", ascending=False).head(10)
print("\n===== BEST SEQUENTIAL CONFIGS =====\n")
print(best_seq[[
    "chunk",
    "max_results",
    "fields",
    "relationships",
    "seq_total_ms",
    "seq_throughput"
]])

best_async = df.sort_values("async_throughput", ascending=False).head(10)
print("\n===== BEST ASYNC CONFIGS =====\n")
print(best_async[[
    "chunk",
    "max_results",
    "fields",
    "relationships",
    "async_total_ms",
    "async_throughput"
]])

print("\nHeatmaps generated.")