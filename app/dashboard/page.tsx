import Protected from '@/components/Protected';

const DashboardPage = () => {
  return (
    <Protected>
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome to your Dashboard</h1>
      </div>
    </Protected>
  );
};

export default DashboardPage;
