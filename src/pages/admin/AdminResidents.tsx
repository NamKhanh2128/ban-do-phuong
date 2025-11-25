import AdminTaskbar from "@/components/AdminTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminResidents = () => {
  const residents = [
    { id: 1, name: "Nguyễn Văn A", dob: "15/05/1980", gender: "Nam", cccd: "001234567890", status: "active" },
    { id: 2, name: "Trần Thị B", dob: "20/08/1985", gender: "Nữ", cccd: "001234567891", status: "active" },
    { id: 3, name: "Lê Văn C", dob: "10/03/1990", gender: "Nam", cccd: "001234567892", status: "active" },
  ];

  const households = [
    { id: 1, code: "HK001234", owner: "Nguyễn Văn A", members: 4, address: "123 ABC" },
    { id: 2, code: "HK001235", owner: "Trần Thị B", members: 3, address: "456 DEF" },
    { id: 3, code: "HK001236", owner: "Lê Văn C", members: 5, address: "789 GHI" },
  ];

  const temporary = [
    { id: 1, name: "Phạm Văn D", type: "Tạm trú", duration: "10/02 - 10/05", status: "active" },
    { id: 2, name: "Nguyễn Thị E", type: "Tạm vắng", duration: "01/03 - 15/03", status: "expiring" },
    { id: 3, name: "Hoàng Văn F", type: "Tạm trú", duration: "15/03 - 15/06", status: "active" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Quản lý Dân cư</h1>
        <p className="text-sm opacity-90">Nhân khẩu • Hộ khẩu • Tạm trú/vắng</p>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-4">
        <Card className="p-6 shadow-medium">
          <Tabs defaultValue="residents" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="residents">Nhân khẩu</TabsTrigger>
              <TabsTrigger value="households">Hộ khẩu</TabsTrigger>
              <TabsTrigger value="temporary">Tạm trú/vắng</TabsTrigger>
            </TabsList>

            <TabsContent value="residents" className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm kiếm theo tên, CCCD..." className="pl-10" />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm mới
                </Button>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Ngày sinh</TableHead>
                      <TableHead>Giới tính</TableHead>
                      <TableHead>CCCD</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {residents.map((person) => (
                      <TableRow key={person.id}>
                        <TableCell className="font-medium">{person.name}</TableCell>
                        <TableCell>{person.dob}</TableCell>
                        <TableCell>{person.gender}</TableCell>
                        <TableCell>{person.cccd}</TableCell>
                        <TableCell>
                          <Badge variant="default">Đang sinh sống</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="households" className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm kiếm theo mã hộ, chủ hộ..." className="pl-10" />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm hộ
                </Button>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã hộ</TableHead>
                      <TableHead>Chủ hộ</TableHead>
                      <TableHead>Số thành viên</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {households.map((household) => (
                      <TableRow key={household.id}>
                        <TableCell className="font-medium">{household.code}</TableCell>
                        <TableCell>{household.owner}</TableCell>
                        <TableCell>{household.members} người</TableCell>
                        <TableCell>{household.address}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button size="sm" variant="outline">
                              Chi tiết
                            </Button>
                            <Button size="sm" variant="outline">
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

            <TabsContent value="temporary" className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Tìm kiếm..." className="pl-10" />
                </div>
              </div>

              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Họ tên</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Thời hạn</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {temporary.map((item) => (
                      <TableRow key={item.id} className={item.status === "expiring" ? "bg-warning/5" : ""}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant={item.type === "Tạm trú" ? "default" : "secondary"}>
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.duration}</TableCell>
                        <TableCell>
                          <Badge variant={item.status === "expiring" ? "destructive" : "default"}>
                            {item.status === "expiring" ? "Sắp hết hạn" : "Còn hạn"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            Xem chi tiết
                          </Button>
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

      <AdminTaskbar />
    </div>
  );
};

export default AdminResidents;
