import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Home, Activity, MessageSquare, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ResidentHome = () => {
  const navigate = useNavigate();

  const events = [
    { id: 1, title: "Chiến dịch tiêm chủng mùa xuân 2024", image: "🏥" },
    { id: 2, title: "Họp tổ dân phố tháng 3", image: "👥" },
    { id: 3, title: "Giải cầu lông phường", image: "🏸" },
  ];

  const news = [
    { id: 1, title: "Thông báo lịch thu phí dịch vụ tháng 3", time: "2 giờ trước" },
    { id: 2, title: "Kế hoạch cải tạo công viên khu phố", time: "1 ngày trước" },
    { id: 3, title: "Tuyên truyền phòng cháy chữa cháy", time: "2 ngày trước" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-xl">👤</span>
            </div>
            <div>
              <p className="text-sm opacity-90">Xin chào,</p>
              <p className="font-semibold text-lg">Nguyễn Văn A</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 -mt-4">
        {/* Quick Actions */}
        <Card className="p-4 mb-6 shadow-medium">
          <h3 className="font-semibold mb-4">Lối tắt</h3>
          <div className="grid grid-cols-4 gap-3">
            <button
              onClick={() => navigate("/resident/declaration")}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xs text-center">Tạm trú</span>
            </button>

            <button
              onClick={() => navigate("/resident/declaration")}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <span className="text-xs text-center">Tạm vắng</span>
            </button>

            <button
              onClick={() => navigate("/resident/booking")}
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                <span className="text-2xl">🏸</span>
              </div>
              <span className="text-xs text-center">Đặt sân</span>
            </button>

            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-secondary transition-all">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-warning" />
              </div>
              <span className="text-xs text-center">Góp ý</span>
            </button>
          </div>
        </Card>

        {/* Events Carousel */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 px-2">Sự kiện nổi bật</h3>
          <Carousel className="w-full">
            <CarouselContent>
              {events.map((event) => (
                <CarouselItem key={event.id}>
                  <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="text-center">
                      <div className="text-6xl mb-3">{event.image}</div>
                      <p className="font-medium">{event.title}</p>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* News */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 px-2">
            <h3 className="font-semibold">Tin tức & Thông báo</h3>
            <Button variant="ghost" size="sm">
              Xem tất cả
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="space-y-2">
            {news.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-soft transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <ResidentTaskbar />
    </div>
  );
};

export default ResidentHome;
