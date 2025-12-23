import AdminTaskbar from "@/components/AdminTaskbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Edit, Package, Speaker, Armchair, Dumbbell, MoreHorizontal,
  AlertTriangle, CheckCircle, Search
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AdminAssets = () => {
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const categories = [
    { id: 1, name: "Âm thanh", icon: Speaker, count: 6, color: "primary" },
    { id: 2, name: "Bàn ghế", icon: Armchair, count: 8, color: "accent" },
    { id: 3, name: "Thể thao", icon: Dumbbell, count: 5, color: "success" },
    { id: 4, name: "Khác", icon: Package, count: 4, color: "warning" },
  ];

  const assets = [
    { id: 1, name: "Loa JBL PartyBox 310", category: "Âm thanh", total: 2, damaged: 0, location: "Hội trường", status: "good" },
    { id: 2, name: "Micro không dây Shure", category: "Âm thanh", total: 4, damaged: 1, location: "Hội trường", status: "warning" },
    { id: 3, name: "Bàn tròn 10 người", category: "Bàn ghế", total: 15, damaged: 2, location: "Kho A", status: "warning" },
    { id: 4, name: "Ghế nhựa cao cấp", category: "Bàn ghế", total: 100, damaged: 5, location: "Kho A", status: "warning" },
    { id: 5, name: "Vợt cầu lông Yonex", category: "Thể thao", total: 8, damaged: 2, location: "Sân thể thao", status: "warning" },
    { id: 6, name: "Máy chiếu Epson", category: "Khác", total: 1, damaged: 0, location: "Hội trường", status: "good" },
    { id: 7, name: "Màn chiếu 100 inch", category: "Khác", total: 1, damaged: 0, location: "Hội trường", status: "good" },
  ];

  const openUpdateDialog = (asset: any) => {
    setSelectedAsset(asset);
    setIsUpdateOpen(true);
  };

  const handleUpdate = () => {
    toast.success("Cập nhật trạng thái thành công!");
    setIsUpdateOpen(false);
  };

  const totalAssets = assets.reduce((acc, a) => acc + a.total, 0);
  const totalDamaged = assets.reduce((acc, a) => acc + a.damaged, 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 py-8 pb-20 rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-primary-foreground mb-1">Quản lý Tài sản</h1>
          <p className="text-sm text-primary-foreground/80">Theo dõi thiết bị & vật tư NVH</p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
        
        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const colorClass = cat.color === "primary" ? "bg-primary/10 text-primary" :
                              cat.color === "accent" ? "bg-accent/10 text-accent" :
                              cat.color === "success" ? "bg-success/10 text-success" : "bg-warning/10 text-warning";
            return (
              <Card key={cat.id} className="border-0 shadow-medium hover:shadow-strong transition-all cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", colorClass)}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{cat.name}</p>
                    <p className="text-2xl font-bold">{cat.count}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Asset Table */}
        <Card className="border-0 shadow-strong">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border">
            <h3 className="font-bold text-lg">Danh sách tài sản</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Tìm kiếm..." className="pl-10 w-[200px]" />
              </div>
              <Button className="gradient-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" /> Nhập kho
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Tên tài sản</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead className="text-center">Tổng số</TableHead>
                    <TableHead className="text-center">Hỏng/Mất</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{asset.category}</Badge>
                      </TableCell>
                      <TableCell className="text-center font-bold">{asset.total}</TableCell>
                      <TableCell className="text-center">
                        {asset.damaged > 0 ? (
                          <span className="text-destructive font-bold">{asset.damaged}</span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{asset.location}</TableCell>
                      <TableCell>
                        {asset.status === "good" ? (
                          <Badge variant="outline" className="text-success border-success/30 bg-success/10">
                            <CheckCircle className="w-3 h-3 mr-1" /> Tốt
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-warning border-warning/30 bg-warning/10">
                            <AlertTriangle className="w-3 h-3 mr-1" /> Kiểm tra
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" onClick={() => openUpdateDialog(asset)}>
                          <Edit className="w-4 h-4 mr-1" /> Cập nhật
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-0 shadow-medium">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tổng tài sản</p>
                <p className="text-3xl font-bold text-foreground">{totalAssets}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Đang sử dụng tốt</p>
                <p className="text-3xl font-bold text-success">{totalAssets - totalDamaged}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hỏng / Mất</p>
                <p className="text-3xl font-bold text-destructive">{totalDamaged}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Update Dialog */}
      <Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
        <DialogContent className="max-w-sm">
          {selectedAsset && (
            <>
              <DialogHeader>
                <DialogTitle>Cập nhật trạng thái</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-semibold">{selectedAsset.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedAsset.category} • {selectedAsset.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Số lượng tổng</Label>
                    <Input type="number" defaultValue={selectedAsset.total} />
                  </div>
                  <div className="space-y-2">
                    <Label>Số lượng hỏng</Label>
                    <Input type="number" defaultValue={selectedAsset.damaged} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ghi chú</Label>
                  <Input placeholder="Mô tả tình trạng..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUpdateOpen(false)}>Hủy</Button>
                <Button onClick={handleUpdate} className="gradient-primary text-primary-foreground">Lưu thay đổi</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AdminTaskbar />
    </div>
  );
};

export default AdminAssets;