import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getProjectBySlug, getActiveProjects } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const activeProjects = getActiveProjects();
  return activeProjects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Property Not Found | Pinaakini Infra",
    };
  }

  return {
    title: `${project.name} | Pinaakini Infra Private Limited`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: `${project.name} — ${project.location}`,
      description: project.shortDescription,
      images: [project.featuredImage],
      type: "website",
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Related projects in the active catalog
  const relatedProjects = getActiveProjects().filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
