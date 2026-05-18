import { portfolioData } from "@/lib/portfolio-data";
import PortfolioClient from "@/components/PortfolioClient";

export default function Home() {
  return <PortfolioClient data={portfolioData} />;
}
