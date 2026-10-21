import { ButtonLink, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>A LITTLE DETOUR</Eyebrow>
      <h1>
        Let’s get you
        <br />
        back on track.
      </h1>
      <p>This page isn’t here. Your next energy choice still is.</p>
      <ButtonLink href="/">Back to PowerSetter</ButtonLink>
    </section>
  );
}
