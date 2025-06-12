import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, FolderOpen, ImageIcon, Tags } from "lucide-react"
import { getDashboardStats } from "@/lib/admin"

export async function AdminDashboard() {
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-neutral-400 mt-1">Welcome to your photography admin panel</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Galleries</CardTitle>
            <FolderOpen className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalGalleries || 0}</div>
            <p className="text-xs text-neutral-400 mt-1">{stats.recentGalleries || 0} added this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Tags className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories || 0}</div>
            <p className="text-xs text-neutral-400 mt-1">{stats.recentCategories || 0} added this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <ImageIcon className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalImages || 0}</div>
            <p className="text-xs text-neutral-400 mt-1">{stats.recentImages || 0} uploaded this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <BarChart className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews || 0}</div>
            <p className="text-xs text-neutral-400 mt-1">
              {stats.viewsIncrease ? `${stats.viewsIncrease}% increase` : "No data"} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Galleries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentGalleriesList && stats.recentGalleriesList.length > 0 ? (
                stats.recentGalleriesList.map((gallery) => (
                  <div key={gallery.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{gallery.title}</p>
                      <p className="text-sm text-neutral-400">{gallery.category}</p>
                    </div>
                    <p className="text-sm text-neutral-400">{gallery.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-400">No recent galleries found</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Galleries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.popularGalleries && stats.popularGalleries.length > 0 ? (
                stats.popularGalleries.map((gallery) => (
                  <div key={gallery.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{gallery.title}</p>
                      <p className="text-sm text-neutral-400">{gallery.category}</p>
                    </div>
                    <p className="text-sm text-neutral-400">{gallery.views} views</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-400">No popular galleries found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
