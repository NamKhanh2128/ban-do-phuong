import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Home, Activity, Calendar, Bell, ChevronRight, Wallet
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

  // Notifications with unpaid fees badge
  const [notifications] = useState([
    { id: 1, title: "Thu phí vệ sinh tháng 12", time: "2 giờ trước", unread: true, type: "fee" },
    { id: 2, title: "Lịch tiêm chủng mở rộng", time: "1 ngày trước", unread: true, type: "event" },
    { id: 3, title: "Họp tổ dân phố", time: "2 ngày trước", unread: false, type: "meeting" },
  ]);

  const unpaidFees = notifications.filter(n => n.type === "fee" && n.unread).length;
  const unreadCount = notifications.filter(n => n.unread).length;

  // Quick Actions - 4 columns
  const quickActions = [
    { label: "Sổ Hộ Khẩu", icon: FileText, colorClass: "text-primary", bgClass: "bg-primary/10", link: "/resident/profile" },
    { label: "Tạm Trú", icon: Home, colorClass: "text-accent", bgClass: "bg-accent/10", link: "/resident/declaration" },
    { label: "Tạm Vắng", icon: Activity, colorClass: "text-success", bgClass: "bg-success/10", link: "/resident/declaration" },
    { label: "Đặt Lịch", icon: Calendar, colorClass: "text-warning", bgClass: "bg-warning/10", link: "/resident/booking" },
  ];

  // News Feed - horizontal scrollable
  const newsFeed = [
    { 
      id: 1, 
      title: "Lịch tiêm chủng mở rộng", 
      desc: "Tiêm vaccine cho trẻ em từ 5-11 tuổi tại NVH Tổ 7",
      date: "25/12/2024",
      icon: "💉",
      color: "bg-blue-500"
    },
    { 
      id: 2, 
      title: "Họp tổ dân phố", 
      desc: "Tổng kết công tác năm 2024 và triển khai kế hoạch 2025",
      date: "28/12/2024",
      icon: "👥",
      color: "bg-purple-500"
    },
    { 
      id: 3, 
      title: "Thu phí vệ sinh tháng 12", 
      desc: "Thời hạn nộp: trước 31/12/2024. Phí: 20.000đ/người",
      date: "15-31/12/2024",
      icon: "💰",
      color: "bg-green-500"
    },
  ];

  // Recent news list
  const recentNews = [
    { id: 1, title: "Thông báo cắt điện bảo trì lưới điện khu vực", time: "Hôm nay", isNew: true },
    { id: 2, title: "Kế hoạch phun thuốc diệt muỗi mùa mưa", time: "1 ngày trước", isNew: false },
    { id: 3, title: "Hướng dẫn đăng ký tạm trú online cho sinh viên", time: "2 ngày trước", isNew: false },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* HEADER with gradient */}
      <div className="gradient-primary px-6 pt-12 pb-24 rounded-b-[32px] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
        
        <div className="flex items-center justify-between relative z-10">
          {/* User info */}
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => navigate('/resident/profile')}
          >
            <div className="w-14 h-14 rounded-2xl border-2 border-white/30 flex items-center justify-center overflow-hidden bg-white/20 backdrop-blur-sm">
              <span className="text-3xl">👤</span>
            </div>
            <div className="text-primary-foreground">
              <p className="text-xs font-medium opacity-80">Xin chào</p>
              <p className="font-bold text-xl">Nguyễn Văn A</p>
              <p className="text-xs opacity-70">Tổ 7 - La Khê</p>
            </div>
          </div>

          {/* Notification Bell */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/20 relative rounded-full h-12 w-12">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center px-1">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-80 mt-2 p-0 overflow-hidden border-0 shadow-strong">
              <div className="gradient-primary p-3 flex justify-between items-center">
                <span className="font-bold text-sm text-primary-foreground">Thông báo</span>
                {unpaidFees > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    <Wallet className="w-3 h-3 mr-1" />
                    {unpaidFees} phí chưa nộp
                  </Badge>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto bg-card">
                {notifications.map((notif) => (
                  <DropdownMenuItem key={notif.id} className="flex flex-col items-start p-4 cursor-pointer border-b border-border last:border-0 hover:bg-muted focus:bg-muted">
                    <div className="flex justify-between w-full items-start">
                      <span className={`font-semibold text-sm ${notif.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notif.title}
                      </span>
                      {notif.unread && <span className="w-2 h-2 rounded-full bg-primary mt-1.5" />}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">{notif.time}</span>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="p-2 border-t border-border text-center bg-muted/50">
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Xem tất cả</span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 -mt-16 relative z-10 space-y-6">
        
        {/* Quick Actions Grid */}
        <Card className="border-0 shadow-strong p-4">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => navigate(action.link)}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-muted transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${action.bgClass} flex items-center justify-center group-hover:scale-105 transition-transform shadow-soft`}>
                  <action.icon className={`w-7 h-7 ${action.colorClass}`} />
                </div>
                <span className="text-xs font-medium text-foreground text-center leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* News Feed - Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-lg text-foreground">Sự kiện & Thông báo</h3>
            <Button variant="link" size="sm" className="text-primary h-auto p-0 font-semibold">
              Xem tất cả
            </Button>
          </div>
          
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4 pb-2">
              {newsFeed.map((item) => (
                <Card key={item.id} className="w-[280px] shrink-0 border-0 shadow-medium hover:shadow-strong transition-shadow cursor-pointer overflow-hidden group">
                  <div className={`h-2 ${item.color}`} />
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-foreground mb-1 whitespace-normal line-clamp-1 group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-muted-foreground whitespace-normal line-clamp-2 mb-2">
                          {item.desc}
                        </p>
                        <div className="flex items-center text-xs font-medium text-primary">
                          <Calendar className="w-3 h-3 mr-1" /> {item.date}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>

        {/* Recent News List */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="font-bold text-lg text-foreground">Bảng tin cư dân</h3>
          </div>
          <Card className="border-0 shadow-medium overflow-hidden divide-y divide-border">
            {recentNews.map((item) => (
              <div key={item.id} className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors cursor-pointer group">
                {item.isNew && (
                  <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                )}
                {!item.isNew && (
                  <span className="w-2 h-2 bg-muted-foreground/30 rounded-full shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            ))}
            <Button variant="ghost" className="w-full text-primary font-medium hover:text-primary hover:bg-primary/5 rounded-none py-4 h-auto">
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