import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vibe/$vibeId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/vibe/$vibeId"!</div>;
}
