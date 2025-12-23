"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Building2, Activity, Calendar as CalendarIcon, Clock, Check, AlertCircle, History, QrCode, Wallet, CreditCard, Info } from "lucide-react";

import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ResidentBooking = () => {
  const [activeTab, setActiveTab] = useState("booking"); 
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const [showQRDialog, setShowQRDialog] = useState(false);
  
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");

  // Services with pricing
  const services = [
    {
      id: 1,
      name: "Thuê hội trường",
      price: 500000,
      unit: "buổi",
      icon: Building2,
      desc: "Đám cưới, Sự kiện, Họp mặt. Sức chứa 200 người.",
      colorClass: "text-primary",      
      bgClass: "bg-primary/10"         
    },
    {
      id: 2,
      name: "Sân thể thao",
      price: 100000,
      unit: "giờ",
      icon: Activity,
      desc: "Cầu lông, Bóng chuyền hơi, Bóng bàn.",
      colorClass: "text-accent",       
      bgClass: "bg-accent/10"          
    },
  ];

  const timeSlots = [
    { time: "08:00 - 10:00", available: true },
    { time: "10:00 - 12:00", available: false },
    { time: "14:00 - 16:00", available: true },
    { time: "16:00 - 18:00", available: true },
    { time: "18:00 - 20:00", available: false },
    { time: "20:00 - 22:00", available: true },
  ];

  const equipment = [
    { name: "Loa kéo + 2 Mic", price: 100000 },
    { name: "Máy chiếu + Màn hình", price: 150000 },
    { name: "Bàn ghế thêm (20 bộ)", price: 200000 },
  ];

  const bookingHistory = [
    { id: "BK001", service: "Sân thể thao", date: "20/12/2024", time: "16:00-18:00", status: "finished", total: "100.000đ" },
    { id: "BK002", service: "Hội trường", date: "25/12/2024", time: "08:00-12:00", status: "pending", total: "650.000đ" },
  ];

  // Toggle equipment selection
  const toggleEquipment = (item: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((eq) => eq !== item) : [...prev, item]
    );
  };

  // Calculate total amount
  const totalAmount = useMemo(() => {
    let total = 0;
    if (selectedService) total += selectedService.price;
    selectedEquipment.forEach((eq) => {
      const found = equipment.find((e) => e.name === eq);
      if (found) total += found.price;
    });
    return total;
  }, [selectedService, selectedEquipment]);

  const handleConfirmBooking = () => {
    let finalPurpose = purpose === "Khác" ? customPurpose : purpose;

    if (!selectedService || !selectedTime || !finalPurpose) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (paymentMethod === "transfer") {
      setShowQRDialog(true);
    } else {
      toast.success("Gửi yêu cầu đặt lịch thành công! Vui lòng chờ duyệt.");
      setActiveTab("history");
    }
  };

  const handlePaymentComplete = () => {
    setShowQRDialog(false);
    toast.success("Đặt lịch thành công! BQL sẽ xác nhận trong 30 phút.");
    setActiveTab("history");
  };

  const renderStatus = (status: string) => {
    switch(status) {
      case 'pending': return <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10">Chờ duyệt</Badge>;
      case 'finished': return <Badge variant="outline" className="text-success border-success/30 bg-success/10">Hoàn thành</Badge>;
      case 'rejected': return <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10">Đã hủy</Badge>;
      default: return <Badge variant="outline">Không rõ</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      
      {/* HEADER */}
      <div className="gradient-primary py-8 pb-20 rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
              <Building2 className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">Đặt lịch Nhà văn hóa</h1>
              <p className="text-sm text-primary-foreground/80">Hội trường, Sân thể thao</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="bg-card shadow-strong p-1 rounded-full border-0 h-auto">
              <TabsTrigger value="booking" className="rounded-full px-6 py-2.5 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground transition-all">
                Đặt mới
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-full px-6 py-2.5 data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
                <History className="w-4 h-4" /> Lịch sử
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB: ĐẶT MỚI */}
          <TabsContent value="booking" className="animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* LEFT: Form */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Step 1: Service Selection */}
                <Card className="border-0 shadow-medium">
                  <CardHeader className="pb-3 border-b border-border">
                    <h2 className="font-bold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</span>
                      Chọn dịch vụ
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 grid sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={cn(
                          "cursor-pointer rounded-xl border-2 p-4 transition-all relative overflow-hidden bg-card hover:shadow-md",
                          selectedService?.id === service.id
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/30"
                        )}
                      >
                        {selectedService?.id === service.id && (
                          <div className="absolute top-0 right-0 p-1.5 gradient-primary text-primary-foreground rounded-bl-xl">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <div className={cn("p-3 rounded-xl shrink-0", service.bgClass)}>
                            <service.icon className={cn("w-6 h-6", service.colorClass)} />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">{service.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1 mb-2">{service.desc}</p>
                            <p className="text-primary font-bold text-lg">
                              {service.price.toLocaleString()}đ
                              <span className="text-xs font-normal text-muted-foreground">/{service.unit}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Step 2: Date & Time */}
                <Card className="border-0 shadow-medium">
                  <CardHeader className="pb-3 border-b border-border">
                    <h2 className="font-bold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</span>
                      Chọn ngày & giờ
                    </h2>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 flex justify-center border-b md:border-b-0 md:border-r border-border">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md"
                        />
                      </div>
                      <div className="p-5 flex-1 bg-muted/30">
                        <Label className="mb-3 block text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                          Khung giờ
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              variant="outline"
                              size="sm"
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className={cn(
                                "justify-between h-auto py-3 px-3 border-border bg-card text-sm",
                                selectedTime === slot.time && "border-primary bg-primary/10 text-primary ring-2 ring-primary font-semibold",
                                !slot.available && "opacity-50 bg-muted"
                              )}
                            >
                              <span>{slot.time}</span>
                              {!slot.available && <span className="text-[10px] text-destructive font-bold">KÍN</span>}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3: Details */}
                <Card className="border-0 shadow-medium">
                  <CardHeader className="pb-3 border-b border-border">
                    <h2 className="font-bold flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</span>
                      Chi tiết sử dụng
                    </h2>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Mục đích sử dụng <span className="text-destructive">*</span></Label>
                      <Select onValueChange={setPurpose} value={purpose}>
                        <SelectTrigger><SelectValue placeholder="Chọn mục đích" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sinh nhật">Tổ chức Sinh nhật</SelectItem>
                          <SelectItem value="Đám cưới">Đám cưới / Đám hỏi</SelectItem>
                          <SelectItem value="Họp CLB">Họp nhóm / CLB</SelectItem>
                          <SelectItem value="Thể thao">Tập luyện thể thao</SelectItem>
                          <SelectItem value="Khác">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                      {purpose === "Khác" && (
                        <Textarea placeholder="Nhập mục đích cụ thể..." className="mt-2" value={customPurpose} onChange={(e) => setCustomPurpose(e.target.value)} />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Thiết bị đi kèm</Label>
                      <div className="space-y-2">
                        {equipment.map((item) => (
                          <label key={item.name} className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all", selectedEquipment.includes(item.name) ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50")}>
                            <input 
                              type="checkbox" 
                              checked={selectedEquipment.includes(item.name)}
                              onChange={() => toggleEquipment(item.name)}
                              className="accent-primary w-4 h-4"
                            />
                            <span className="flex-1 text-sm">{item.name}</span>
                            <span className="text-sm font-semibold text-primary">+{item.price.toLocaleString()}đ</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* RIGHT: Summary & Payment */}
              <div className="space-y-6">
                <Card className="border-0 shadow-strong sticky top-4">
                  <CardHeader className="pb-3 border-b border-border gradient-primary rounded-t-xl">
                    <CardTitle className="text-primary-foreground text-lg">Tóm tắt đặt lịch</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {selectedService ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Dịch vụ</span>
                          <span className="font-semibold">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Ngày</span>
                          <span className="font-semibold">{selectedDate?.toLocaleDateString('vi-VN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Giờ</span>
                          <span className="font-semibold">{selectedTime || "Chưa chọn"}</span>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{selectedService.name}</span>
                            <span>{selectedService.price.toLocaleString()}đ</span>
                          </div>
                          {selectedEquipment.map(eq => {
                            const item = equipment.find(e => e.name === eq);
                            return item ? (
                              <div key={eq} className="flex justify-between text-sm text-muted-foreground">
                                <span>{eq}</span>
                                <span>{item.price.toLocaleString()}đ</span>
                              </div>
                            ) : null;
                          })}
                        </div>

                        <Separator />

                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg">Tổng cộng</span>
                          <span className="font-bold text-2xl text-primary">{totalAmount.toLocaleString()}đ</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Vui lòng chọn dịch vụ</p>
                      </div>
                    )}
                  </CardContent>

                  {selectedService && (
                    <CardFooter className="flex-col gap-3 p-4 pt-0">
                      <div className="w-full space-y-2">
                        <Label className="text-xs text-muted-foreground">Phương thức thanh toán</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => setPaymentMethod('transfer')}
                            className={cn("p-3 rounded-lg border text-center transition-all", paymentMethod === 'transfer' ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50")}
                          >
                            <QrCode className="w-5 h-5 mx-auto mb-1 text-primary" />
                            <span className="text-xs font-medium">Chuyển khoản</span>
                          </button>
                          <button 
                            onClick={() => setPaymentMethod('cash')}
                            className={cn("p-3 rounded-lg border text-center transition-all", paymentMethod === 'cash' ? "border-primary bg-primary/10" : "border-border hover:bg-muted/50")}
                          >
                            <Wallet className="w-5 h-5 mx-auto mb-1 text-accent" />
                            <span className="text-xs font-medium">Tiền mặt</span>
                          </button>
                        </div>
                      </div>
                      <Button onClick={handleConfirmBooking} className="w-full h-12 gradient-primary text-primary-foreground font-bold">
                        Xác nhận đặt lịch
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TAB: LỊCH SỬ */}
          <TabsContent value="history" className="animate-fade-in">
            <Card className="border-0 shadow-medium">
              <CardHeader className="border-b border-border">
                <CardTitle>Lịch sử đặt lịch</CardTitle>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-border">
                {bookingHistory.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/30">
                    <div>
                      <p className="font-semibold">{item.service}</p>
                      <p className="text-sm text-muted-foreground">{item.date} • {item.time}</p>
                    </div>
                    <div className="text-right">
                      {renderStatus(item.status)}
                      <p className="text-sm font-semibold mt-1">{item.total}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* QR Payment Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="max-w-sm text-center">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              Thanh toán chuyển khoản
            </DialogTitle>
            <DialogDescription>
              Quét mã QR để thanh toán
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            <div className="w-48 h-48 mx-auto bg-muted rounded-xl flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <QrCode className="w-20 h-20 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">QR VietQR</p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-muted/50 rounded-xl text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ngân hàng:</span>
                <span className="font-semibold">Vietcombank</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Số TK:</span>
                <span className="font-mono font-semibold">1234567890</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Chủ TK:</span>
                <span className="font-semibold">BQL Tổ 7 La Khê</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Số tiền:</span>
                <span className="font-bold text-primary">{totalAmount.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Nội dung:</span>
                <span className="font-mono text-xs">DAT {selectedDate?.toLocaleDateString('vi-VN').replace(/\//g, '')}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-warning/10 border border-warning/30 rounded-lg flex gap-2 text-left">
              <Info className="w-4 h-4 text-warning shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Sau khi chuyển khoản, nhấn "Đã thanh toán". BQL sẽ xác nhận trong 30 phút.</p>
            </div>
          </div>

          <Button onClick={handlePaymentComplete} className="w-full gradient-primary text-primary-foreground">
            Đã thanh toán
          </Button>
        </DialogContent>
      </Dialog>

      <ResidentTaskbar />
    </div>
  );
};

export default ResidentBooking;