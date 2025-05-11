import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, MessageSquare, Bell, Settings, Users, PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary">Team Dashboard</h1>
            <p className="text-lg text-muted-foreground mt-1">Welcome back! Manage your team and projects efficiently.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 since last week</p>
            </CardContent>
            <CardFooter>
                <Button size="sm" asChild variant="outline">
                    <Link href="/dashboard/projects">View Projects</Link>
                </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Chat</CardTitle>
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 Unread</div>
               <p className="text-xs text-muted-foreground">New messages in #general</p>
               <p className="text-sm text-accent mt-2">(Chat feature coming soon!)</p>
            </CardContent>
             <CardFooter>
                <Button size="sm" variant="outline" disabled>Open Chat</Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <Bell className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3 New</div>
              <p className="text-xs text-muted-foreground">Project milestones updated</p>
              <p className="text-sm text-accent mt-2">(Notifications feature coming soon!)</p>
            </CardContent>
            <CardFooter>
                <Button size="sm" variant="outline" disabled>View Notifications</Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Quick Actions</CardTitle>
                <CardDescription>Perform common tasks quickly.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Project
                </Button>
                <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" /> Manage Team
                </Button>
                <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" /> Account Settings
                </Button>
            </CardContent>
        </Card>

        {/* Placeholder for future dashboard content like charts or activity feeds */}
        <div className="mt-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold text-primary">Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Graphs and summaries of project progress will appear here.</p>
                    {/* Example: <img src="https://picsum.photos/seed/dashboardchart/800/300" alt="Project Chart Placeholder" data-ai-hint="dashboard chart" className="mt-4 rounded-md shadow-sm" /> */}
                     <div className="mt-4 p-8 text-center bg-secondary/50 rounded-md">
                        <p className="text-lg font-medium">Detailed analytics are on the way!</p>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </ProtectedRoute>
  );
}
