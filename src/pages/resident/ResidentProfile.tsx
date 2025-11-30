"use client";

import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, Users, FileText, MapPin, History, Info, 
  ChevronDown, ChevronUp, FilePlus, Send, Clock, CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ResidentProfile = () => {
  // --- STATE ---
  const [expandedMember, setExpandedMember] = useState<number | null>(null);
  const [requestType, setRequestType] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // --- MOCK DATA: THÔNG TIN HỘ KHẨU ---
  const householdInfo = {
    id: "HK-2024-001", 
    ownerName: "Nguyễn Văn A", 
    address: {
      number: "12A.05",
      street: "Tòa B, Chung cư BlueMoon",
      ward: "Phường La Khê",
      district: "Quận Hà Đông"
    }
  };

  // --- MOCK DATA: DANH SÁCH NHÂN KHẨU ---
  const members = [
    { 
      id: 1, 
      role: "Chủ hộ", 
      fullName: "Nguyễn Văn A",
      alias: "Không", 
      dob: "15/08/1985",
      birthPlace: "Hà Nội",
      origin: "Nam Định", 
      ethnicity: "Kinh", 
      job: "Kỹ sư phần mềm", 
      workplace: "Công ty FPT Software", 
      idCard: { number: "03008500xxxx", date: "10/10/2021", place: "Cục CS QLHC" }, 
      regDate: "01/01/2023", 
      prevAddress: "Thanh Xuân, Hà Nội"
    },
    { 
      id: 2, 
      role: "Vợ", 
      fullName: "Trần Thị B",
      alias: "Không", 
      dob: "20/10/1988",
      birthPlace: "Thái Bình",
      origin: "Thái Bình",
      ethnicity: "Kinh",
      job: "Giáo viên",
      workplace: "Trường THPT Lê Quý Đôn",
      idCard: { number: "03008800xxxx", date: "15/05/2022", place: "Cục CS QLHC" },
      regDate: "01/01/2023",
      prevAddress: "Thái Bình"
    },
    { 
      id: 3, 
      role: "Con", 
      fullName: "Nguyễn Văn C",
      alias: "Cún",
      dob: "01/06/2024",
      birthPlace: "Hà Nội",
      origin: "Nam Định",
      ethnicity: "Kinh",
      job: "", // Mới sinh để trống
      workplace: "", 
      idCard: { number: "", date: "", place: "" }, // Chưa có
      regDate: "01/06/2024",
      prevAddress: "Mới sinh" 
    }
  ];

  // --- MOCK DATA: LỊCH SỬ ĐÃ DUYỆT (OFFICIAL) ---
  const history = [
    {
      id: 1,
      type: "new_born", 
      content: "Đăng ký khai sinh: Nguyễn Văn C",
      date: "05/06/2024",
      note: "Đã nộp giấy khai sinh"
    },
    {
      id: 2,
      type: "change_owner", 
      content: "Thay đổi chủ hộ: Ông Nguyễn Văn X -> Ông Nguyễn Văn A",
      date: "01/01/2023",
      note: "Tách hộ từ sổ cũ"
    }
  ];

  // --- STATE: DANH SÁCH CHỜ DUYỆT (PENDING) ---
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);

  // --- HANDLERS ---
  const toggleExpand = (id: number) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  const getRequestLabel = (type: string) => {
    switch(type) {
        case 'new_born': return 'Đăng ký khai sinh';
        case 'move_in': return 'Nhập khẩu (Chuyển đến)';
        case 'move_out': return 'Chuyển khẩu (Chuyển đi)';
        case 'death': return 'Khai tử';
        case 'change_owner': return 'Thay đổi chủ hộ';
        default: return 'Thay đổi khác';
    }
  };

  const handleSendRequest = () => {
    if (!requestType) {
        toast.error("Vui lòng chọn loại biến động!");
        return;
    }

    // Giả lập gửi API
    const newRequest = {
        id: Date.now(),
        type: requestType,
        content: `Khai báo: ${getRequestLabel(requestType)}`,
        date: "Vừa xong", // Thực tế dùng new Date()
        status: "pending",
        note: requestNote || "Đang chờ cán bộ tiếp nhận"
    };

    setPendingRequests([newRequest, ...pendingRequests]);
    toast.success("Gửi khai báo thành công! Vui lòng chờ duyệt.");
    setIsDialogOpen(false); // Đóng modal
    setRequestType("");
    setRequestNote("");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      
      {/* HEADER: Gradient Gốc */}
      <div className="bg-gradient-to-br from-primary to-accent py-8 pb-20 text-white rounded-b-[30px] relative shadow-md">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/20 backdrop-blur-sm rounded-full mb-3 border border-white/30">
             <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold">Sổ Hộ Khẩu Số</h1>
          <p className="text-sm opacity-90">Mã số: {householdInfo.id}</p>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
        
        {/* CARD 1: THÔNG TIN CHUNG */}
        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-white border-b pb-3">
             <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                   <div className="bg-primary/10 p-2 rounded-lg text-primary">
                      <Users className="w-5 h-5" />
                   </div>
                   <div>
                      <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Chủ Hộ</h2>
                      <p className="text-lg font-bold text-primary">{householdInfo.ownerName}</p>
                   </div>
                </div>
                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">Đã xác thực</Badge>
             </div>
          </CardHeader>
          <CardContent className="p-4 bg-slate-50/50">
             <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" /> 
                <div>
                    <p className="text-xs text-muted-foreground">Địa chỉ thường trú</p>
                    <p className="font-medium text-slate-800 text-sm">
                        {`${householdInfo.address.number}, ${householdInfo.address.street}, ${householdInfo.address.ward}, ${householdInfo.address.district}`}
                    </p>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* TABS: NHÂN KHẨU & BIẾN ĐỘNG */}
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-white p-1 shadow-sm border border-slate-200 rounded-xl mb-4">
            <TabsTrigger value="members" className="rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-bold transition-all">
               Nhân khẩu ({members.length})
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg data-[state=active]:bg-accent/10 data-[state=active]:text-accent font-bold transition-all">
               Biến động
            </TabsTrigger>
          </TabsList>

          {/* === TAB 1: DANH SÁCH NHÂN KHẨU === */}
          <TabsContent value="members" className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
             {members.map((mem) => {
               const isOwner = mem.role === "Chủ hộ";
               const isExpanded = expandedMember === mem.id;

               return (
                 <Card key={mem.id} className={cn("border-none shadow-sm transition-all overflow-hidden", isExpanded ? "ring-2 ring-primary/20" : "")}>
                    <div 
                      className="p-4 flex items-center justify-between cursor-pointer bg-white hover:bg-slate-50 transition-colors"
                      onClick={() => toggleExpand(mem.id)}
                    >
                       <div className="flex items-center gap-3">
                          <Avatar className={cn("h-10 w-10 border", isOwner ? "border-primary bg-primary/5" : "border-slate-200 bg-slate-100")}>
                             <AvatarFallback className={cn("text-xs font-bold", isOwner ? "text-primary" : "text-slate-600")}>
                                {mem.fullName.split(' ').pop()?.substring(0,2).toUpperCase()}
                             </AvatarFallback>
                          </Avatar>
                          <div>
                             <h3 className="font-bold text-slate-800 text-sm">{mem.fullName}</h3>
                             <p className="text-xs text-muted-foreground">
                                <span className={cn("font-medium", isOwner ? "text-primary" : "text-slate-700")}>{mem.role}</span>
                             </p>
                          </div>
                       </div>
                       {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                    </div>

                    {/* CHI TIẾT (Expandable) - Mapping đúng yêu cầu bài toán */}
                    {isExpanded && (
                       <div className="bg-slate-50 border-t border-slate-100 p-4 space-y-4 text-sm animate-in slide-in-from-top-2 duration-200">
                          
                          {/* Cơ bản */}
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Ngày sinh</p>
                                <p>{mem.dob}</p>
                             </div>
                             <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Bí danh</p>
                                <p>{mem.alias}</p>
                             </div>
                             <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Dân tộc</p>
                                <p>{mem.ethnicity}</p>
                             </div>
                             <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Nguyên quán</p>
                                <p>{mem.origin}</p>
                             </div>
                          </div>

                          <Separator />

                          {/* Nghề nghiệp & CMND */}
                          <div className="space-y-3">
                             <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Nghề nghiệp & Nơi làm việc</p>
                                <p className="font-medium">{mem.job || "---"}</p>
                                <p className="text-xs text-muted-foreground">{mem.workplace}</p>
                             </div>
                             <div className="bg-white p-3 rounded border border-slate-200">
                                <p className="text-[10px] uppercase text-muted-foreground font-bold mb-1">CCCD / CMND</p>
                                <p className="font-mono font-bold text-primary">{mem.idCard.number || "Chưa cấp"}</p>
                                {mem.idCard.number && (
                                   <p className="text-xs text-muted-foreground mt-1">
                                      Cấp ngày {mem.idCard.date} tại {mem.idCard.place}
                                   </p>
                                )}
                             </div>
                          </div>

                          <Separator />

                          {/* Cư trú */}
                          <div className="grid grid-cols-1 gap-2">
                             <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Ngày ĐK thường trú</p>
                                <p>{mem.regDate}</p>
                             </div>
                             <div>
                                <p className="text-[10px] uppercase text-muted-foreground font-bold">Nơi thường trú trước đây</p>
                                <p className="italic text-slate-600">{mem.prevAddress}</p>
                             </div>
                          </div>
                       </div>
                    )}
                 </Card>
               );
             })}
          </TabsContent>

          {/* === TAB 2: LỊCH SỬ BIẾN ĐỘNG === */}
          <TabsContent value="history" className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
             
             {/* 1. NÚT KHAI BÁO (Dialog) */}
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent shadow-md h-12 text-base font-bold transition-transform hover:scale-[1.01]">
                        <FilePlus className="w-5 h-5 mr-2" /> Khai báo biến động
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Khai báo thay đổi nhân khẩu</DialogTitle>
                        <DialogDescription>
                            Gửi yêu cầu tới Cán bộ quản lý để cập nhật vào Sổ hộ khẩu.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label>Loại biến động <span className="text-red-500">*</span></Label>
                            <Select onValueChange={setRequestType} value={requestType}>
                                <SelectTrigger>
                                    <SelectValue placeholder="-- Chọn loại --" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new_born">Sinh con (Khai sinh)</SelectItem>
                                    <SelectItem value="move_in">Nhập khẩu (Người mới đến)</SelectItem>
                                    <SelectItem value="move_out">Chuyển khẩu (Người chuyển đi)</SelectItem>
                                    <SelectItem value="death">Khai tử</SelectItem>
                                    <SelectItem value="change_owner">Thay đổi chủ hộ</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Nội dung chi tiết</Label>
                            <Textarea 
                                placeholder="VD: Con trai Nguyễn Văn C sinh ngày 01/06/2024..." 
                                value={requestNote}
                                onChange={(e) => setRequestNote(e.target.value)}
                            />
                        </div>
                        <div className="bg-amber-50 p-3 rounded text-xs text-amber-700 border border-amber-200 flex gap-2">
                            <Info className="w-4 h-4 shrink-0" />
                            <span>Sau khi gửi, vui lòng mang giấy tờ gốc (Giấy khai sinh/Chứng tử...) đến BQL để đối chiếu.</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSendRequest} type="submit" className="w-full bg-primary">
                            <Send className="w-4 h-4 mr-2" /> Gửi yêu cầu
                        </Button>
                    </DialogFooter>
                </DialogContent>
             </Dialog>

             {/* 2. DANH SÁCH ĐANG CHỜ (Pending) */}
             {pendingRequests.length > 0 && (
                 <div className="space-y-3">
                    <h3 className="text-sm font-bold text-amber-600 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Yêu cầu đang chờ duyệt
                    </h3>
                    {pendingRequests.map(req => (
                        <div key={req.id} className="bg-amber-50 border border-amber-200 rounded-xl p-4 relative overflow-hidden animate-in slide-in-from-left-2">
                            <div className="absolute top-0 right-0 bg-amber-200 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                                Chờ xử lý
                            </div>
                            <h4 className="font-bold text-slate-800 text-sm">{req.content}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{req.note}</p>
                            <p className="text-[10px] text-slate-400 mt-2 text-right">Gửi lúc: {req.date}</p>
                        </div>
                    ))}
                    <Separator />
                 </div>
             )}

             {/* 3. LỊCH SỬ ĐÃ DUYỆT (Timeline) */}
             <div>
                <h3 className="text-sm font-bold text-slate-600 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" /> Lịch sử đã ghi nhận
                </h3>
                <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pb-4">
                    {history.map((event) => (
                    <div key={event.id} className="relative pl-6">
                        {/* Timeline Dot */}
                        <div className={cn(
                            "absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white",
                            event.type === 'new_born' ? "bg-green-500" :
                            event.type === 'move_out' ? "bg-orange-500" :
                            event.type === 'change_owner' ? "bg-blue-500" : "bg-slate-500"
                        )} />
                        
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-full mb-1">
                                {event.date}
                            </span>
                            <h4 className="font-bold text-slate-800 text-sm">{event.content}</h4>
                            <div className="text-xs text-muted-foreground mt-1 bg-white p-2 rounded border border-slate-100 shadow-sm">
                                <p><span className="font-semibold">Ghi chú:</span> {event.note}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
             </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <ResidentTaskbar />
    </div>
  );
};

export default ResidentProfile;