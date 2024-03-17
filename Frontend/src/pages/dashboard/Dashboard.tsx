import DashboardCard from "../../components/dashboardCard/DashboardCard";
import Footer from "../../components/footer/Footer";
import DashboardHeader from "../../components/navbar/DashboardHeader";

const Dashboard = () => {
  return (
    <main className="relative">
      <DashboardHeader />
      <section className="py-4 px-5 md:px-20 sm:px-10 grid gap-7 mt-4">
        <div>
          <p className="font-workSans text-lg font-medium">Recent files</p>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Dashboard;
