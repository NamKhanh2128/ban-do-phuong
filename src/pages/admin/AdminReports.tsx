import { useState } from "react";
import AdminTaskbar from "@/components/AdminTaskbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  FileText, Download, Users, TrendingUp, DollarSign, Calendar,
  Baby, UserCheck, Filter, Search, ChevronRight
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AdminReports = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: "voters",
      title: "Danh sách Cử tri",
      description: "Công dân từ 18 tuổi trở lên có quyền bầu cử",
      icon: UserCheck,
      color: "primary",
      count: "1,248",
      filter: "Tuổi ≥ 18",
    },
    {
      id: "children",
      title: "Danh sách Trẻ em",
      description: "Trẻ em dưới 16 tuổi (Tặng quà 1/6, Trung thu)",
      icon: Baby,
      color: "accent",
      count: "476",
      filter: "Tuổi < 16",
    },
    {
      id: "elderly",
      title: "Danh sách Người cao tuổi",
      description: "Người từ 60 tuổi trở lên (Thăm hỏi, Mừng thọ)",
      icon: Users,
      color: "success",
      count: "246",
      filter: "Tuổi > 60",
    },
    {
      id: "population",
      title: "Biến động Dân số",
      description: "Sinh, tử, nhập cư, xuất cư theo tháng/quý/năm",
      icon: TrendingUp,
      color: "warning",
      count: "+44",
      filter: "6 tháng gần nhất",
    },
    {
      id: "finance",
      title: "Tài chính Nhà văn hóa",
      description: "Doanh thu từ đặt lịch và cho thuê thiết bị",
      icon: DollarSign,
      color: "primary",
      count: "15.2tr",
      filter: "Tháng 12/2024",
    },
    {
      id: "booking",
      title: "Sử dụng Nhà văn hóa",
      description: "Tần suất, thời gian, loại hình sử dụng",
      icon: Calendar,
      color: "accent",
      count: "28 lượt",
      filter: "Tháng này",
    },
  ];

  const handleExport = (reportId: string) => {
    toast.success("Đang xuất file Excel...");
    // Simulate download
    setTimeout(() => {
      toast.success("Tải xuống thành công!");
    }, 1500);
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary": return { bg: "bg-primary/10", text: "text-primary" };
      case "accent": return { bg: "bg-accent/10", text: "text-accent" };
      case "success": return { bg: "bg-success/10", text: "text-success" };
      case "warning": return { bg: "bg-warning/10", text: "text-warning" };
      default: return { bg: "bg-muted", text: "text-muted-foreground" };
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 py-8 pb-20 rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">Báo cáo & Thống kê</h1>
          <p className="text-sm text-primary-foreground/80">Xuất danh sách theo tiêu chí</p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
        
        {/* Report Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => {
            const colors = getColorClasses(report.color);
            return (
              <Card 
                key={report.id} 
                className="border-0 shadow-medium hover:shadow-strong transition-all cursor-pointer group"
                onClick={() => setSelectedReport(report.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors.bg}`}>
                      <report.icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{report.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{report.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="secondary" className="text-xs">{report.filter}</Badge>
                        <span className={`font-bold text-lg ${colors.text}`}>{report.count}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1 gradient-primary text-primary-foreground" onClick={(e) => { e.stopPropagation(); }}>
                      <FileText className="w-4 h-4 mr-1" /> Xem
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); handleExport(report.id); }}>
                      <Download className="w-4 h-4 mr-1" /> Excel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Custom Filter Section */}
        <Card className="border-0 shadow-strong">
          <CardHeader className="border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Tạo báo cáo tùy chỉnh
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Loại báo cáo</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Chọn loại" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="population">Dân cư</SelectItem>
                    <SelectItem value="household">Hộ khẩu</SelectItem>
                    <SelectItem value="temporary">Tạm trú/vắng</SelectItem>
                    <SelectItem value="finance">Tài chính</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Độ tuổi</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Tất cả" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="child">Dưới 16 tuổi</SelectItem>
                    <SelectItem value="adult">18 - 60 tuổi</SelectItem>
                    <SelectItem value="elderly">Trên 60 tuổi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Từ ngày</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Đến ngày</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="gradient-primary text-primary-foreground">
                <Search className="w-4 h-4 mr-2" /> Tạo báo cáo
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Xuất Excel
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-soft p-4">
            <p className="text-xs text-muted-foreground mb-1">Mầm non (0-5)</p>
            <p className="text-2xl font-bold text-primary">89</p>
          </Card>
          <Card className="border-0 shadow-soft p-4">
            <p className="text-xs text-muted-foreground mb-1">Tiểu học (6-10)</p>
            <p className="text-2xl font-bold text-accent">156</p>
          </Card>
          <Card className="border-0 shadow-soft p-4">
            <p className="text-xs text-muted-foreground mb-1">THCS (11-14)</p>
            <p className="text-2xl font-bold text-success">134</p>
          </Card>
          <Card className="border-0 shadow-soft p-4">
            <p className="text-xs text-muted-foreground mb-1">THPT (15-18)</p>
            <p className="text-2xl font-bold text-warning">97</p>
          </Card>
        </div>
      </div>

      <AdminTaskbar />
    </div>
  );
};

export default AdminReports;