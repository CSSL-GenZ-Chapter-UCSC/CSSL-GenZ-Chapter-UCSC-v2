import { getAllEventSlugs } from "@/sanity/lib/api";

export default async function DebugPage() {
  const slugs = await getAllEventSlugs();
  
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Debug: Available Event Slugs</h1>
      
      {slugs.length === 0 ? (
        <p className="text-red-500">No events found in Sanity!</p>
      ) : (
        <div>
          <p className="mb-4">Found {slugs.length} events:</p>
          <ul className="space-y-2">
            {slugs.map((item) => (
              <li key={item.slug} className="p-4 bg-gray-900 rounded">
                <div className="font-mono text-sm text-blue-400">{item.slug}</div>
                <a 
                  href={`/events/${item.slug}`}
                  className="text-sm text-green-400 hover:underline mt-2 inline-block"
                >
                  → Visit /events/{item.slug}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
