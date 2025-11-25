import { Home, FileText, Calendar, Bell, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

const ResidentTaskbar = () => {
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, title: "Thông báo tiêm chủng", time: "2 giờ trước" },
    { id: 2, title: "Họp tổ dân phố", time: "1 ngày trước" },
  ]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong z-50">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          <NavLink
            to="/resident/home"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Trang chủ</span>
          </NavLink>

          <NavLink
            to="/resident/profile"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Hộ khẩu</span>
          </NavLink>

          <NavLink
            to="/resident/booking"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Đặt lịch</span>
          </NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-3 h-auto py-2 relative">
                <Bell className="w-5 h-5" />
                <span className="text-xs">Thông báo</span>
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-2 w-2 h-2 bg-destructive rounded-full"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {notifications.map((notif) => (
                <DropdownMenuItem key={notif.id} className="flex flex-col items-start">
                  <span className="font-medium">{notif.title}</span>
                  <span className="text-xs text-muted-foreground">{notif.time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 px-3 h-auto py-2">
                <User className="w-5 h-5" />
                <span className="text-xs">Tài khoản</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate("/resident/declaration")}>
                Khai báo
              </DropdownMenuItem>
              <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/login")} className="text-destructive">
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default ResidentTaskbar;
