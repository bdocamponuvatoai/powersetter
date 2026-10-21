import { site } from "@/lib/site";

const facts = [
  { value: String(site.founded), label: "Founded" },
  { value: site.customers, label: "Customers helped" },
  { value: site.suppliers, label: "Suppliers compared" },
  { value: "10+", label: "Deregulated states" },
];

export function Proof() {
  return (
    <section aria-label={`${site.name} in numbers`} className="border-y border-line bg-white/60">
      <div className="shell py-8 sm:py-10">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="border-l-2 border-highlight pl-4">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="tabular mt-1 text-heading text-4xl sm:text-5xl">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-muted">Figures as reported by {site.name}.</p>
      </div>
    </section>
  );
}
