import json
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load benchmark data
with open("benchmark_results.json") as f:
    data = json.load(f)

df = pd.DataFrame(data)

# -----------------------------
# 1. SPEEDUP: chunk vs max
# -----------------------------
pivot_speedup = df.groupby(["chunk", "max"])["speedup"].mean().unstack()

plt.figure(figsize=(10, 6))
sns.heatmap(pivot_speedup, annot=True, cmap="viridis")
plt.title("Speedup Heatmap (Chunk vs Max Results)")
plt.xlabel("Max Result Index")
plt.ylabel("Chunk Size")

plt.tight_layout()
plt.savefig("heatmap_speedup_chunk_vs_max.png", dpi=300)
plt.close()

# -----------------------------
# 2. ASYNC LATENCY: fields vs chunk
# -----------------------------
pivot_async_time = df.groupby(["fields", "chunk"])["async_ms"].mean().unstack()

plt.figure(figsize=(10, 6))
sns.heatmap(pivot_async_time, annot=True, cmap="magma")
plt.title("Async Latency (Fields vs Chunk)")
plt.xlabel("Chunk Size")
plt.ylabel("Field Set Complexity")

plt.tight_layout()
plt.savefig("heatmap_async_fields_vs_chunk.png", dpi=300)
plt.close()

# -----------------------------
# 3. RELATIONSHIP COST IMPACT
# -----------------------------
pivot_rels = df.groupby(["rels", "chunk"])["speedup"].mean().unstack()

plt.figure(figsize=(10, 6))
sns.heatmap(pivot_rels, annot=True, cmap="coolwarm")
plt.title("Speedup vs Relationship Complexity")
plt.xlabel("Chunk Size")
plt.ylabel("Relationship Set Size")

plt.tight_layout()
plt.savefig("heatmap_speedup_rels_vs_chunk.png", dpi=300)
plt.close()

# -----------------------------
# 4. MEMORY IMPACT HEATMAP
# -----------------------------
pivot_memory = df.groupby(["fields", "rels"])["async_ms"].mean().unstack()

plt.figure(figsize=(10, 6))
sns.heatmap(pivot_memory, annot=True, cmap="YlOrRd")
plt.title("Async Time vs Payload Complexity (Fields × Relationships)")
plt.xlabel("Relationships")
plt.ylabel("Fields")

plt.tight_layout()
plt.savefig("heatmap_memory_payload.png", dpi=300)
plt.close()

print("Heatmaps generated successfully.")