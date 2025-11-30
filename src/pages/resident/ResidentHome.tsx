import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, Activity, MessageSquare, ChevronRight, Bell, Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ResidentHome = () => {
  const navigate = useNavigate();

  // --- STATE: THÔNG BÁO (Chuyển từ Taskbar sang đây) ---
  const [notifications] = useState([
    { id: 1, title: "Thông báo tiêm chủng", time: "2 giờ trước", unread: true },
    { id: 2, title: "Họp tổ dân phố", time: "1 ngày trước", unread: true },
    { id: 3, title: "Đã thu phí dịch vụ T3", time: "2 ngày trước", unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // --- DATA MẪU ---
  const events = [
    { id: 1, title: "Chiến dịch tiêm chủng mùa xuân 2024", date: "15/03", icon: "🏥" },
    { id: 2, title: "Họp tổ dân phố tháng 3", date: "18/03", icon: "👥" },
    { id: 3, title: "Giải cầu lông phường mở rộng", date: "25/03", icon: "🏸" },
  ];

  const news = [
    { id: 1, title: "Thông báo lịch thu phí dịch vụ tháng 3", time: "2 giờ trước", isNew: true },
    { id: 2, title: "Kế hoạch bảo trì thang máy tòa A", time: "1 ngày trước", isNew: false },
    { id: 3, title: "Tuyên truyền phòng cháy chữa cháy", time: "2 ngày trước", isNew: false },
  ];

  const quickActions = [
    { label: "Tạm trú", icon: Home, colorClass: "text-primary", bgClass: "bg-primary/10", link: "/resident/declaration" },
    { label: "Tạm vắng", icon: Activity, colorClass: "text-accent", bgClass: "bg-accent/10", link: "/resident/declaration" },
    { label: "Đặt lịch", icon: Activity, colorClass: "text-green-600", bgClass: "bg-green-500/10", link: "/resident/booking" },
    { label: "Góp ý", icon: MessageSquare, colorClass: "text-amber-500", bgClass: "bg-amber-500/10", link: "/resident/feedback" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 pt-10 pb-8 text-primary-foreground rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          
          {/* GÓC TRÁI: Avatar & Tên - Link tới Hộ Khẩu */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate('/resident/profile')}
          >
            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm">
               <span className="text-2xl">👤</span>
            </div>
            <div>
              <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Xin chào</p>
              <p className="font-bold text-xl">Nguyễn Văn A</p>
            </div>
          </div>

          {/* GÓC PHẢI: Chuông thông báo (Dropdown Menu) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 relative rounded-full h-10 w-10">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-72 mt-2 p-0 overflow-hidden border-none shadow-xl">
              <div className="bg-slate-50 p-3 border-b border-slate-100 flex justify-between items-center">
                 <span className="font-bold text-sm text-slate-700">Thông báo</span>
                 <span className="text-xs text-primary font-medium cursor-pointer">Đánh dấu đã đọc</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-3 cursor-pointer border-b border-slate-50 last:border-0 hover:bg-slate-50 focus:bg-slate-50">
                    <div className="flex justify-between w-full">
                       <span className={`font-semibold text-sm ${notif.unread ? 'text-slate-800' : 'text-slate-500'}`}>{notif.title}</span>
                       {notif.unread && <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></span>}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{notif.time}</span>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-2 border-t border-slate-100 text-center">
                 <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Xem tất cả</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container max-w-4xl mx-auto px-4 pt-6 space-y-8">
        
        {/* 1. Quick Actions */}
        <section>
           <h3 className="font-bold text-lg mb-4 text-slate-800 px-1">Tiện ích nhanh</h3>
           <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.link)}
                className="flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.bgClass} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <action.icon className={`w-7 h-7 ${action.colorClass}`} />
                </div>
                <span className="text-xs font-medium text-slate-600 text-center">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Events */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-lg text-slate-800">Sự kiện sắp tới</h3>
            <Button variant="link" size="sm" className="text-primary h-auto p-0 font-semibold">Xem tất cả</Button>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 p-1">
              {events.map((event) => (
                <Card key={event.id} className="w-[220px] shrink-0 border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-primary/50 to-accent/50"></div>
                  <CardContent className="p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                        <span className="text-3xl">{event.icon}</span>
                        <div className="flex items-center text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                            <Calendar className="w-3 h-3 mr-1" /> {event.date}
                        </div>
                    </div>
                    <p className="font-semibold text-sm whitespace-normal line-clamp-2">{event.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* 3. News */}
        <section>
           <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-lg text-slate-800">Bảng tin cư dân</h3>
          </div>
          <Card className="border-none shadow-sm overflow-hidden divide-y">
            {news.map((item) => (
              <div key={item.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer relative group">
                {item.isNew && <span className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full ring-4 ring-red-100"></span>}
                
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                  <MessageSquare className="w-5 h-5 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="font-medium text-sm text-slate-800 mb-1 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            <Button variant="ghost" className="w-full text-primary font-medium hover:text-primary hover:bg-primary/5 rounded-t-none py-3 h-auto">
                Xem tất cả tin tức <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Card>
        </section>
      </div>

      <ResidentTaskbar />
    </div>
  );
};

export default ResidentHome;