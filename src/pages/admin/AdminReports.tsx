import AdminTaskbar from "@/components/AdminTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, Users, TrendingUp, DollarSign } from "lucide-react";

const AdminReports = () => {
  const reports = [
    {
      id: 1,
      title: "Danh sách Cử tri",
      description: "Công dân từ 18 tuổi trở lên có quyền bầu cử",
      icon: Users,
      color: "primary",
      count: "856 người",
    },
    {
      id: 2,
      title: "Danh sách Trẻ em",
      description: "Trẻ em dưới 16 tuổi (Tặng quà 1/6, Trung thu)",
      icon: Users,
      color: "accent",
      count: "234 trẻ",
    },
    {
      id: 3,
      title: "Biến động Dân số",
      description: "Sinh, tử, nhập cư, xuất cư theo tháng/quý/năm",
      icon: TrendingUp,
      color: "success",
      count: "+12 người",
    },
    {
      id: 4,
      title: "Tài chính Nhà văn hóa",
      description: "Doanh thu từ đặt lịch và cho thuê thiết bị",
      icon: DollarSign,
      color: "warning",
      count: "12.5 triệu",
    },
    {
      id: 5,
      title: "Thống kê Tạm trú/vắng",
      description: "Số lượng, thời hạn, xu hướng tạm trú và tạm vắng",
      icon: Calendar,
      color: "primary",
      count: "28 hồ sơ",
    },
    {
      id: 6,
      title: "Sử dụng Nhà văn hóa",
      description: "Tần suất, thời gian, loại hình sử dụng",
      icon: FileText,
      color: "accent",
      count: "24 lượt/tháng",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Báo cáo & Thống kê</h1>
        <p className="text-sm opacity-90">Xuất báo cáo theo nhu cầu</p>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-4">
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {reports.map((report) => (
            <Card key={report.id} className="p-6 hover:shadow-medium transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  report.color === "primary" ? "bg-primary/10" :
                  report.color === "accent" ? "bg-accent/10" :
                  report.color === "success" ? "bg-success/10" : "bg-warning/10"
                }`}>
                  <report.icon className={`w-6 h-6 ${
                    report.color === "primary" ? "text-primary" :
                    report.color === "accent" ? "text-accent" :
                    report.color === "success" ? "text-success" : "text-warning"
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                  <p className="text-lg font-bold">{report.count}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Xem báo cáo
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Tải xuống
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 shadow-medium">
          <h3 className="font-semibold mb-4">Lọc nâng cao</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Loại báo cáo</label>
              <select className="w-full p-2 rounded-lg border bg-background">
                <option>Tất cả</option>
                <option>Dân cư</option>
                <option>Nhà văn hóa</option>
                <option>Tài chính</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Từ ngày</label>
              <input type="date" className="w-full p-2 rounded-lg border bg-background" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Đến ngày</label>
              <input type="date" className="w-full p-2 rounded-lg border bg-background" />
            </div>
          </div>
          <Button className="w-full">
            Tạo báo cáo tùy chỉnh
          </Button>
        </Card>
      </div>

      <AdminTaskbar />
    </div>
  );
};

export default AdminReports;
