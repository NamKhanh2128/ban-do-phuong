import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Yêu cầu đăng ký đã được gửi!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-strong">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Đăng ký Cư dân mới</h1>
          <p className="text-muted-foreground">Đăng ký tài khoản truy cập hệ thống</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Họ và tên đầy đủ</Label>
            <Input
              id="fullname"
              type="text"
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cccd">Số CCCD/CMND</Label>
            <Input
              id="cccd"
              type="text"
              placeholder="Nhập số CCCD/CMND"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Sau khi đăng ký, vui lòng chờ Tổ trưởng duyệt tài khoản. Bạn sẽ nhận được thông báo qua số điện thoại đã đăng ký.
            </AlertDescription>
          </Alert>

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
            Gửi yêu cầu đăng ký
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-foreground"
          >
            Đã có tài khoản? <span className="text-primary font-medium">Đăng nhập</span>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Register;
