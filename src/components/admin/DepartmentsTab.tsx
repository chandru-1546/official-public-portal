import DepartmentCard from "./DepartmentCard";

const DepartmentsTab = () => {
  const departments = [
    { name: "Public Works", activeIssues: 12, resolvedThisMonth: 45, avgResponseTime: "3.2d", status: "active" as const },
    { name: "Parks & Recreation", activeIssues: 8, resolvedThisMonth: 32, avgResponseTime: "2.8d", status: "active" as const },
    { name: "Sanitation", activeIssues: 15, resolvedThisMonth: 67, avgResponseTime: "1.9d", status: "active" as const },
    { name: "Traffic Management", activeIssues: 6, resolvedThisMonth: 23, avgResponseTime: "4.1d", status: "active" as const },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {departments.map((dept) => (
        <DepartmentCard key={dept.name} {...dept} />
      ))}
    </div>
  );
};

export default DepartmentsTab;
