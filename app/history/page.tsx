"use client"

import { BottomNavigation } from "@/components/bottom-navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { useHistory } from "@/components/history-provider"
import { useState } from "react"

export default function HistoryPage() {
  const { reports } = useHistory()
  const [search, setSearch] = useState("")
  const filteredReports = reports.filter((report) => {
    if (!report) return false
    
    const q = search.toLowerCase()
    const condition = report.condition || ''
    const description = report.description || ''
    const date = report.date || ''
    
    return (
      (typeof condition === 'string' && condition.toLowerCase().includes(q)) ||
      (typeof description === 'string' && description.toLowerCase().includes(q)) ||
      (typeof date === 'string' && date.toLowerCase().includes(q))
    )
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <header className="p-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">History</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">View your past skin analyses</p>
      </header>
      <main className="flex-1 flex flex-col items-center justify-start pt-8 relative">
        {/* Background Pattern (matches Home page) */}
        <div
          className="absolute inset-0 z-0 opacity-5 dark:opacity-3 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%230f766e' fillOpacity='1' fillRule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: "300px 300px",
          }}
        ></div>
        <PageTransition>
          <div className="w-full max-w-md flex flex-col items-center">
            {/* Search Bar */}
            <div className="relative w-full mb-10">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search className="w-5 h-5" />
              </span>
              <Input
                className="pl-12 py-3 rounded-lg border border-[color:hsl(var(--border))] bg-white dark:bg-slate-900 shadow-none focus:border-[color:hsl(var(--border))]"
                placeholder="Search reports..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            {/* Reports List or Empty State */}
            {filteredReports.length === 0 ? (
              <div className="text-center">
                <p className="text-slate-500 dark:text-slate-400 mb-6">You haven't created any reports yet{search ? " or no reports match your search." : "."}</p>
                <Link href="/home">
                  <Button className="px-8 py-3 text-base font-semibold bg-teal-500 hover:bg-teal-600">Create Your First Report</Button>
                </Link>
              </div>
            ) : (
              <div className="w-full space-y-4">
                {filteredReports.map((report, index) => {
                  // Create a compound key using both ID and index to ensure uniqueness
                  const uniqueKey = `${report.id}-${index}`;
                  return (
                    <Link key={uniqueKey} href={`/report/${report.id}`} className="block">
                      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg p-4 flex gap-4 items-center transition-transform transition-shadow duration-200 ease-in-out hover:shadow-2xl hover:scale-105 cursor-pointer">
                        <img 
                          src={report.imageUrl || "/images/placeholder.jpg"} 
                          alt="Skin" 
                          className="w-16 h-16 rounded-lg object-cover border border-slate-200 dark:border-slate-800" 
                          onError={(e) => {
                            // Fallback image if the stored image fails to load
                            e.currentTarget.src = "/images/placeholder.jpg";
                          }}
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-slate-800 dark:text-white">{report.condition}</div>
                          <div className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2">{report.description}</div>
                          <div className="text-xs text-slate-400 mt-1">{new Date(report.date).toLocaleString()}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </PageTransition>
      </main>
      <BottomNavigation currentPath="/history" />
    </div>
  )
}
