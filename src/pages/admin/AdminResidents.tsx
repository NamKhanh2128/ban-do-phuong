import { useState } from "react";
import AdminTaskbar from "@/components/AdminTaskbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, Plus, Edit, MoreVertical, Users, Home, UserCheck, 
  Eye, Scissors, ChevronRight, MapPin, Calendar, History, User
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AdminResidents = () => {
  const [splitStep, setSplitStep] = useState(1);
  const [isSplitDialogOpen, setIsSplitDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectedHousehold, setSelectedHousehold] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);

  // Residents data
  const residents = [
    { id: 1, name: "Nguyễn Văn A", dob: "15/08/1975", gender: "Nam", cccd: "001075012345", job: "Kỹ sư", status: "active" },
    { id: 2, name: "Trần Thị B", dob: "20/10/1978", gender: "Nữ", cccd: "001078098765", job: "Giáo viên", status: "active" },
    { id: 3, name: "Nguyễn Văn C", dob: "12/05/2005", gender: "Nam", cccd: "001105123456", job: "Học sinh", status: "active" },
    { id: 4, name: "Lê Thị D", dob: "01/06/2024", gender: "Nữ", cccd: "", job: "", status: "active" },
  ];

  // Households data
  const households = [
    { 
      id: 1, 
      code: "HK-2024-00147", 
      owner: "Nguyễn Văn A", 
      members: 4, 
      address: "Số 10, Ngõ 5, Tổ 7, La Khê",
      membersList: [
        { id: 1, name: "Nguyễn Văn A", role: "Chủ hộ", dob: "15/08/1975" },
        { id: 2, name: "Trần Thị B", role: "Vợ", dob: "20/10/1978" },
        { id: 3, name: "Nguyễn Văn C", role: "Con trai", dob: "12/05/2005" },
        { id: 4, name: "Nguyễn Thị D", role: "Con gái", dob: "01/06/2024" },
      ]
    },
    { 
      id: 2, 
      code: "HK-2024-00148", 
      owner: "Phạm Văn E", 
      members: 3, 
      address: "Số 12, Ngõ 5, Tổ 7, La Khê",
      membersList: [
        { id: 5, name: "Phạm Văn E", role: "Chủ hộ", dob: "10/03/1980" },
        { id: 6, name: "Lê Thị F", role: "Vợ", dob: "25/07/1982" },
        { id: 7, name: "Phạm Văn G", role: "Con", dob: "15/09/2010" },
      ]
    },
  ];

  // Temporary residents
  const temporary = [
    { id: 1, name: "Trần Văn X", type: "Tạm trú", duration: "10/12/2024 - 10/03/2025", status: "active", origin: "Thái Bình" },
    { id: 2, name: "Nguyễn Thị Y", type: "Tạm vắng", duration: "01/12/2024 - 15/12/2024", status: "expiring", dest: "Hà Nội" },
    { id: 3, name: "Hoàng Văn Z", type: "Tạm trú", duration: "15/11/2024 - 15/02/2025", status: "active", origin: "Nam Định" },
  ];

  // Person history timeline
  const personHistory = [
    { year: "2024", event: "Cập nhật nghề nghiệp: Học sinh → Sinh viên" },
    { year: "2021", event: "Cấp CCCD mới" },
    { year: "2020", event: "Nhập khẩu từ Văn Quán, Hà Đông" },
    { year: "2005", event: "Đăng ký khai sinh" },
  ];

  // Handlers
  const openHouseholdDetail = (household: any) => {
    setSelectedHousehold(household);
    setIsDetailOpen(true);
  };

  const openSplitDialog = () => {
    setIsSplitDialogOpen(true);
    setSplitStep(1);
    setSelectedMembers([]);
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleSplit = () => {
    toast.success("Tách hộ thành công! Đã tạo sổ hộ khẩu mới.");
    setIsSplitDialogOpen(false);
    setIsDetailOpen(false);
    setSplitStep(1);
    setSelectedMembers([]);
  };

  const openPersonTimeline = (person: any) => {
    setSelectedPerson(person);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 py-8 pb-20 rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">Quản lý Dân cư</h1>
          <p className="text-sm text-primary-foreground/80">Nhân khẩu • Hộ khẩu • Tạm trú/vắng</p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <Card className="border-0 shadow-strong">
          <Tabs defaultValue="residents" className="w-full">
            <TabsList className="grid w-full grid-cols-3 p-1 h-auto bg-muted rounded-t-xl rounded-b-none">
              <TabsTrigger value="residents" className="py-3 font-semibold data-[state=active]:bg-card">
                <Users className="w-4 h-4 mr-2" /> Nhân khẩu
              </TabsTrigger>
              <TabsTrigger value="households" className="py-3 font-semibold data-[state=active]:bg-card">
                <Home className="w-4 h-4 mr-2" /> Hộ khẩu
              </TabsTrigger>
              <TabsTrigger value="temporary" className="py-3 font-semibold data-[state=active]:bg-card">
                <UserCheck className="w-4 h-4 mr-2" /> Tạm trú/vắng
              </TabsTrigger>
            </TabsList>

            {/* TAB 1: NHÂN KHẨU */}
            <TabsContent value="residents" className="p-4 space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm theo Tên, CCCD, Nghề nghiệp..." className="pl-10" />
                </div>
                <Button className="gradient-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" /> Thêm mới
                </Button>
              </div>

              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Ngày sinh</TableHead>
                      <TableHead>Giới tính</TableHead>
                      <TableHead>CCCD</TableHead>
                      <TableHead>Nghề nghiệp</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {residents.map((person) => (
                      <TableRow key={person.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{person.name}</TableCell>
                        <TableCell>{person.dob}</TableCell>
                        <TableCell>{person.gender}</TableCell>
                        <TableCell className="font-mono text-sm">{person.cccd || "—"}</TableCell>
                        <TableCell>{person.job || "—"}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-1 justify-end">
                            <Button size="sm" variant="ghost" onClick={() => openPersonTimeline(person)}>
                              <History className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* TAB 2: HỘ KHẨU */}
            <TabsContent value="households" className="p-4 space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm theo Mã hộ, Chủ hộ, Địa chỉ..." className="pl-10" />
                </div>
                <Button className="gradient-primary text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" /> Thêm hộ
                </Button>
              </div>

              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Mã hộ</TableHead>
                      <TableHead>Chủ hộ</TableHead>
                      <TableHead>Số thành viên</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {households.map((household) => (
                      <TableRow key={household.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => openHouseholdDetail(household)}>
                        <TableCell className="font-mono text-sm text-primary font-semibold">{household.code}</TableCell>
                        <TableCell className="font-medium">{household.owner}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{household.members} người</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{household.address}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); openHouseholdDetail(household); }}>
                            Chi tiết <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* TAB 3: TẠM TRÚ/VẮNG */}
            <TabsContent value="temporary" className="p-4 space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm kiếm..." className="pl-10" />
                </div>
                <Button variant="outline">Thường trú</Button>
                <Button variant="outline">Tạm trú</Button>
                <Button variant="outline">Tạm vắng</Button>
              </div>

              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Thời hạn</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {temporary.map((item) => (
                      <TableRow key={item.id} className={cn("hover:bg-muted/30", item.status === "expiring" && "bg-warning/5")}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === "Tạm trú" ? "default" : "secondary"}>
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{item.duration}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === "expiring" ? "destructive" : "outline"} className={item.status !== "expiring" ? "text-success border-success/30 bg-success/10" : ""}>
                            {item.status === "expiring" ? "Sắp hết hạn" : "Còn hạn"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">Xem chi tiết</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Household Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedHousehold && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  Chi tiết Hộ khẩu
                </DialogTitle>
                <DialogDescription>
                  Mã số: <span className="font-mono font-semibold text-primary">{selectedHousehold.code}</span>
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Địa chỉ</p>
                      <p className="font-semibold">{selectedHousehold.address}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" /> Thành viên ({selectedHousehold.membersList.length})
                  </h4>
                  <div className="space-y-2">
                    {selectedHousehold.membersList.map((member: any) => (
                      <div key={member.id} className="p-3 bg-card border border-border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold", member.role === "Chủ hộ" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>
                            {member.name.split(' ').pop()?.substring(0,2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role} • {member.dob}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button variant="outline" className="flex-1">
                  <Plus className="w-4 h-4 mr-2" /> Thêm thành viên
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-2" /> Sửa thông tin
                </Button>
                <Button onClick={openSplitDialog} className="flex-1 bg-warning text-warning-foreground hover:bg-warning/90">
                  <Scissors className="w-4 h-4 mr-2" /> Tách hộ
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Split Household Dialog */}
      <Dialog open={isSplitDialogOpen} onOpenChange={setIsSplitDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-warning" />
              Tách hộ khẩu
            </DialogTitle>
            <DialogDescription>
              Bước {splitStep}/3: {splitStep === 1 ? "Chọn thành viên" : splitStep === 2 ? "Nhập địa chỉ mới" : "Xác nhận"}
            </DialogDescription>
          </DialogHeader>

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 py-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all", splitStep >= step ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                {step}
              </div>
            ))}
          </div>

          {/* Step 1: Select Members */}
          {splitStep === 1 && selectedHousehold && (
            <div className="space-y-3 py-2">
              <p className="text-sm text-muted-foreground">Chọn thành viên sẽ tách sang hộ mới:</p>
              {selectedHousehold.membersList.filter((m: any) => m.role !== "Chủ hộ").map((member: any) => (
                <div key={member.id} className={cn("p-3 border rounded-lg flex items-center gap-3 cursor-pointer transition-all", selectedMembers.includes(member.id) ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50")} onClick={() => toggleMemberSelection(member.id)}>
                  <Checkbox checked={selectedMembers.includes(member.id)} />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
              <Button onClick={() => setSplitStep(2)} disabled={selectedMembers.length === 0} className="w-full gradient-primary text-primary-foreground">
                Tiếp tục
              </Button>
            </div>
          )}

          {/* Step 2: New Address */}
          {splitStep === 2 && (
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label>Địa chỉ hộ mới</Label>
                <Input placeholder="Số nhà, ngõ, tổ, phường..." />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="sameAddress" />
                <label htmlFor="sameAddress" className="text-sm">Cùng địa chỉ (khác sổ)</label>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSplitStep(1)} className="flex-1">Quay lại</Button>
                <Button onClick={() => setSplitStep(3)} className="flex-1 gradient-primary text-primary-foreground">Tiếp tục</Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {splitStep === 3 && selectedHousehold && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-2">Hộ cũ (còn lại)</p>
                  <p className="font-semibold text-sm">{selectedHousehold.owner}</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedHousehold.membersList.length - selectedMembers.length} thành viên</p>
                </div>
                <div className="p-4 bg-success/10 border border-success/30 rounded-xl">
                  <p className="text-xs text-success mb-2">Hộ mới</p>
                  <p className="font-semibold text-sm">Chờ xác nhận</p>
                  <p className="text-xs text-muted-foreground mt-1">{selectedMembers.length} thành viên</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setSplitStep(2)} className="flex-1">Quay lại</Button>
                <Button onClick={handleSplit} className="flex-1 bg-success text-success-foreground hover:bg-success/90">Xác nhận tách hộ</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Person Timeline Dialog */}
      <Dialog open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <DialogContent className="max-w-md">
          {selectedPerson && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <History className="w-5 h-5 text-primary" />
                  Lịch sử: {selectedPerson.name}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="relative pl-6 space-y-6">
                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
                  {personHistory.map((item, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-4 w-4 h-4 rounded-full bg-primary border-2 border-card" />
                      <p className="text-xs text-primary font-semibold">{item.year}</p>
                      <p className="text-sm text-foreground">{item.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AdminTaskbar />
    </div>
  );
};

export default AdminResidents;