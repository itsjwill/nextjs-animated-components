import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  getComponentBySlug,
  getAllSlugs,
  getRelatedComponents,
  CATEGORY_META,
  type ComponentCategory,
} from "@/lib/component-registry";
import { ComponentPage } from "./component-page";

interface Props {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return getAllSlugs();
}

export function generateMetadata({ params }: Props): Metadata {
  const component = getComponentBySlug(params.slug);
  if (!component) return { title: "Not Found" };

  return {
    title: `${component.name} — Motion Primitives`,
    description: component.description,
    openGraph: {
      title: `${component.name} — Motion Primitives Component`,
      description: component.description,
      type: "article",
    },
  };
}

export default function Page({ params }: Props) {
  const component = getComponentBySlug(params.slug);
  if (!component) notFound();

  const related = getRelatedComponents(params.slug);
  const categoryMeta = CATEGORY_META[params.category as ComponentCategory];

  return (
    <ComponentPage
      component={component}
      related={related}
      categoryLabel={categoryMeta?.label || params.category}
    />
  );
}
