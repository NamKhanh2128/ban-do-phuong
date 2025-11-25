import AdminTaskbar from "@/components/AdminTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Activity, User, Clock, CheckCircle, XCircle } from "lucide-react";

const AdminBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const bookings = [
    {
      id: 1,
      service: "Hội trường",
      user: "Nguyễn Văn A",
      time: "08:00 - 10:00",
      date: "15/03/2024",
      status: "approved",
      purpose: "Họp gia đình",
    },
    {
      id: 2,
      service: "Sân cầu lông",
      user: "Trần Thị B",
      time: "18:00 - 20:00",
      date: "15/03/2024",
      status: "pending",
      purpose: "Tập luyện",
    },
    {
      id: 3,
      service: "Hội trường",
      user: "Lê Văn C",
      time: "14:00 - 17:00",
      date: "16/03/2024",
      status: "approved",
      purpose: "Sinh nhật",
    },
  ];

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Quản lý Đặt lịch</h1>
        <p className="text-sm opacity-90">Lịch sử dụng Nhà văn hóa</p>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-4">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Calendar View */}
          <Card className="p-6 shadow-medium">
            <h3 className="font-semibold mb-4">Lịch sử dụng</h3>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className={cn("rounded-md border pointer-events-auto")}
              />
            </div>
          </Card>

          {/* Legend */}
          <Card className="p-6 shadow-medium">
            <h3 className="font-semibold mb-4">Chú thích</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-success"></div>
                <span className="text-sm">Đã duyệt</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-warning"></div>
                <span className="text-sm">Chờ duyệt</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-destructive"></div>
                <span className="text-sm">Sự kiện khẩn cấp Tổ</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium mb-2">Tổng số lượt đặt tháng này</p>
              <p className="text-3xl font-bold text-primary">24</p>
            </div>
          </Card>
        </div>

        {/* Booking List */}
        <Card className="p-6 shadow-medium">
          <h3 className="font-semibold mb-4">Danh sách đặt lịch</h3>
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 p-4 rounded-lg border hover:bg-secondary/50 transition-all">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  booking.service === "Hội trường" ? "bg-primary/10" : "bg-accent/10"
                }`}>
                  {booking.service === "Hội trường" ? (
                    <Building2 className="w-6 h-6 text-primary" />
                  ) : (
                    <Activity className="w-6 h-6 text-accent" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{booking.service}</p>
                    <Badge variant={booking.status === "approved" ? "default" : "secondary"}>
                      {booking.status === "approved" ? "Đã duyệt" : "Chờ duyệt"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {booking.user}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {booking.time}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewBooking(booking)}>
                    Chi tiết
                  </Button>
                  {booking.status === "pending" && (
                    <>
                      <Button size="sm" className="bg-success hover:bg-success/90">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Booking Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết đặt lịch</DialogTitle>
            <DialogDescription>
              Mã đặt lịch: #{selectedBooking?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Người đặt</p>
                  <p className="font-medium">{selectedBooking.user}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dịch vụ</p>
                  <p className="font-medium">{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Thời gian</p>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ngày</p>
                  <p className="font-medium">{selectedBooking.date}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Mục đích sử dụng</p>
                <p className="font-medium">{selectedBooking.purpose}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AdminTaskbar />
    </div>
  );
};

export default AdminBooking;
