import type { PropMeta } from "@/lib/component-registry";

interface PropsTableProps {
  props: PropMeta[];
}

export function PropsTable({ props }: PropsTableProps) {
  if (props.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-body-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Prop</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Type</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Default</th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr key={prop.name} className="border-b border-border/50 last:border-0">
              <td className="px-4 py-3 font-mono text-primary">
                {prop.name}
                {prop.required && <span className="text-accent ml-1">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-muted-foreground">{prop.type}</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">
                {prop.default || "—"}
              </td>
              <td className="px-4 py-3 text-foreground/80">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
