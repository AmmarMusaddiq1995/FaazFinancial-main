export async function POST(req) {
  const { form_id } = await req.json();
  console.log(form_id);
  return new Response(JSON.stringify({ message: "Payment successful" }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}