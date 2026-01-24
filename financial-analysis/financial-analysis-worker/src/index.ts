

export interface Env {
  NASDAQ_API_KEY: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext) {
    try {
      console.log("HTTP trigger received");
      await runWTIIngestion(env);
      return new Response("WTI ingestion OK");
    } catch (err: any) {
      console.error("FETCH ERROR:", err?.stack || err);
      return new Response("Error: " + err.message, { status: 500 });
    }
  },

  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
    try {
      console.log("CRON trigger fired");
      await runWTIIngestion(env);
    } catch (err: any) {
      console.error("CRON ERROR:", err?.stack || err);
    }
  }
};

async function runWTIIngestion(env: Env) {
  console.log("Starting WTI ingestion");

  if (!env.NASDAQ_API_KEY) throw new Error("Missing NASDAQ_API_KEY");
  if (!env.SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  if (!env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");

  const url = `https://data.nasdaq.com/api/v3/datasets/EIA/PET_RWTC_D.json?api_key=${env.NASDAQ_API_KEY}`;
  const res = await fetch(url);
  const json = await res.json();

  console.log("NASDAQ raw:", JSON.stringify(json).slice(0, 300));

  if (!json?.dataset?.data?.[0]?.[1]) {
    throw new Error("WTI price not found in NASDAQ response");
  }

  const price = json.dataset.data[0][1];

  const payload = {
    name: "Crude Oil (WTI)",
    price,
    unit: "USD/barrel",
    source: "nasdaq"
  };

  console.log("Payload:", payload);

  const supaRes = await fetch(`${env.SUPABASE_URL}/rest/v1/commodities`, {
    method: "POST",
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(payload)
  });

  const supaText = await supaRes.text();
  console.log("Supabase reply:", supaText);

  if (!supaRes.ok) {
    throw new Error("Supabase insert failed");
  }

  console.log("WTI inserted successfully");
}
