"use client";

import ResidentTaskbar from "@/components/ResidentTaskbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, Users, FileText, MapPin, ChevronDown, ChevronUp, 
  Briefcase, CreditCard, Calendar, Home, Globe
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ResidentProfile = () => {
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Household Info
  const householdInfo = {
    id: "HK-2024-00147", 
    ownerName: "Nguyễn Văn A", 
    address: {
      number: "Số 10, Ngõ 5",
      street: "Tổ 7, Phường La Khê",
      district: "Quận Hà Đông, Hà Nội"
    }
  };

  // Members with full Case Study fields
  const members = [
    { 
      id: 1, 
      role: "Chủ hộ", 
      fullName: "Nguyễn Văn A",
      alias: "Không", 
      gender: "Nam",
      dob: "15/08/1975",
      birthPlace: "Hà Đông, Hà Nội",
      origin: "Nam Định", 
      ethnicity: "Kinh",
      religion: "Không",
      job: "Kỹ sư xây dựng", 
      workplace: "Công ty CP Xây dựng Hà Nội", 
      idCard: { number: "001075012345", date: "10/10/2021", place: "Cục CS QLHC về TTXH" }, 
      regDate: "01/01/2020", 
      prevAddress: "Số 5, Ngõ 3, Phường Văn Quán, Hà Đông"
    },
    { 
      id: 2, 
      role: "Vợ", 
      fullName: "Trần Thị B",
      alias: "Không",
      gender: "Nữ",
      dob: "20/10/1978",
      birthPlace: "Thái Bình",
      origin: "Thái Bình",
      ethnicity: "Kinh",
      religion: "Phật giáo",
      job: "Giáo viên",
      workplace: "Trường THCS La Khê",
      idCard: { number: "001078098765", date: "15/05/2022", place: "Cục CS QLHC về TTXH" },
      regDate: "01/01/2020",
      prevAddress: "TP. Thái Bình, Thái Bình"
    },
    { 
      id: 3, 
      role: "Con trai", 
      fullName: "Nguyễn Văn C",
      alias: "Bi",
      gender: "Nam",
      dob: "12/05/2005",
      birthPlace: "Hà Đông, Hà Nội",
      origin: "Nam Định",
      ethnicity: "Kinh",
      religion: "Không",
      job: "Học sinh", 
      workplace: "Trường THPT Lê Quý Đôn",
      idCard: { number: "001105123456", date: "20/06/2021", place: "Cục CS QLHC về TTXH" },
      regDate: "01/01/2020",
      prevAddress: "Cùng cha mẹ"
    },
    { 
      id: 4, 
      role: "Con gái", 
      fullName: "Nguyễn Thị D",
      alias: "Bon",
      gender: "Nữ",
      dob: "01/06/2024",
      birthPlace: "Hà Đông, Hà Nội",
      origin: "Nam Định",
      ethnicity: "Kinh",
      religion: "Không",
      job: "",
      workplace: "",
      idCard: { number: "", date: "", place: "" },
      regDate: "01/06/2024",
      prevAddress: "Mới sinh"
    }
  ];

  const openMemberDetail = (member: any) => {
    setSelectedMember(member);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      
      {/* HEADER */}
      <div className="gradient-primary py-10 pb-24 text-primary-foreground rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="container max-w-2xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center justify-center p-4 bg-white/20 backdrop-blur-sm rounded-2xl mb-3 border border-white/30">
            <FileText className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Sổ Hộ Khẩu Số</h1>
          <p className="text-sm opacity-90">Mã số: {householdInfo.id}</p>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 -mt-16 relative z-10 space-y-4">
        
        {/* Household Info Card */}
        <Card className="border-0 shadow-strong overflow-hidden">
          <CardHeader className="bg-card border-b border-border pb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Chủ hộ</p>
                  <p className="text-lg font-bold text-primary">{householdInfo.ownerName}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-success bg-success/10 border-success/30">
                ✓ Đã xác thực
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 bg-muted/30">
            <div className="bg-card p-4 rounded-xl border border-border flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" /> 
              <div>
                <p className="text-xs text-muted-foreground mb-1">Địa chỉ thường trú</p>
                <p className="font-semibold text-foreground text-sm">
                  {householdInfo.address.number}
                </p>
                <p className="text-sm text-muted-foreground">
                  {householdInfo.address.street}, {householdInfo.address.district}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Members List */}
        <Card className="border-0 shadow-strong overflow-hidden">
          <CardHeader className="bg-card border-b border-border pb-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-foreground">Danh sách nhân khẩu</h2>
              <Badge variant="secondary">{members.length} người</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border">
            {members.map((mem) => {
              const isOwner = mem.role === "Chủ hộ";
              
              return (
                <div 
                  key={mem.id} 
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => openMemberDetail(mem)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className={cn("h-12 w-12 border-2", isOwner ? "border-primary bg-primary/10" : "border-border bg-muted")}>
                      <AvatarFallback className={cn("text-sm font-bold", isOwner ? "text-primary" : "text-muted-foreground")}>
                        {mem.fullName.split(' ').pop()?.substring(0,2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-foreground">{mem.fullName}</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span className={cn("font-medium", isOwner ? "text-primary" : "text-muted-foreground")}>{mem.role}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{mem.dob}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Member Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          {selectedMember && (
            <>
              <DialogHeader className="text-center pb-4 border-b border-border">
                <div className="mx-auto mb-3">
                  <Avatar className="h-20 w-20 border-4 border-primary/20">
                    <AvatarFallback className="text-2xl font-bold text-primary bg-primary/10">
                      {selectedMember.fullName.split(' ').pop()?.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <DialogTitle className="text-xl">{selectedMember.fullName}</DialogTitle>
                <DialogDescription>
                  <Badge variant="outline" className="mt-1">
                    {selectedMember.role} • {selectedMember.gender}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <InfoField label="Họ và tên" value={selectedMember.fullName} />
                  <InfoField label="Bí danh" value={selectedMember.alias} />
                  <InfoField label="Ngày sinh" value={selectedMember.dob} icon={<Calendar className="w-3.5 h-3.5" />} />
                  <InfoField label="Nơi sinh" value={selectedMember.birthPlace} />
                  <InfoField label="Nguyên quán" value={selectedMember.origin} icon={<Globe className="w-3.5 h-3.5" />} />
                  <InfoField label="Dân tộc" value={selectedMember.ethnicity} />
                  <InfoField label="Tôn giáo" value={selectedMember.religion || "Không"} />
                </div>

                <Separator />

                {/* Occupation */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Nghề nghiệp
                  </h4>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="font-semibold text-foreground">{selectedMember.job || "N/A"}</p>
                    {selectedMember.workplace && (
                      <p className="text-sm text-muted-foreground mt-1">{selectedMember.workplace}</p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* ID Card */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <CreditCard className="w-4 h-4" /> CCCD/CMND
                  </h4>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                    <p className="font-mono font-bold text-primary text-lg">{selectedMember.idCard.number || "Chưa cấp"}</p>
                    {selectedMember.idCard.number && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Cấp ngày: {selectedMember.idCard.date}<br/>
                        Nơi cấp: {selectedMember.idCard.place}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Residence */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                    <Home className="w-4 h-4" /> Đăng ký cư trú
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    <InfoField label="Ngày đăng ký thường trú" value={selectedMember.regDate} />
                    <InfoField label="Địa chỉ trước khi chuyển đến" value={selectedMember.prevAddress} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full" onClick={() => setIsDetailOpen(false)}>
                  Đóng
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <ResidentTaskbar />
    </div>
  );
};

// Helper component for info fields
const InfoField = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <div>
    <p className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wide flex items-center gap-1">
      {icon} {label}
    </p>
    <p className="text-sm font-medium text-foreground mt-0.5">{value || "---"}</p>
  </div>
);

export default ResidentProfile;