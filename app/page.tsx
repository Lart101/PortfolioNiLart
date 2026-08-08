import { getPortfolioData } from "@/lib/portfolio-data";
import PortfolioClient from "@/components/PortfolioClient";

export const revalidate = 0;

export default async function Home() {
  const data = await getPortfolioData();
  return <PortfolioClient data={data} />;
}
