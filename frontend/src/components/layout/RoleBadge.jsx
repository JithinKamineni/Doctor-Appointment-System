export default function RoleBadge({ role }) {
  if (!role) return null;
  return (
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
      {role}
    </span>
  );
}
