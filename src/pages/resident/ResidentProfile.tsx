import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, AlertCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ResidentProfile = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const household = {
    code: "HK001234",
    address: "Số 123, Đường ABC, Phường XYZ",
    owner: "Nguyễn Văn A",
  };

  const members = [
    { id: 1, name: "Nguyễn Văn A", dob: "15/05/1980", relation: "Chủ hộ", avatar: "👨" },
    { id: 2, name: "Trần Thị B", dob: "20/08/1985", relation: "Vợ", avatar: "👩" },
    { id: 3, name: "Nguyễn Văn C", dob: "10/03/2010", relation: "Con", avatar: "👦" },
    { id: 4, name: "Nguyễn Thị D", dob: "25/11/2015", relation: "Con", avatar: "👧" },
  ];

  const handleReportError = (member: any) => {
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const handleSubmitReport = () => {
    toast.success("Yêu cầu sửa thông tin đã được gửi!");
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Hồ sơ Hộ khẩu</h1>
        <p className="text-sm opacity-90">Thông tin chi tiết về hộ gia đình</p>
      </div>

      <div className="container max-w-4xl mx-auto px-4 -mt-4">
        {/* Household Info */}
        <Card className="p-6 mb-6 shadow-medium">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🏠</span>
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Mã hộ khẩu</p>
                <p className="font-semibold">{household.code}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Địa chỉ</p>
                <p className="font-semibold">{household.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Chủ hộ</p>
                <p className="font-semibold">{household.owner}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Members List */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 px-2">Danh sách thành viên ({members.length} người)</h3>
          <div className="space-y-3">
            {members.map((member) => (
              <Card key={member.id} className="p-4 hover:shadow-soft transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold mb-1">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.dob} • {member.relation}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReportError(member)}
                    className="flex-shrink-0"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Báo sai sót
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Report Error Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Báo sai sót thông tin</DialogTitle>
            <DialogDescription>
              Thành viên: {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Thông tin hiện tại</Label>
              <div className="p-3 bg-muted rounded-lg text-sm">
                <p>Họ tên: {selectedMember?.name}</p>
                <p>Ngày sinh: {selectedMember?.dob}</p>
                <p>Quan hệ: {selectedMember?.relation}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="correction">Thông tin đúng</Label>
              <Input id="correction" placeholder="Nhập thông tin cần sửa" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="evidence">Ảnh minh chứng</Label>
              <Input id="evidence" type="file" accept="image/*" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmitReport}>Gửi yêu cầu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResidentTaskbar />
    </div>
  );
};

export default ResidentProfile;
