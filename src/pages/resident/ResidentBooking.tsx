"use client";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Building2, Activity, Calendar as CalendarIcon, Clock, Check, AlertCircle, History, CreditCard, Wallet, Banknote } from "lucide-react";

// Components & UI
import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ResidentBooking = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState("booking"); 
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  
  // Form State
  const [purpose, setPurpose] = useState("");
  const [customPurpose, setCustomPurpose] = useState("");
  const [address, setAddress] = useState("Căn hộ 12A.05");
  const [phone, setPhone] = useState("0912345678"); 

  // --- DATA ---
  const services = [
    {
      id: 1,
      name: "Hội trường cư dân",
      price: 500000,
      unit: "buổi",
      icon: Building2,
      desc: "Sức chứa 200 người, phù hợp tiệc, hội nghị.",
      colorClass: "text-primary",      
      bgClass: "bg-primary/10"         
    },
    {
      id: 2,
      name: "Sân thể thao đa năng",
      price: 100000,
      unit: "giờ",
      icon: Activity,
      desc: "Cầu lông, Bóng chuyền hơi.",
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
  ];

  const equipment = [
    { name: "Loa kéo + 2 Mic", price: 100000 },
    { name: "Máy chiếu + Màn", price: 150000 },
    { name: "Bàn ghế thêm (20 bộ)", price: 200000 },
  ];

  const bookingHistory = [
    { id: "BK001", service: "Sân thể thao", date: "20/11/2024", time: "16:00-18:00", status: "finished", total: "100.000đ" },
    { id: "BK002", service: "Hội trường", date: "25/11/2024", time: "08:00-12:00", status: "pending", total: "650.000đ" },
    { id: "BK003", service: "Sân thể thao", date: "28/11/2024", time: "18:00-20:00", status: "rejected", total: "100.000đ" },
  ];

  // --- HANDLERS ---
  const toggleEquipment = (item: string) => {
    setSelectedEquipment((prev) =>
      prev.includes(item) ? prev.filter((eq) => eq !== item) : [...prev, item]
    );
  };

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
      toast.error("Vui lòng chọn Dịch vụ, Giờ và Mục đích!");
      return;
    }

    toast.success("Gửi yêu cầu thành công! BQL sẽ duyệt trong 30 phút.");
    setActiveTab("history"); 
  };

  const renderStatus = (status: string) => {
    switch(status) {
      case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">Chờ duyệt</Badge>;
      case 'finished': return <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Hoàn thành</Badge>;
      case 'rejected': return <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Đã hủy</Badge>;
      default: return <Badge variant="outline">Không rõ</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-10">
      
      {/* HEADER */}
      <div className="bg-gradient-to-br from-primary to-accent py-8 pb-20 text-white rounded-b-[30px] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner">
                  <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                  <h1 className="text-2xl font-bold">Đặt Tiện Ích</h1>
                  <p className="text-sm opacity-90">Hội trường, Sân tập, BBQ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        
        {/* TABS NAVIGATION */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="bg-white/90 backdrop-blur shadow-md p-1 rounded-full border border-white/20 h-auto">
              <TabsTrigger value="booking" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all">
                Đặt mới
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-full px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white transition-all flex items-center gap-2">
                <History className="w-4 h-4" /> Lịch sử
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: ĐẶT MỚI */}
          <TabsContent value="booking" className="animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* CỘT TRÁI: FORM NHẬP LIỆU */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* 1. Chọn Dịch vụ */}
                <Card className="border-none shadow-sm overflow-hidden">
                  <CardHeader className="bg-white border-b border-slate-100 pb-3 pt-4">
                      <h2 className="text-base font-bold flex items-center gap-2 text-slate-800 uppercase tracking-tight">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
                        Chọn dịch vụ
                      </h2>
                  </CardHeader>
                  <CardContent className="p-4 grid sm:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className={cn(
                          "cursor-pointer rounded-xl border-2 p-4 transition-all relative overflow-hidden bg-white hover:shadow-md",
                          selectedService?.id === service.id
                            ? "border-primary bg-primary/5"
                            : "border-slate-100 hover:border-primary/30"
                        )}
                      >
                        {selectedService?.id === service.id && (
                          <div className="absolute top-0 right-0 p-1.5 bg-primary text-white rounded-bl-xl">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <div className={cn("p-2.5 rounded-lg shrink-0", service.bgClass)}>
                            <service.icon className={cn("w-6 h-6", service.colorClass)} />
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-800 text-sm">{service.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1 mb-1 line-clamp-2">{service.desc}</p>
                            <p className="text-primary font-bold text-sm">
                              {service.price.toLocaleString()}đ <span className="text-[10px] font-normal text-muted-foreground">/{service.unit}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* 2. Thời gian */}
                <Card className="border-none shadow-sm overflow-hidden">
                  <CardHeader className="bg-white border-b border-slate-100 pb-3 pt-4">
                      <h2 className="text-base font-bold flex items-center gap-2 text-slate-800 uppercase tracking-tight">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
                        Ngày & Giờ
                      </h2>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-4 flex justify-center border-b md:border-b-0 md:border-r border-slate-100">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md"
                          classNames={{
                            head_cell: "text-muted-foreground font-normal text-[0.8rem]",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                          }}
                        />
                      </div>
                      <div className="p-5 flex-1 bg-slate-50">
                        <Label className="mb-3 block text-slate-600 text-xs font-semibold uppercase tracking-wider">
                           Khung giờ trống
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
                                "justify-start h-auto py-2.5 px-3 border-slate-200 bg-white text-xs",
                                selectedTime === slot.time && "border-primary bg-primary/10 text-primary ring-1 ring-primary font-semibold",
                                !slot.available && "opacity-50 bg-slate-100 text-slate-400 decoration-slate-400"
                              )}
                            >
                              <span className="flex-1 text-left">{slot.time}</span>
                              {!slot.available && <span className="text-[9px] text-red-500 font-bold ml-1">KÍN</span>}
                            </Button>
                          ))}
                        </div>
                        {!selectedTime && (
                          <div className="mt-4 text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-100 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3" /> Hãy chọn ngày và giờ để tiếp tục
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 3. Chi tiết & Thanh toán */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Form thông tin */}
                  <Card className="border-none shadow-sm">
                    <CardHeader className="pb-2 pt-4 border-b border-slate-100">
                      <h2 className="text-base font-bold flex items-center gap-2 text-slate-800 uppercase tracking-tight">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
                        Chi tiết sử dụng
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-500">Người đặt</Label>
                            <Input value="Nguyễn Văn A" disabled className="bg-slate-100 h-8 text-sm" />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-xs text-slate-500">Căn hộ</Label>
                            <Input value={address} disabled className="bg-slate-100 h-8 text-sm" />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label className="text-xs text-slate-500">Mục đích <span className="text-red-500">*</span></Label>
                          <Select onValueChange={setPurpose} value={purpose}>
                          <SelectTrigger className="h-9">
                            <SelectValue placeholder="-- Chọn mục đích --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Sinh nhật">Tổ chức Sinh nhật</SelectItem>
                            <SelectItem value="Họp tổ dân phố">Họp nhóm / CLB</SelectItem>
                            <SelectItem value="Thể thao">Tập luyện thể thao</SelectItem>
                            <SelectItem value="Khác">Khác</SelectItem>
                          </SelectContent>
                        </Select>
                        {purpose === "Khác" && (
                          <Textarea 
                            placeholder="Nhập cụ thể..." 
                            className="mt-2 text-sm min-h-[60px]" 
                            value={customPurpose}
                            onChange={(e) => setCustomPurpose(e.target.value)}
                          />
                        )}
                        </div>

                        <div className="space-y-2">
                           <Label className="text-xs text-slate-500">Thiết bị đi kèm</Label>
                           <div className="space-y-2">
                              {equipment.map((item) => (
                                <div key={item.name} className="flex items-center space-x-2">
                                   <input 
                                     type="checkbox" 
                                     id={item.name} 
                                     checked={selectedEquipment.includes(item.name)}
                                     onChange={() => toggleEquipment(item.name)}
                                     className="accent-primary w-4 h-4"
                                   />
                                   <label htmlFor={item.name} className="text-sm flex-1 cursor-pointer select-none">{item.name}</label>
                                   <span className="text-xs text-muted-foreground">{item.price.toLocaleString()}đ</span>
                                </div>
                              ))}
                           </div>
                        </div>
                    </CardContent>
                  </Card>

                  {/* Phương thức thanh toán */}
                  <Card className="border-none shadow-sm h-full flex flex-col">
                    <CardHeader className="pb-2 pt-4 border-b border-slate-100">
                      <h2 className="text-base font-bold flex items-center gap-2 text-slate-800 uppercase tracking-tight">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">4</span>
                        Thanh toán
                      </h2>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-4 flex-1">
                       <div 
                         className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all", paymentMethod === 'wallet' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-200 hover:bg-slate-50")}
                         onClick={() => setPaymentMethod('wallet')}
                       >
                          <Wallet className="w-5 h-5 text-primary" />
                          <div className="flex-1">
                             <p className="text-sm font-semibold">Ví Cư Dân</p>
                             <p className="text-[10px] text-muted-foreground">Số dư: 2.500.000đ</p>
                          </div>
                          {paymentMethod === 'wallet' && <div className="w-3 h-3 bg-primary rounded-full" />}
                       </div>

                       <div 
                         className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all", paymentMethod === 'transfer' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-200 hover:bg-slate-50")}
                         onClick={() => setPaymentMethod('transfer')}
                       >
                          <CreditCard className="w-5 h-5 text-accent" />
                          <div className="flex-1">
                             <p className="text-sm font-semibold">Chuyển khoản NH</p>
                             <p className="text-[10px] text-muted-foreground">VietQR - Xác nhận tự động</p>
                          </div>
                          {paymentMethod === 'transfer' && <div className="w-3 h-3 bg-primary rounded-full" />}
                       </div>

                       <div 
                         className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all", paymentMethod === 'cash' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-slate-200 hover:bg-slate-50")}
                         onClick={() => setPaymentMethod('cash')}
                       >
                          <Banknote className="w-5 h-5 text-green-600" />
                          <div className="flex-1">
                             <p className="text-sm font-semibold">Tiền mặt</p>
                             <p className="text-[10px] text-muted-foreground">Đóng tại Văn phòng BQL</p>
                          </div>
                          {paymentMethod === 'cash' && <div className="w-3 h-3 bg-primary rounded-full" />}
                       </div>
                    </CardContent>
                    <CardFooter className="bg-slate-50/50 p-3 text-xs text-muted-foreground text-center italic border-t border-slate-100">
                       * Lưu ý: Hủy đặt lịch trước 24h được hoàn 100% phí.
                    </CardFooter>
                  </Card>
                </div>
              </div>

              {/* CỘT PHẢI: TÓM TẮT (Sticky) */}
              <div className="lg:col-span-1">
                <div className="sticky top-4">
                  <Card className="shadow-lg border-0 ring-1 ring-slate-200 overflow-hidden">
                    <div className="bg-slate-800 text-white p-4">
                      <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                        <Activity className="w-4 h-4" /> Phiếu Tạm Tính
                      </h3>
                    </div>
                    <CardContent className="p-5 space-y-4 bg-white">
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Dịch vụ:</span>
                          <span className="font-medium text-right max-w-[150px]">{selectedService?.name || "---"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Thời gian:</span>
                          <span className="font-medium text-right">
                             {selectedDate?.toLocaleDateString('vi-VN')} <br/>
                             {selectedTime || "---"}
                          </span>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                           {selectedEquipment.map(eq => {
                              const item = equipment.find(e => e.name === eq);
                              return (
                                <div key={eq} className="flex justify-between text-xs">
                                  <span>+ {eq}</span>
                                  <span>{item?.price.toLocaleString()}đ</span>
                                </div>
                              )
                           })}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-dashed border-slate-300">
                        <div className="flex justify-between items-end">
                          <span className="font-bold text-slate-800">Tổng cộng</span>
                          <span className="font-bold text-2xl text-primary">{totalAmount.toLocaleString()}đ</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full text-base h-11 font-bold shadow-md bg-gradient-to-r from-primary to-accent hover:opacity-90" 
                        onClick={handleConfirmBooking}
                        disabled={!selectedService || !selectedTime}
                      >
                        Xác nhận đặt lịch
                      </Button>
                      <p className="text-[10px] text-center text-muted-foreground">
                        Bằng việc xác nhận, bạn đồng ý với quy định của BQL.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: LỊCH SỬ */}
          <TabsContent value="history" className="animate-in fade-in zoom-in-95 duration-200 min-h-[400px]">
             <Card className="border-none shadow-sm">
                <CardHeader>
                   <CardTitle className="text-lg">Đơn đặt của tôi</CardTitle>
                </CardHeader>
                <CardContent>
                   <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                         {bookingHistory.map((item) => (
                           <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-primary/20 hover:shadow-sm transition-all">
                              <div className="flex items-start gap-4">
                                 <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center shrink-0", item.status === 'finished' ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500")}>
                                     {item.service.includes("Hội trường") ? <Building2 className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-slate-800">{item.service}</h4>
                                    <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                                       <CalendarIcon className="w-3 h-3" /> {item.date} 
                                       <span className="w-1 h-1 bg-slate-300 rounded-full"></span> 
                                       <Clock className="w-3 h-3" /> {item.time}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">Mã đơn: <span className="font-mono">{item.id}</span></p>
                                 </div>
                              </div>
                              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between mt-3 sm:mt-0 gap-2">
                                 <span className="font-bold text-primary">{item.total}</span>
                                 {renderStatus(item.status)}
                              </div>
                           </div>
                         ))}
                      </div>
                   </ScrollArea>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>

      </main>
      
      {/* Mobile Sticky Bar */}
      {activeTab === 'booking' && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="flex items-center justify-between gap-4 container mx-auto">
              <div>
                <p className="text-xs text-muted-foreground">Tổng cộng</p>
                <p className="font-bold text-primary text-xl">{totalAmount.toLocaleString()}đ</p>
              </div>
              <Button 
                  onClick={handleConfirmBooking} 
                  disabled={!selectedService || !selectedTime}
                  className="bg-gradient-to-r from-primary to-accent px-6"
              >
                Đặt ngay
              </Button>
          </div>
        </div>
      )}

      <ResidentTaskbar />
    </div>
  );
};

export default ResidentBooking;