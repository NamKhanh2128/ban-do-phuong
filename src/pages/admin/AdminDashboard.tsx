import AdminTaskbar from "@/components/AdminTaskbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Home, UserCheck, DollarSign, Eye, CheckCircle, 
  Clock, AlertCircle, TrendingUp, Calendar
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  LineChart, Line
} from "recharts";

const AdminDashboard = () => {
  // Stats Cards
  const stats = [
    { label: "Tổng hộ khẩu", value: "412", icon: Home, color: "primary", trend: "+5" },
    { label: "Tổng nhân khẩu", value: "1,724", icon: Users, color: "accent", trend: "+12" },
    { label: "Tạm trú/vắng", value: "86", icon: UserCheck, color: "success", trend: "+8" },
    { label: "Doanh thu NVH", value: "15.2tr", icon: DollarSign, color: "warning", trend: "+2.1tr" },
  ];

  // Age Distribution Chart Data (Case Study requirement)
  const ageData = [
    { name: "Mầm non", value: 89, fill: "hsl(199, 100%, 46%)" },
    { name: "Cấp 1", value: 156, fill: "hsl(172, 42%, 66%)" },
    { name: "Cấp 2", value: 134, fill: "hsl(145, 65%, 45%)" },
    { name: "Cấp 3", value: 112, fill: "hsl(35, 95%, 55%)" },
    { name: "Lao động", value: 987, fill: "hsl(199, 100%, 40%)" },
    { name: "Nghỉ hưu", value: 246, fill: "hsl(0, 84%, 60%)" },
  ];

  // Gender Distribution
  const genderData = [
    { name: "Nam", value: 856, fill: "hsl(199, 100%, 46%)" },
    { name: "Nữ", value: 868, fill: "hsl(172, 42%, 66%)" },
  ];

  // Population Growth
  const growthData = [
    { month: "T1", population: 1680 },
    { month: "T2", population: 1692 },
    { month: "T3", population: 1698 },
    { month: "T4", population: 1705 },
    { month: "T5", population: 1712 },
    { month: "T6", population: 1724 },
  ];

  // To-Do List (Pending Approvals)
  const todoItems = [
    { id: 1, title: "Trần Văn X - Đăng ký tạm trú", type: "residence", time: "30 phút trước", priority: "high" },
    { id: 2, title: "Nguyễn Thị Y - Yêu cầu sửa ngày sinh", type: "edit", time: "1 giờ trước", priority: "medium" },
    { id: 3, title: "Đặt Hội trường - 18:00 hôm nay", type: "booking", time: "2 giờ trước", priority: "high" },
    { id: 4, title: "Lê Văn Z - Khai báo tạm vắng", type: "absence", time: "3 giờ trước", priority: "low" },
    { id: 5, title: "Phạm Thị W - Đăng ký khai sinh", type: "newborn", time: "5 giờ trước", priority: "medium" },
  ];

  const pendingCounts = {
    residence: 5,
    booking: 2,
    edit: 3
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="gradient-primary px-6 py-8 pb-20 rounded-b-[32px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16" />
        <div className="relative z-10">
          <p className="text-sm text-primary-foreground/80 mb-1">Xin chào, Tổ trưởng</p>
          <h1 className="text-2xl font-bold text-primary-foreground">Tổng quan Quản trị</h1>
          <p className="text-sm text-primary-foreground/80 mt-1">Tổ 7 - Phường La Khê</p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto px-4 -mt-12 relative z-10 space-y-6">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-medium hover:shadow-strong transition-shadow">
              <CardContent className="p-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                  stat.color === "primary" ? "bg-primary/10" :
                  stat.color === "accent" ? "bg-accent/10" :
                  stat.color === "success" ? "bg-success/10" : "bg-warning/10"
                }`}>
                  <stat.icon className={`w-5 h-5 ${
                    stat.color === "primary" ? "text-primary" :
                    stat.color === "accent" ? "text-accent" :
                    stat.color === "success" ? "text-success" : "text-warning"
                  }`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <span className="text-xs text-success font-medium flex items-center">
                    <TrendingUp className="w-3 h-3 mr-0.5" /> {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* To-Do Widget */}
        <Card className="border-0 shadow-strong">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Việc cần làm</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {pendingCounts.residence} tạm trú • {pendingCounts.booking} đặt lịch • {pendingCounts.edit} sửa thông tin
              </p>
            </div>
            <Badge variant="destructive" className="text-sm px-3 py-1">
              {todoItems.length} chờ xử lý
            </Badge>
          </CardHeader>
          <CardContent className="p-0 divide-y divide-border">
            {todoItems.map((item) => (
              <div key={item.id} className="p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  item.priority === "high" ? "bg-destructive" :
                  item.priority === "medium" ? "bg-warning" : "bg-success"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground">{item.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="outline" className="h-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="h-8 gradient-primary text-primary-foreground">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Age Distribution Bar Chart */}
          <Card className="border-0 shadow-medium">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Phân bố độ tuổi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ageData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    axisLine={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value} người`, 'Số lượng']}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gender Pie Chart */}
          <Card className="border-0 shadow-medium">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                Phân bố giới tính
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: number) => [`${value} người`, 'Số lượng']}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value) => <span style={{ color: 'hsl(var(--foreground))', fontSize: '12px' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Population Growth Line Chart */}
        <Card className="border-0 shadow-medium">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Biến động dân số 6 tháng gần nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  domain={['dataMin - 20', 'dataMax + 20']}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: number) => [`${value} người`, 'Dân số']}
                />
                <Line 
                  type="monotone" 
                  dataKey="population" 
                  stroke="hsl(199, 100%, 46%)" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(199, 100%, 46%)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: 'hsl(172, 42%, 66%)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <AdminTaskbar />
    </div>
  );
};

export default AdminDashboard;