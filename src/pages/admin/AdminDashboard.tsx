import AdminTaskbar from "@/components/AdminTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Home, Activity, DollarSign, CheckCircle, Eye } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { label: "Tổng dân số", value: "1,234", icon: Users, color: "primary" },
    { label: "Tổng hộ", value: "345", icon: Home, color: "accent" },
    { label: "Số tạm trú", value: "28", icon: Activity, color: "success" },
    { label: "Doanh thu NVH", value: "12.5tr", icon: DollarSign, color: "warning" },
  ];

  const tasks = [
    {
      id: 1,
      title: "Nguyễn Văn A - Đăng ký tạm trú",
      type: "Tạm trú",
      time: "30 phút trước",
      priority: "high",
    },
    {
      id: 2,
      title: "Lê Thị B - Yêu cầu sửa ngày sinh",
      type: "Sửa thông tin",
      time: "1 giờ trước",
      priority: "medium",
    },
    {
      id: 3,
      title: "Đặt sân cầu lông - 18:00 hôm nay",
      type: "Đặt lịch",
      time: "2 giờ trước",
      priority: "medium",
    },
    {
      id: 4,
      title: "Trần Văn C - Đăng ký tạm vắng",
      type: "Tạm vắng",
      time: "3 giờ trước",
      priority: "low",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Tổng quan Quản trị</h1>
        <p className="text-sm opacity-90">Dashboard thống kê & theo dõi</p>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {stats.map((stat, idx) => (
            <Card key={idx} className="p-4 shadow-medium">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                stat.color === "primary" ? "bg-primary/10" :
                stat.color === "accent" ? "bg-accent/10" :
                stat.color === "success" ? "bg-success/10" : "bg-warning/10"
              }`}>
                <stat.icon className={`w-5 h-5 ${
                  stat.color === "primary" ? "text-primary" :
                  stat.color === "accent" ? "text-accent" :
                  stat.color === "success" ? "text-success" : "text-warning"
                }`} />
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Tasks */}
        <Card className="p-6 shadow-medium mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Việc cần làm</h3>
            <Badge variant="destructive">{tasks.length}</Badge>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/50 transition-all">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  task.priority === "high" ? "bg-destructive" :
                  task.priority === "medium" ? "bg-warning" : "bg-success"
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm mb-1">{task.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className="text-xs">{task.type}</Badge>
                    <span>•</span>
                    <span>{task.time}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <AdminTaskbar />
    </div>
  );
};

export default AdminDashboard;
