import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/submissions")({
  component: SubmissionsLayout,
});

function SubmissionsLayout() {
  return <Outlet />;
}
