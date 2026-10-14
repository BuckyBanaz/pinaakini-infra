// Property Preview Card by shadcnspace, from 21st.dev
// https://21st.dev/shadcnspace/card-02
// Adapted: props instead of hard-coded listing, next/link + next/image, Pinaakini fields
// (category / extent / units) in place of bed / bath / area, optional action row.
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Expand, Home, LayoutGrid } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export interface PropertyPreviewCardProps {
  href: string;
  image: string;
  title: string;
  address: string;
  price: string;
  status?: string;
  stats: { category: string; extent: string; units: string };
  actions?: ReactNode;
}

const PreviewCard = ({ href, image, title, address, price, status, stats, actions }: PropertyPreviewCardProps) => (
  <Card className="relative gap-0 py-0 rounded-2xl group hover:shadow-2xl duration-300 overflow-hidden">
    <div className="overflow-hidden rounded-t-2xl">
      <Link href={href}>
        <div className="relative w-full h-72">
          <Image
            src={image}
            alt={`${title}, ${address}`}
            fill
            quality={90}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="w-full h-full object-cover rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75"
          />
        </div>
      </Link>

      {status && (
        <span className="absolute left-6 top-6 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-card-foreground">
          {status}
        </span>
      )}

      <div className="absolute top-6 right-6 hidden p-4 bg-white rounded-full group-hover:block">
        <ArrowRight className="text-card-foreground" />
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between gap-5 mb-6">
        <div className="min-w-0">
          <Link href={href}>
            <h3 className="text-xl font-medium duration-300 group-hover:text-primary">{title}</h3>
          </Link>
          <p className="text-base font-normal text-muted-foreground">{address}</p>
        </div>

        <Badge className="h-fit max-w-[45%] px-4 py-2 text-center text-sm font-normal leading-snug rounded-2xl bg-primary/10 text-primary hover:bg-primary/15">
          {price}
        </Badge>
      </div>

      <div className="flex">
        <div className="flex flex-col gap-2 pr-4 sm:pr-6 border-e border-border">
          <Home size={20} />
          <p className="text-sm">{stats.category}</p>
        </div>

        <div className="flex flex-col gap-2 px-4 sm:px-6 border-e border-border">
          <Expand size={20} />
          <p className="text-sm">{stats.extent}</p>
        </div>

        <div className="flex flex-col gap-2 pl-4 sm:pl-6 min-w-0">
          <LayoutGrid size={20} />
          <p className="text-sm">{stats.units}</p>
        </div>
      </div>

      {actions && <div className="mt-6 flex items-center gap-5 border-t border-border pt-5 text-sm">{actions}</div>}
    </div>
  </Card>
);

export default PreviewCard;
