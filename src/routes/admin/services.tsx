import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/services")({
  component: ServicesLayout,
});

function ServicesLayout() {
  return <Outlet />;
}
