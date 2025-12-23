import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Eye, EyeOff, Phone, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (phone.toLowerCase() === "admin" || phone === "0909000000") {
      toast.success("Đăng nhập thành công với tư cách Tổ trưởng");
      navigate("/admin/dashboard");
    } else if (phone) {
      toast.success("Đăng nhập thành công!");
      navigate("/resident/home");
    } else {
      toast.error("Vui lòng nhập số điện thoại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl -ml-48 -mb-48" />
      
      <Card className="w-full max-w-md p-8 shadow-strong relative z-10 border-0">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-primary mb-4 shadow-glow">
            <Building2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Đăng nhập</h1>
          <p className="text-muted-foreground text-sm">Hệ thống Quản lý Dân cư - Tổ 7 La Khê</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="text"
                placeholder="Nhập số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 pr-10 h-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity">
            Đăng nhập
          </Button>
        </form>

        <div className="mt-6 space-y-3 text-center text-sm">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-primary hover:underline block w-full font-medium"
          >
            Quên mật khẩu?
          </button>
          <div className="text-muted-foreground">
            Chưa có tài khoản?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-primary font-semibold hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-xl text-xs text-muted-foreground">
          <p className="font-semibold mb-2 text-foreground">Demo đăng nhập:</p>
          <p>• Nhập "admin" hoặc "0909000000" → Giao diện Tổ trưởng</p>
          <p>• Nhập số khác → Giao diện Cư dân</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;