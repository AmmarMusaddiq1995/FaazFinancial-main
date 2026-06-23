import AccountingServiceTemplate from "@/components/accounting-service-template";
import { accountingServices } from "@/lib/accounting-services-data";

const service = accountingServices.find((s) => s.slug === "monthly-bookkeeping");

export const metadata = {
  title: `${service.name} Services | Faaz Financial Group`,
  description: service.intro,
};

export default function Page() {
  return <AccountingServiceTemplate service={service} />;
}
