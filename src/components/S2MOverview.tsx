import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "How it works",
    description:
      "Select dietary restrictions, generate a plan, and review every meal with recipe-level detail in one flow.",
  },
  {
    title: "Research engine",
    description:
      "The deterministic planning engine maps supported restrictions to the recipe dataset with clear fallback behavior.",
  },
  {
    title: "Assets inventory",
    description:
      "Core visual, UI, and infrastructure assets are tracked in ASSETS_INVENTORY.md for production readiness.",
  },
  {
    title: "Artifacts",
    description:
      "Product, deployment, and quality artifacts are documented in ARTIFACTS.md for handoff and launch execution.",
  },
];

const S2MOverview = () => {
  return (
    <section id="how-it-works" className="px-4 pb-20">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">S2M delivery overview</h2>
          <p className="text-muted-foreground">
            Full website delivery includes product flow, research, assets, and artifacts coverage.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section) => (
            <Card key={section.title} className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold">{section.title}</h3>
              <p className="mt-2 text-muted-foreground">{section.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default S2MOverview;
