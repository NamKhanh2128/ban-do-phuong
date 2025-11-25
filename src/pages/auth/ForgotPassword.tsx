import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Yêu cầu cấp lại mật khẩu đã được gửi!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-strong">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-warning to-warning/80 mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Quên mật khẩu</h1>
          <p className="text-muted-foreground">Nhập số CCCD để cấp lại mật khẩu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cccd">Số CCCD/CMND</Label>
            <Input
              id="cccd"
              type="text"
              placeholder="Nhập số định danh của bạn"
              required
            />
            <p className="text-xs text-muted-foreground">
              Mật khẩu mới sẽ được gửi qua số điện thoại đã đăng ký
            </p>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-warning to-warning/90">
            Gửi yêu cầu
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-foreground"
          >
            Quay lại <span className="text-primary font-medium">Đăng nhập</span>
          </button>
        </div>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex gap-3">
            <Building2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Cần hỗ trợ?</p>
              <p>Liên hệ Tổ trưởng hoặc đến trực tiếp UBND Phường để được hỗ trợ cấp lại mật khẩu.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
