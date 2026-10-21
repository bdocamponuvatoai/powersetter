import { SectionHeading, cx } from "@/components/ui";
import { billNotes } from "@/lib/content";

export function BillNotes({
  title = "Three lines on your bill decide what you can save",
  layout = "row",
}: {
  title?: string;
  layout?: "row" | "stack";
}) {
  const stacked = layout === "stack";
  return (
    <section aria-labelledby="bill-notes-title" className={stacked ? undefined : "shell section-y"}>
      <SectionHeading id="bill-notes-title" title={title}>
        <p>Every electric bill in a deregulated state splits the same way. Once you can see it, comparing is simple.</p>
      </SectionHeading>
      <ol className={cx(stacked ? "mt-10 space-y-8" : "mt-14 grid gap-10 md:grid-cols-3 md:gap-8")}>
        {billNotes.map((note, index) => (
          <li key={note.label} className={cx("border-ink", stacked ? "border-l-2 pl-5" : "border-t-2 pt-6")}>
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-ink mono-label text-white">
                {index + 1}
              </span>
              <span className="mono-label text-muted">{note.label}</span>
            </div>
            <h3 className={cx("text-heading text-2xl", stacked ? "mt-3" : "mt-5")}>{note.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{note.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
