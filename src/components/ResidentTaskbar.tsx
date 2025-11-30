"use client";

import { Home, FileText, Calendar, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ResidentTaskbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    // Giảm padding container chính xuống py-0.5
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center justify-around py-0.5">
          
          {/* 1. TRANG CHỦ */}
          <button
            onClick={() => navigate("/resident/home")}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all w-16 outline-none", // Giảm gap, py và width
              isActive("/resident/home") 
                ? "text-primary bg-primary/10 font-bold" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {/* Giảm icon xuống w-5 h-5 */}
            <Home className={cn("w-5 h-5", isActive("/resident/home") && "fill-current")} />
            <span className="text-[9px] leading-none">Trang chủ</span>
          </button>

          {/* 2. HỘ KHẨU */}
          <button
            onClick={() => navigate("/resident/profile")}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all w-16 outline-none",
              isActive("/resident/profile")
                ? "text-primary bg-primary/10 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <FileText className={cn("w-5 h-5", isActive("/resident/profile") && "fill-current")} />
            <span className="text-[9px] leading-none">Hộ khẩu</span>
          </button>

          {/* 3. ĐẶT LỊCH */}
          <button
            onClick={() => navigate("/resident/booking")}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all w-16 outline-none",
              isActive("/resident/booking")
                ? "text-primary bg-primary/10 font-bold"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <Calendar className={cn("w-5 h-5", isActive("/resident/booking") && "fill-current")} />
            <span className="text-[9px] leading-none">Đặt lịch</span>
          </button>

          {/* 4. TÀI KHOẢN */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all w-16 outline-none",
                  location.pathname.includes("/resident/declaration")
                    ? "text-primary bg-primary/10 font-bold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <User className="w-5 h-5" />
                <span className="text-[9px] leading-none">Tài khoản</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mb-2 w-48 border-slate-200 shadow-xl">
              <DropdownMenuItem onClick={() => navigate("/resident/declaration")} className="cursor-pointer">
                Khai báo
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Đổi mật khẩu
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/login")} className="text-red-600 focus:text-red-600 cursor-pointer">
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