import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Activity } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const ResidentBooking = () => {
  const [step, setStep] = useState<"select" | "time" | "confirm">("select");
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const services = [
    { id: 1, name: "Hội trường", price: "500.000đ/buổi", icon: Building2, color: "primary" },
    { id: 2, name: "Sân cầu lông", price: "100.000đ/giờ", icon: Activity, color: "accent" },
  ];

  const timeSlots = [
    { time: "08:00 - 10:00", available: true },
    { time: "10:00 - 12:00", available: false },
    { time: "14:00 - 16:00", available: true },
    { time: "16:00 - 18:00", available: true },
    { time: "18:00 - 20:00", available: false },
  ];

  const equipment = [
    "01 Loa JBL",
    "02 Micro không dây",
    "50 Ghế nhựa",
    "10 Bàn tròn",
  ];

  const handleSelectService = (service: any) => {
    setSelectedService(service);
    setStep("time");
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    toast.success("Đặt lịch thành công!");
    setDialogOpen(false);
    setStep("select");
    setSelectedService(null);
    setSelectedTime("");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Đặt lịch Nhà văn hóa</h1>
        <p className="text-sm opacity-90">Hội trường & Sân thể thao</p>
      </div>

      <div className="container max-w-4xl mx-auto px-4 -mt-4">
        {/* Step 1: Select Service */}
        {step === "select" && (
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold mb-3 px-2">Chọn dịch vụ</h3>
            {services.map((service) => (
              <Card key={service.id} className="p-6 hover:shadow-medium transition-all cursor-pointer"
                onClick={() => handleSelectService(service)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    service.color === "primary" ? "bg-primary/10" : "bg-accent/10"
                  }`}>
                    <service.icon className={`w-7 h-7 ${
                      service.color === "primary" ? "text-primary" : "text-accent"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg mb-1">{service.name}</p>
                    <p className="text-muted-foreground">{service.price}</p>
                  </div>
                  <Button>Chọn</Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Select Time */}
        {step === "time" && selectedService && (
          <div className="mb-6">
            <Card className="p-6 shadow-medium mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Đã chọn: {selectedService.name}</h3>
                <Button variant="outline" size="sm" onClick={() => setStep("select")}>
                  Đổi dịch vụ
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Chọn ngày</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className={cn("rounded-md border pointer-events-auto")}
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Chọn khung giờ</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={slot.available ? "outline" : "secondary"}
                        disabled={!slot.available}
                        onClick={() => handleSelectTime(slot.time)}
                        className="w-full"
                      >
                        {slot.time}
                        {!slot.available && " (Kín)"}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Thiết bị đi kèm</Label>
                  <div className="p-4 bg-muted rounded-lg">
                    <ul className="space-y-1">
                      {equipment.map((item, idx) => (
                        <li key={idx} className="text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Confirm Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đặt lịch</DialogTitle>
            <DialogDescription>
              {selectedService?.name} • {selectedTime}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="purpose">Lý do / Mục đích sử dụng</Label>
              <Textarea
                id="purpose"
                placeholder="Ví dụ: Tổ chức sinh nhật gia đình, tập luyện thể thao..."
                rows={3}
              />
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-2">Tổng tiền dự kiến</p>
              <p className="text-2xl font-bold text-primary">{selectedService?.price}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleConfirmBooking}>Xác nhận đặt lịch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResidentTaskbar />
    </div>
  );
};

export default ResidentBooking;
