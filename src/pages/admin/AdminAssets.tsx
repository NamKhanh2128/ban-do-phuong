import AdminTaskbar from "@/components/AdminTaskbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminAssets = () => {
  const categories = [
    { id: 1, name: "Âm thanh", count: 5 },
    { id: 2, name: "Bàn ghế", count: 8 },
    { id: 3, name: "Thể thao", count: 4 },
    { id: 4, name: "Khác", count: 3 },
  ];

  const assets = [
    { id: 1, name: "Loa JBL PartyBox 310", total: 2, damaged: 0, location: "Hội trường" },
    { id: 2, name: "Micro không dây Shure", total: 4, damaged: 1, location: "Hội trường" },
    { id: 3, name: "Bàn tròn 10 người", total: 15, damaged: 2, location: "Kho A" },
    { id: 4, name: "Ghế nhựa cao cấp", total: 100, damaged: 5, location: "Kho A" },
    { id: 5, name: "Vợt cầu lông Yonex", total: 8, damaged: 2, location: "Sân thể thao" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-white">
        <h1 className="text-2xl font-bold mb-1">Quản lý Tài sản</h1>
        <p className="text-sm opacity-90">Theo dõi thiết bị & vật tư</p>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-4">
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {categories.map((category) => (
            <Card key={category.id} className="p-4 hover:shadow-medium transition-all cursor-pointer">
              <p className="font-semibold mb-1">{category.name}</p>
              <p className="text-2xl font-bold text-primary">{category.count}</p>
              <p className="text-xs text-muted-foreground">loại tài sản</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 shadow-medium">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Danh sách tài sản</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nhập kho
            </Button>
          </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên tài sản</TableHead>
                  <TableHead className="text-center">Tổng số</TableHead>
                  <TableHead className="text-center">Hỏng/Mất</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell className="text-center">
                      <span className="font-semibold">{asset.total}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      {asset.damaged > 0 ? (
                        <span className="text-destructive font-semibold">{asset.damaged}</span>
                      ) : (
                        <span className="text-muted-foreground">0</span>
                      )}
                    </TableCell>
                    <TableCell>{asset.location}</TableCell>
                    <TableCell>
                      <Badge variant={asset.damaged === 0 ? "default" : "destructive"}>
                        {asset.damaged === 0 ? "Tốt" : "Cần kiểm tra"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Cập nhật
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tổng tài sản</p>
                <p className="text-2xl font-bold">129</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Đang sử dụng</p>
                <p className="text-2xl font-bold text-success">119</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hỏng/Mất</p>
                <p className="text-2xl font-bold text-destructive">10</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AdminTaskbar />
    </div>
  );
};

export default AdminAssets;
