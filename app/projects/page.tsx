import { getPortfolioData } from "@/lib/portfolio-data";
import ProjectsClient from "@/components/ProjectsClient";

export const revalidate = 0;

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  return <ProjectsClient data={data} />;
}
