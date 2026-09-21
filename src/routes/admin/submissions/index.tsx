import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, Calendar, MessageSquareQuote } from "lucide-react";
import { fetchAllQuoteRequests, fetchAllContactMessages } from "../../api/projects.server";
import type { QuoteRequest, ContactMessage } from "@/lib/db";

export const Route = createFileRoute("/admin/submissions/")({
  loader: async () => {
    const [quotes, messages] = await Promise.all([
      fetchAllQuoteRequests(),
      fetchAllContactMessages(),
    ]);
    return { quotes, messages };
  },
  component: AdminSubmissions,
});

function AdminSubmissions() {
  const { quotes, messages } = Route.useLoaderData();

  const newQuotes = quotes.filter((q: QuoteRequest) => q.status === "new");
  const newMessages = messages.filter((m: ContactMessage) => m.status === "new");

  return (
    <div className="grid gap-8">
      <div>
        <Link
          to="/admin"
          className="mb-2 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Dashboard
        </Link>
        <h1 className="text-2xl font-bold">Submissions</h1>
        <p className="mt-1 text-muted-foreground">Quote requests and contact form messages</p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Quote Requests</p>
          <p className="mt-1 text-2xl font-bold">{quotes.length}</p>
          {newQuotes.length > 0 && (
            <p className="mt-1 text-xs text-orange-600">{newQuotes.length} new</p>
          )}
        </div>
        <div className="rounded border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Total Contact Messages</p>
          <p className="mt-1 text-2xl font-bold">{messages.length}</p>
          {newMessages.length > 0 && (
            <p className="mt-1 text-xs text-orange-600">{newMessages.length} new</p>
          )}
        </div>
        <div className="rounded border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Combined</p>
          <p className="mt-1 text-2xl font-bold">{quotes.length + messages.length}</p>
        </div>
      </div>

      {/* Quote Requests */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Quote Requests</h2>
        {quotes.length === 0 ? (
          <div className="rounded border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            No quote requests yet. They will appear here when customers submit the quote form.
          </div>
        ) : (
          <div className="overflow-hidden rounded border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Contact</th>
                  <th className="px-4 py-3 text-left font-medium">Service</th>
                  <th className="px-4 py-3 text-left font-medium">Location</th>
                  <th className="px-4 py-3 text-left font-medium">Budget</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q: QuoteRequest) => (
                  <tr key={q.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{q.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="size-3" /> {q.phone}
                        </span>
                        {q.email && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="size-3" /> {q.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{q.service}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {q.county}
                      {q.buildingType && <span className="block text-xs">{q.buildingType}</span>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{q.budget}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={q.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Contact Messages */}
      <section>
        <h2 className="mb-3 text-lg font-semibold">Contact Messages</h2>
        {messages.length === 0 ? (
          <div className="rounded border border-border bg-card p-6 text-center text-sm text-muted-foreground">
            No contact messages yet. They will appear here when customers submit the contact form.
          </div>
        ) : (
          <div className="overflow-hidden rounded border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Contact</th>
                  <th className="px-4 py-3 text-left font-medium">Subject</th>
                  <th className="px-4 py-3 text-left font-medium">Message</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m: ContactMessage) => (
                  <tr key={m.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{m.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Phone className="size-3" /> {m.phone}
                        </span>
                        {m.email && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Mail className="size-3" /> {m.email}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{m.subject || "—"}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                      {m.message}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3" />
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ["new"]: "bg-orange-100 text-orange-800",
    read: "bg-blue-100 text-blue-800",
    replied: "bg-green-100 text-green-800",
    archived: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${styles[status] ?? styles["new"]}`}
    >
      {status}
    </span>
  );
}
