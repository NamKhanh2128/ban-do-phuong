import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin } from "lucide-react";
import { toast } from "sonner";

const ResidentDeclaration = () => {
  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    toast.success(`Đã gửi khai báo ${type}!`);
  };

  const history = [
    { id: 1, type: "Tạm vắng", date: "01/03/2024 - 15/03/2024", status: "approved" },
    { id: 2, type: "Tạm trú", date: "10/02/2024 - 10/05/2024", status: "pending" },
    { id: 3, type: "Tạm vắng", date: "20/01/2024 - 25/01/2024", status: "approved" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Khai báo</h1>
        <p className="text-sm opacity-90">Tạm vắng / Tạm trú / Lưu trú</p>
      </div>

      <div className="container max-w-4xl mx-auto px-4 -mt-4">
        <Card className="p-6 mb-6 shadow-medium">
          <Tabs defaultValue="absence" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="absence">Tạm vắng</TabsTrigger>
              <TabsTrigger value="residence">Tạm trú / Lưu trú</TabsTrigger>
            </TabsList>

            <TabsContent value="absence">
              <form onSubmit={(e) => handleSubmit(e, "tạm vắng")} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromDate">Ngày đi</Label>
                    <Input id="fromDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="toDate">Ngày về</Label>
                    <Input id="toDate" type="date" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Lý do</Label>
                  <Input id="reason" placeholder="Công tác, Du lịch, Thăm thân..." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Nơi đến</Label>
                  <Input id="destination" placeholder="Địa chỉ nơi đến" required />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
                  Gửi khai báo
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="residence">
              <form onSubmit={(e) => handleSubmit(e, "tạm trú")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Họ tên khách</Label>
                  <Input id="guestName" placeholder="Nguyễn Văn X" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestCCCD">Số CCCD khách</Label>
                  <Input id="guestCCCD" placeholder="001234567890" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cccdPhoto">Ảnh chụp 2 mặt CCCD</Label>
                  <Input id="cccdPhoto" type="file" accept="image/*" multiple required />
                  <p className="text-xs text-muted-foreground">Tải lên 2 ảnh: mặt trước và mặt sau</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stayFrom">Từ ngày</Label>
                    <Input id="stayFrom" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stayTo">Đến ngày</Label>
                    <Input id="stayTo" type="date" required />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-accent to-success">
                  Gửi đăng ký
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        {/* History */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 px-2">Lịch sử khai báo</h3>
          <div className="space-y-3">
            {history.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === "Tạm vắng" ? "bg-primary/10" : "bg-accent/10"
                    }`}>
                      {item.type === "Tạm vắng" ? (
                        <MapPin className={`w-5 h-5 ${item.type === "Tạm vắng" ? "text-primary" : "text-accent"}`} />
                      ) : (
                        <CalendarDays className="w-5 h-5 text-accent" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold mb-1">{item.type}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant={item.status === "approved" ? "default" : "secondary"}>
                    {item.status === "approved" ? "Đã duyệt" : "Chờ duyệt"}
                  </Badge>
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

export default ResidentDeclaration;
