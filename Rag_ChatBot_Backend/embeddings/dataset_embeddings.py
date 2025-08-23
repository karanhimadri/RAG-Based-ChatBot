# ======================================================
#   ⚠️  RUN THIS SCRIPT ONLY ONCE TO EMBED DOCUMENTS
#   - Put your sample JSON documents in the `sample_data` folder
#   - Then configure this file before running
# ======================================================


import json
import sys
from pathlib import Path

# Ensure project root is on sys.path when running this file directly from the embeddings directory
PROJECT_ROOT = Path(__file__).resolve().parent.parent
if str(PROJECT_ROOT) not in sys.path:
    sys.path.insert(0, str(PROJECT_ROOT))

from config.pinacone_config import index
from embeddings.embedder import get_embedded_vector_from_texts

domain_files = {
    "education": "../sample_data/education.json",
    "agriculture": "../sample_data/agriculture.json",
    "environment": "../sample_data/environment.json",
    "finance": "../sample_data/finance.json",
    "healthcare": "../sample_data/healthcare.json",
}

all_records = []

for domain, file_path in domain_files.items():
    with open(file_path, "r", encoding="utf-8") as f:
        data_list = json.load(f)

        texts = [item["data"] for item in data_list]
        embeddings = get_embedded_vector_from_texts(texts)

        for i, (item, embedding) in enumerate(zip(data_list, embeddings)):
            record = {
                "id": f"{domain}_{i}",
                "values": (
                    embedding.tolist() if hasattr(embedding, "tolist") else embedding  # type: ignore
                ),
                "metadata": {
                    "domain": domain,
                    "source": item.get("source", "unknown"),
                    "original_text": item["data"],
                },
            }
            all_records.append(record)


if __name__ == "__main__":
    batch_size = 100
    for i in range(0, len(all_records), batch_size):
        batch = all_records[i : i + batch_size]
        index.upsert(vectors=batch)

    print(f"✅ Upserted {len(all_records)} records into Pinecone.")

    # Verify stats
    stats = index.describe_index_stats()
    print("📊 Index stats:", stats)
