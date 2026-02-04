import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Clock, Trophy } from "lucide-react";

const UserDashboard = () => {
  // Mock data
  const courses = [
    {
      id: 1,
      title: "Complete React Developer Course 2024",
      instructor: "Aditya Kushwaha",
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      lastAccessed: "2 hours ago"
    },
    {
      id: 2,
      title: "Backend Masterclass with Node.js",
      instructor: "John Doe",
      progress: 10,
      totalLessons: 60,
      completedLessons: 6,
      image: "https://images.unsplash.com/photo-1627398242450-8df41da6982e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      lastAccessed: "1 day ago"
    },
     {
      id: 3,
      title: "Figma UI/UX Design Essentials",
      instructor: "Jane Smith",
      progress: 0,
      totalLessons: 25,
      completedLessons: 0,
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      lastAccessed: "Never"
    }
  ];

  return (
    <DashboardLayout type="user">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, ready to learn something new?</p>
        </div>

        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
              <PlayCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.filter(c => c.progress > 0 && c.progress < 100).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.filter(c => c.progress === 100).length}</div>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Learning Hours</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5h</div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Learning</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden flex flex-col">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                     <Badge variant={course.progress > 0 ? "secondary" : "outline"}>
                        {course.progress === 0 ? "Not Started" : course.progress === 100 ? "Completed" : "In Progress"}
                     </Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg mt-2">{course.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{course.instructor}</p>
                </CardHeader>
                <CardContent className="p-4 pt-0 mt-auto">
                   <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{course.progress}% Complete</span>
                    <span>{course.completedLessons}/{course.totalLessons} Lessons</span>
                   </div>
                   <Progress value={course.progress} className="h-2"/>
                   <Button className="w-full mt-4" size="sm">
                     {course.progress === 0 ? "Start Learning" : "Continue"}
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default UserDashboard;
