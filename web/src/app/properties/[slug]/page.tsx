import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getActiveProjects, getProjectBySlug } from "@/lib/projects";
import ProjectDetail from "./ProjectDetail";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getActiveProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Property not found | Pinaakini Infra" };
  return {
    title: `${project.name} | Pinaakini Infra`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: `${project.name} — ${project.location}`,
      description: project.shortDescription,
      images: [project.featuredImage],
      type: "website",
    },
  };
}

// The page itself is static; only the part that reads the URL waits inside Suspense
// (Next.js 16 cache components: URL data must be read under a Suspense boundary).
export default function PropertyDetailPage({ params }: { params: Params }) {
  return (
    <PageShell>
      <Suspense fallback={<DetailFallback />}>
        <Detail params={params} />
      </Suspense>
    </PageShell>
  );
}

async function Detail({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const related = getActiveProjects()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);
  return <ProjectDetail project={project} related={related} />;
}

function DetailFallback() {
  return (
    <div className="flex min-h-[100svh] items-end bg-obsidian px-[var(--margin)] pb-16">
      <div className="h-24 w-2/3 animate-pulse rounded-2xl bg-white/10" />
    </div>
  );
}
