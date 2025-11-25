import { BarChart3, Users, Calendar, Package, FileText, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";

const AdminTaskbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong z-50">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          <NavLink
            to="/admin/dashboard"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Tổng quan</span>
          </NavLink>

          <NavLink
            to="/admin/residents"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Dân cư</span>
          </NavLink>

          <NavLink
            to="/admin/booking"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Đặt lịch</span>
          </NavLink>

          <NavLink
            to="/admin/assets"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <Package className="w-5 h-5" />
            <span className="text-xs">Tài sản</span>
          </NavLink>

          <NavLink
            to="/admin/reports"
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            activeClassName="text-primary bg-primary/10 font-medium"
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Báo cáo</span>
          </NavLink>

          <button
            onClick={() => navigate("/login")}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs">Đăng xuất</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminTaskbar;
