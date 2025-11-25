import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users, Calendar, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6 shadow-strong">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Hệ thống Quản lý Dân cư
          </h1>
          <p className="text-xl text-muted-foreground mb-2">Phường [Tên Phường]</p>
          <p className="text-muted-foreground">Giải pháp số hóa quản lý cư dân và nhà văn hóa</p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-medium transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quản lý Dân cư</h3>
            <p className="text-sm text-muted-foreground">
              Quản lý thông tin hộ khẩu, nhân khẩu, tạm trú/tạm vắng hiệu quả
            </p>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Đặt lịch Nhà văn hóa</h3>
            <p className="text-sm text-muted-foreground">
              Đặt lịch sử dụng hội trường, sân thể thao trực tuyến dễ dàng
            </p>
          </Card>

          <Card className="p-6 hover:shadow-medium transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Báo cáo Thống kê</h3>
            <p className="text-sm text-muted-foreground">
              Thống kê, báo cáo dân số và hoạt động nhà văn hóa
            </p>
          </Card>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-soft"
          >
            Đăng nhập
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate("/register")}
            className="w-full sm:w-auto"
          >
            Đăng ký Cư dân
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-sm text-muted-foreground">
          <p>© 2024 Hệ thống Quản lý Dân cư. Phát triển bởi UBND Phường</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
