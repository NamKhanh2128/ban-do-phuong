import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  CalendarDays, MapPin, Upload, User, CreditCard, Clock, 
  CheckCircle2, AlertCircle, Home, Baby, Skull, ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ResidentDeclaration = () => {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);
  const [variationType, setVariationType] = useState("");

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    toast.success(`Gửi tờ khai thành công! Vui lòng chờ tổ trưởng duyệt.`);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, side: 'front' | 'back') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (side === 'front') setFrontImage(event.target?.result as string);
        else setBackImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const history = [
    { id: 1, type: "Tạm vắng", person: "Nguyễn Văn A", date: "01/03/2024 - 15/03/2024", status: "approved" },
    { id: 2, type: "Tạm trú", person: "Trần Văn X (Khách)", date: "10/02/2024 - 10/05/2024", status: "pending" },
    { id: 3, type: "Tạm vắng", person: "Trần Thị B", date: "20/01/2024 - 25/01/2024", status: "approved" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 py-8 pb-20 rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">Khai báo cư trú</h1>
          <p className="text-sm text-primary-foreground/80">Tạm vắng • Tạm trú • Biến động</p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
        <Card className="border-0 shadow-strong overflow-hidden">
          <Tabs defaultValue="absence" className="w-full">
            <TabsList className="grid w-full grid-cols-3 p-1 h-auto bg-muted">
              <TabsTrigger value="absence" className="py-3 text-xs font-semibold">Tạm vắng</TabsTrigger>
              <TabsTrigger value="residence" className="py-3 text-xs font-semibold">Tạm trú</TabsTrigger>
              <TabsTrigger value="variation" className="py-3 text-xs font-semibold">Biến động</TabsTrigger>
            </TabsList>

            {/* TAB 1: TẠM VẮNG */}
            <TabsContent value="absence" className="p-6">
              <form onSubmit={(e) => handleSubmit(e, "tạm vắng")} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ngày đi</Label>
                    <Input type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày về</Label>
                    <Input type="date" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Lý do</Label>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Chọn lý do" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="study">Học tập</SelectItem>
                      <SelectItem value="work">Công tác</SelectItem>
                      <SelectItem value="travel">Du lịch</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Địa chỉ nơi đến</Label>
                  <Textarea placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" required />
                </div>
                <Button type="submit" className="w-full gradient-primary text-primary-foreground h-12">
                  Gửi khai báo
                </Button>
              </form>
            </TabsContent>

            {/* TAB 2: TẠM TRÚ (For Students/Workers) */}
            <TabsContent value="residence" className="p-6">
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mb-6 flex gap-3">
                <User className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Dành cho sinh viên, công nhân thuê trọ tại địa bàn. Vui lòng chuẩn bị ảnh chụp 2 mặt CCCD.
                </p>
              </div>

              <form onSubmit={(e) => handleSubmit(e, "tạm trú")} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Họ tên khách</Label>
                    <Input placeholder="Nguyễn Văn X" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Ngày sinh</Label>
                    <Input type="date" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Địa chỉ thường trú</Label>
                  <Textarea placeholder="Địa chỉ hộ khẩu thường trú" required />
                </div>
                <div className="space-y-2">
                  <Label>Số CCCD</Label>
                  <Input placeholder="001234567890" required />
                </div>

                {/* Photo Upload UI */}
                <div className="space-y-2">
                  <Label>Ảnh chụp CCCD</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'front')}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${frontImage ? 'border-success bg-success/5' : 'border-border hover:border-primary'}`}>
                        {frontImage ? (
                          <img src={frontImage} alt="Mặt trước" className="w-full h-24 object-cover rounded-lg" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-xs font-medium text-muted-foreground">Mặt trước CCCD</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, 'back')}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                      />
                      <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${backImage ? 'border-success bg-success/5' : 'border-border hover:border-primary'}`}>
                        {backImage ? (
                          <img src={backImage} alt="Mặt sau" className="w-full h-24 object-cover rounded-lg" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                            <p className="text-xs font-medium text-muted-foreground">Mặt sau CCCD</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Từ ngày</Label>
                    <Input type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Đến ngày</Label>
                    <Input type="date" required />
                  </div>
                </div>
                <Button type="submit" className="w-full gradient-primary text-primary-foreground h-12">
                  Gửi đăng ký tạm trú
                </Button>
              </form>
            </TabsContent>

            {/* TAB 3: BIẾN ĐỘNG (Birth/Death/Move) */}
            <TabsContent value="variation" className="p-6">
              <form onSubmit={(e) => handleSubmit(e, "biến động")} className="space-y-4">
                <div className="space-y-2">
                  <Label>Loại biến động</Label>
                  <Select onValueChange={setVariationType}>
                    <SelectTrigger><SelectValue placeholder="Chọn loại" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newborn">
                        <div className="flex items-center gap-2"><Baby className="w-4 h-4" /> Mới sinh</div>
                      </SelectItem>
                      <SelectItem value="death">
                        <div className="flex items-center gap-2"><Skull className="w-4 h-4" /> Qua đời</div>
                      </SelectItem>
                      <SelectItem value="moveout">
                        <div className="flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Chuyển đi</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Conditional Fields for Newborn */}
                {variationType === "newborn" && (
                  <div className="space-y-4 p-4 bg-accent/5 rounded-xl border border-accent/20">
                    <p className="text-sm font-semibold text-accent">Thông tin trẻ mới sinh</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Họ tên trẻ</Label>
                        <Input placeholder="Nguyễn Văn..." required />
                      </div>
                      <div className="space-y-2">
                        <Label>Ngày sinh</Label>
                        <Input type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Giới tính</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Chọn" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Nam</SelectItem>
                            <SelectItem value="female">Nữ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Nơi sinh</Label>
                        <Input placeholder="Bệnh viện..." required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Họ tên Cha</Label>
                        <Input placeholder="Họ tên đầy đủ" required />
                      </div>
                      <div className="space-y-2">
                        <Label>Họ tên Mẹ</Label>
                        <Input placeholder="Họ tên đầy đủ" required />
                      </div>
                    </div>
                    <div className="p-3 bg-muted rounded-lg text-xs text-muted-foreground">
                      <p className="font-medium mb-1">Tự động điền:</p>
                      <p>• Nơi thường trú trước: <span className="font-semibold">Mới sinh</span></p>
                      <p>• Nghề nghiệp: <span className="font-semibold">N/A</span></p>
                    </div>
                  </div>
                )}

                {variationType && variationType !== "newborn" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Họ tên người khai báo</Label>
                      <Input placeholder="Họ tên đầy đủ" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Ghi chú / Lý do</Label>
                      <Textarea placeholder="Mô tả chi tiết..." />
                    </div>
                  </div>
                )}

                {variationType && (
                  <Button type="submit" className="w-full gradient-primary text-primary-foreground h-12">
                    Gửi khai báo biến động
                  </Button>
                )}
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* History */}
        <Card className="border-0 shadow-medium">
          <CardHeader className="pb-3">
            <h3 className="font-bold text-foreground">Lịch sử khai báo</h3>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border">
            {history.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === "Tạm vắng" ? "bg-primary/10" : "bg-accent/10"}`}>
                    {item.type === "Tạm vắng" ? <MapPin className="w-5 h-5 text-primary" /> : <Home className="w-5 h-5 text-accent" />}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.person}</p>
                    <p className="text-xs text-muted-foreground">{item.type} • {item.date}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={item.status === "approved" 
                    ? "text-success bg-success/10 border-success/30" 
                    : "text-warning bg-warning/10 border-warning/30"
                  }
                >
                  {item.status === "approved" ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Đã duyệt</> : <><Clock className="w-3 h-3 mr-1" /> Chờ duyệt</>}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ResidentTaskbar />
    </div>
  );
};

export default ResidentDeclaration;