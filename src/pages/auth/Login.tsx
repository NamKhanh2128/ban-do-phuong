import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication
    if (username.toLowerCase() === "admin") {
      toast.success("Đăng nhập thành công với tư cách Quản trị viên");
      navigate("/admin/dashboard");
    } else if (username) {
      toast.success("Đăng nhập thành công với tư cách Cư dân");
      navigate("/resident/home");
    } else {
      toast.error("Vui lòng nhập tên đăng nhập");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-strong">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Đăng nhập</h1>
          <p className="text-muted-foreground">Hệ thống Quản lý Dân cư Phường</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Số điện thoại / Tên đăng nhập</Label>
            <Input
              id="username"
              type="text"
              placeholder="Nhập số điện thoại hoặc tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
            Đăng nhập
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center text-sm">
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-primary hover:underline block w-full"
          >
            Quên mật khẩu?
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-muted-foreground hover:text-foreground block w-full"
          >
            Chưa có tài khoản? <span className="text-primary font-medium">Đăng ký ngay</span>
          </button>
        </div>

        <div className="mt-6 p-3 bg-muted rounded-lg text-xs text-muted-foreground">
          <p className="font-medium mb-1">Demo:</p>
          <p>• Nhập "admin" để xem giao diện Quản trị</p>
          <p>• Nhập bất kỳ tên nào khác để xem giao diện Cư dân</p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
