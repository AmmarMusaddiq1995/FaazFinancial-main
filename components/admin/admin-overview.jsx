"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createBrowserClient } from "@/lib/supabase/client";
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AdminOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBusinesses: 0,
    monthlyRevenue: 0,
    growthRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient();

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total users
        const { count: userCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true });

        // Fetch total businesses
        const { count: businessCount } = await supabase
          .from("business_formations")
          .select("*", { count: "exact", head: true });

        // Calculate monthly revenue (mock data for demo)
        const monthlyRevenue = (businessCount || 0) * 299; // Average service price

        // Calculate growth rate (mock data for demo)
        const growthRate = 12.5;

        setStats({
          totalUsers: userCount || 0,
          totalBusinesses: businessCount || 0,
          monthlyRevenue,
          growthRate,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [supabase]);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      description: "Registered users",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Businesses",
      value: stats.totalBusinesses.toLocaleString(),
      description: "Business formations",
      icon: Building2,
      color: "text-green-600",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      description: "This month",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "Growth Rate",
      value: `${stats.growthRate}%`,
      description: "Month over month",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
          <p className="text-gray-600">Welcome to the admin dashboard</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-600">Welcome to the admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={cn("h-4 w-4", stat.color)} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <CardDescription>{stat.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest user registrations and business formations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New user registration</p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">LLC formation completed</p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Payment processed</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Review Formations
              </Button>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
