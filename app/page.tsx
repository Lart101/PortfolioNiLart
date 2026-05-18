import { fetchPortfolioData } from "@/lib/portfolio-data";
import { notFound } from "next/navigation";
import PortfolioClient from "@/components/PortfolioClient";

export default async function Home() {
  let data;
  try {
    data = await fetchPortfolioData();
  } catch {
    notFound();
  }

  return <PortfolioClient data={data} />;
}
