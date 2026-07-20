export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    // Inject the secret securely from Cloudflare Environment Variables
    body.integrationKey = env.APPS_SCRIPT_SHARED_SECRET;

    // Forward the payload to Google Apps Script
    const response = await fetch(env.APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8' // GAS prefers text/plain to avoid CORS preflight
      }
    });

    const result = await response.json();
    
    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
