<!--
 * @Description: Professional Collection Management System
 * @version: 1.0.0
 * @Author: hean
 * @Date: 2025-07-22 11:00:33
 * @LastEditors: hean
 * @LastEditTime: 2025-11-01 12:18:30
-->
<template>
    <div class="app min-h-screen pb-20" :style="appStyle">
        <!-- Dashboard Page -->
        <div v-show="currentPage === 'dashboard'" class="page">
            <!-- Enhanced Header with AI Insights -->
            <div class="glass-card mx-4 mt-6 p-6 slide-up">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h1 class="text-2xl font-bold text-white">Hi, John! 👋</h1>
                        <p class="text-gray-400 text-sm">Let's make today productive</p>
                        <div class="mt-2 flex items-center">
                            <span class="status-badge bg-green-600 bg-opacity-20 text-green-400 text-xs">
                                <i class="fas fa-fire mr-1"></i>High Performance Day
                            </span>
                            <span class="status-badge bg-blue-600 bg-opacity-20 text-blue-400 text-xs ml-2">
                                <i class="fas fa-clock mr-1"></i>Peak Time: 2-4 PM
                            </span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-cyan-400">85%</div>
                        <div class="text-xs text-gray-400">Monthly Target</div>
                        <div class="mt-1">
                            <div class="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div class="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style="width: 85%"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- AI-Powered Quick Actions -->
                <div class="bg-gradient-to-r from-blue-900 to-purple-900 bg-opacity-20 p-3 rounded-xl mb-4 border border-blue-700 border-opacity-30">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
                                <i class="fas fa-brain"></i>
                            </div>
                            <div>
                                <div class="text-white text-sm font-semibold">AI Recommendation</div>
                                <div class="text-xs text-gray-300">Focus on high-value cases first: Grace Johnson (₦85,200)</div>
                            </div>
                        </div>
                        <button @click="startSmartWorkflow" class="bg-blue-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">
                            Start Now
                        </button>
                    </div>
                </div>
                
                <!-- Enhanced Quick Stats with Progress -->
                <div class="grid grid-cols-3 gap-3">
                    <div class="stat-card p-3 text-center relative">
                        <div class="absolute top-1 right-1">
                            <div class="w-2 h-2 bg-green-400 rounded-full pulse-animation"></div>
                        </div>
                        <div class="text-xl font-bold text-green-400">42</div>
                        <div class="text-xs text-gray-400">Collected</div>
                        <div class="mt-1 text-xs text-green-300">+12% vs yesterday</div>
                    </div>
                    <div class="stat-card p-3 text-center relative">
                        <div class="absolute top-1 right-1">
                            <div class="w-2 h-2 bg-yellow-400 rounded-full pulse-animation"></div>
                        </div>
                        <div class="text-xl font-bold text-yellow-400">18</div>
                        <div class="text-xs text-gray-400">Pending</div>
                        <div class="mt-1 text-xs text-yellow-300">5 urgent</div>
                    </div>
                    <div class="stat-card p-3 text-center relative">
                        <div class="absolute top-1 right-1">
                            <div class="w-2 h-2 bg-blue-400 rounded-full pulse-animation"></div>
                        </div>
                        <div class="text-xl font-bold text-blue-400">156</div>
                        <div class="text-xs text-gray-400">Calls</div>
                        <div class="mt-1 text-xs text-blue-300">82% connect rate</div>
                    </div>
                </div>
            </div>

            <!-- Smart Workflow Section -->
            <div class="mx-4 mt-6">
                <h2 class="text-lg font-semibold text-white mb-4">
                    <i class="fas fa-magic mr-2 text-purple-400"></i>Smart Workflow
                </h2>
                <div class="grid grid-cols-2 gap-3">
                    <button @click="startHighValueWorkflow" class="glass-card p-4 text-left hover:bg-gray-700 transition-colors">
                        <div class="flex items-center mb-2">
                            <div class="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white mr-3">
                                <i class="fas fa-fire"></i>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-semibold">High Value Cases</div>
                                <div class="text-xs text-gray-400">12 cases • ₦850K total</div>
                            </div>
                        </div>
                        <div class="text-xs text-green-400">
                            <i class="fas fa-arrow-up mr-1"></i>Best collection potential
                        </div>
                    </button>
                    
                    <button @click="startOverdueWorkflow" class="glass-card p-4 text-left hover:bg-gray-700 transition-colors">
                        <div class="flex items-center mb-2">
                            <div class="w-10 h-10 bg-gradient-to-r from-red-600 to-red-800 rounded-lg flex items-center justify-center text-white mr-3">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-semibold">Critical Overdue</div>
                                <div class="text-xs text-gray-400">8 cases • 60+ days DPD</div>
                            </div>
                        </div>
                        <div class="text-xs text-red-400">
                            <i class="fas fa-clock mr-1"></i>Immediate attention required
                        </div>
                    </button>
                    
                    <button @click="startPTPWorkflow" class="glass-card p-4 text-left hover:bg-gray-700 transition-colors">
                        <div class="flex items-center mb-2">
                            <div class="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white mr-3">
                                <i class="fas fa-calendar-check"></i>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-semibold">PTP Follow-ups</div>
                                <div class="text-xs text-gray-400">15 follow-ups due today</div>
                            </div>
                        </div>
                        <div class="text-xs text-yellow-400">
                            <i class="fas fa-bell mr-1"></i>5 PTPs expiring today
                        </div>
                    </button>
                    
                    <button @click="startNewCaseWorkflow" class="glass-card p-4 text-left hover:bg-gray-700 transition-colors">
                        <div class="flex items-center mb-2">
                            <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center text-white mr-3">
                                <i class="fas fa-user-plus"></i>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-semibold">New Cases</div>
                                <div class="text-xs text-gray-400">23 fresh cases today</div>
                            </div>
                        </div>
                        <div class="text-xs text-green-400">
                            <i class="fas fa-star mr-1"></i>High success rate
                        </div>
                    </button>
                </div>
            </div>

            <!-- Enhanced Performance Analytics -->
            <div class="mx-4 mt-6">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-white">
                        <i class="fas fa-chart-line mr-2 text-blue-400"></i>Performance Analytics
                    </h2>
                    <button @click="togglePerformanceDetails" class="text-cyan-400 text-sm">
                        <i class="fas fa-expand mr-1"></i>Details
                    </button>
                </div>
                
                <!-- Real-time Performance Metrics -->
                <div class="glass-card p-4">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-cyan-400">₦425K</div>
                            <div class="text-xs text-gray-400">Collected Today</div>
                            <div class="text-xs text-green-400 mt-1">
                                <i class="fas fa-arrow-up mr-1"></i>+23% vs average
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="text-2xl font-bold text-green-400">92%</div>
                            <div class="text-xs text-gray-400">Efficiency Score</div>
                            <div class="text-xs text-green-400 mt-1">
                                <i class="fas fa-trophy mr-1"></i>Top 10% team
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-gray-400 text-sm">Collection Rate</span>
                                <div class="text-xs text-green-400">Above target (+8%)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-28 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
                                    <div class="h-full gradient-primary rounded-full transition-all duration-500" style="width: 75%"></div>
                                </div>
                                <span class="text-white font-semibold text-sm">75%</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-gray-400 text-sm">Connect Rate</span>
                                <div class="text-xs text-green-400">Excellent (+12%)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-28 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
                                    <div class="h-full gradient-success rounded-full transition-all duration-500" style="width: 82%"></div>
                                </div>
                                <span class="text-white font-semibold text-sm">82%</span>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div>
                                <span class="text-gray-400 text-sm">PTP Rate</span>
                                <div class="text-xs text-yellow-400">Below target (-5%)</div>
                            </div>
                            <div class="flex items-center">
                                <div class="w-28 h-2 bg-gray-700 rounded-full overflow-hidden mr-2">
                                    <div class="h-full gradient-warning rounded-full transition-all duration-500" style="width: 45%"></div>
                                </div>
                                <span class="text-white font-semibold text-sm">45%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Time-Based Performance Chart -->
                <div v-show="showPerformanceDetails" class="glass-card p-4 mt-3">
                    <h3 class="text-white font-semibold mb-3">
                        <i class="fas fa-clock mr-2 text-purple-400"></i>Hourly Performance
                    </h3>
                    <div class="h-32 flex items-end justify-between gap-1 mb-2">
                        <div class="flex-1 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-400" style="height: 40%" title="9 AM - 25% success">
                            <div class="text-xs text-white text-center pt-1">25%</div>
                        </div>
                        <div class="flex-1 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-400" style="height: 55%" title="10 AM - 45% success">
                            <div class="text-xs text-white text-center pt-1">45%</div>
                        </div>
                        <div class="flex-1 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-400" style="height: 75%" title="11 AM - 75% success">
                            <div class="text-xs text-white text-center pt-1">75%</div>
                        </div>
                        <div class="flex-1 bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-400" style="height: 60%" title="12 PM - 60% success">
                            <div class="text-xs text-white text-center pt-1">60%</div>
                        </div>
                        <div class="flex-1 bg-yellow-500 rounded-t transition-all duration-300 hover:bg-yellow-400" style="height: 35%" title="1 PM - 35% success">
                            <div class="text-xs text-white text-center pt-1">35%</div>
                        </div>
                        <div class="flex-1 bg-green-500 rounded-t transition-all duration-300 hover:bg-green-400" style="height: 85%" title="2 PM - 85% success">
                            <div class="text-xs text-white text-center pt-1">85%</div>
                        </div>
                        <div class="flex-1 bg-green-600 rounded-t transition-all duration-300 hover:bg-green-500 animate-pulse" style="height: 90%" title="3 PM - 90% success (Current)">
                            <div class="text-xs text-white text-center pt-1 font-bold">90%</div>
                        </div>
                    </div>
                    <div class="flex justify-between text-xs text-gray-400">
                        <span>9AM</span>
                        <span>11AM</span>
                        <span>1PM</span>
                        <span>3PM</span>
                    </div>
                    
                    <div class="mt-4 p-3 bg-green-900 bg-opacity-20 rounded-lg border border-green-700 border-opacity-30">
                        <div class="flex items-center text-green-400 text-sm">
                            <i class="fas fa-lightbulb mr-2"></i>
                            <span>Peak Performance Time: 2-4 PM (85%+ success rate)</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI-Powered Priority Queue -->
            <div class="mx-4 mt-6 mb-4">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-semibold text-white">
                        <i class="fas fa-brain mr-2 text-purple-400"></i>Smart Priority Queue
                    </h2>
                    <div class="flex gap-2">
                        <button @click="refreshPriorities" class="text-cyan-400 text-sm">
                            <i class="fas fa-sync-alt mr-1"></i>Refresh
                        </button>
                        <button @click="showPage('queue')" class="text-cyan-400 text-sm">View All</button>
                    </div>
                </div>
                
                <!-- Priority Strategy Banner -->
                <div class="bg-gradient-to-r from-purple-900 to-blue-900 bg-opacity-20 p-3 rounded-xl mb-4 border border-purple-700 border-opacity-30">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs mr-3">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div>
                                <div class="text-white text-sm font-semibold">Today's Strategy: High Recovery Focus</div>
                                <div class="text-xs text-gray-300">Prioritizing cases with 80%+ recovery probability</div>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-purple-400">24</div>
                            <div class="text-xs text-gray-400">Smart Priority</div>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <!-- AI Scored High Priority Case -->
                    <div v-for="(item, index) in priorityQueue.slice(0, 3)" :key="index" 
                         class="glass-card p-4 cursor-pointer relative" 
                         :class="`priority-${item.risk}`"
                         @click="showCustomerDetail(item)">
                        <div class="absolute top-2 right-2" v-if="item.aiScore">
                            <div class="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                                <i class="fas fa-fire mr-1"></i>AI: {{ item.aiScore }}/10
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <div class="font-semibold text-white">{{ item.name }}</div>
                                <div class="text-sm text-gray-400">{{ item.customerId }} • D+{{ item.dpd }} • {{ item.recoveryProb }}% recovery prob</div>
                                <div class="mt-2">
                                    <span v-if="item.ptp === 'broken'" class="status-badge ptp-broken">PTP Broken</span>
                                    <span v-if="item.ptp === 'valid'" class="status-badge ptp-valid">PTP Valid</span>
                                    <span v-if="item.ptp === 'none'" class="status-badge ptp-none">No PTP</span>
                                    <span class="status-badge ml-2" :class="getRiskBadgeClass(item.risk)">{{ item.risk.toUpperCase() }} Risk</span>
                                    <span v-if="item.aiPriority" class="status-badge bg-purple-600 bg-opacity-20 text-purple-400 ml-2">
                                        <i class="fas fa-brain mr-1"></i>AI Priority
                                    </span>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-lg font-bold" :class="getAmountColorClass(item.risk)">₦{{ formatAmount(item.amount) }}</div>
                                <div class="text-xs text-green-400" v-if="item.bestContactTime">Best contact: {{ item.bestContactTime }}</div>
                            </div>
                        </div>
                        <div class="flex gap-2 mt-3">
                            <button @click.stop="makeCall(item.customerId)" class="flex-1 gradient-primary text-white py-2 px-4 rounded-lg text-sm quick-action-btn">
                                <i class="fas fa-phone mr-2"></i>Call
                            </button>
                            <button @click.stop="sendWhatsApp(item.customerId)" class="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg text-sm quick-action-btn">
                                <i class="fas fa-whatsapp mr-2"></i>WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Queue Page -->
        <div v-show="currentPage === 'queue'" class="page">
            <!-- Header -->
            <div class="glass-card mx-4 mt-6 p-4">
                <div class="flex flex-col gap-3">
                    <div class="flex justify-between items-center">
                        <h1 class="text-xl font-bold text-white">Collection Queue</h1>
                        <div class="flex gap-2">
                            <button class="p-2 bg-gray-700 rounded-lg">
                                <i class="fas fa-filter text-gray-400"></i>
                            </button>
                            <button class="p-2 bg-gray-700 rounded-lg">
                                <i class="fas fa-search text-gray-400"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Sort Options -->
                    <div class="flex gap-2">
                        <button v-for="sort in sortOptions" :key="sort.key"
                                @click="sortQueue(sort.key)"
                                class="flex-1 py-2 px-3 rounded-lg text-xs font-medium"
                                :class="currentSort === sort.key ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'">
                            <i :class="sort.icon + ' mr-1'"></i>{{ sort.label }}
                        </button>
                    </div>
                </div>
                
                <!-- Professional Collection Tabs -->
                <div class="relative flex border-b border-gray-700 mt-4">
                    <button v-for="(tab, index) in queueTabs" :key="tab.key"
                            @click="switchQueueTab(tab.key)"
                            class="flex-1 py-3 text-xs tab-btn"
                            :class="currentFilter === tab.key ? 'text-white active' : 'text-gray-400'">
                        {{ tab.label }} ({{ tab.count }})
                    </button>
                    <div class="tab-indicator" :style="tabIndicatorStyle"></div>
                </div>
            </div>

            <!-- Search Bar -->
            <div class="mx-4 mt-4">
                <div class="glass-card p-3">
                    <input type="text" 
                           v-model="searchTerm"
                           @input="filterQueue"
                           placeholder="Search by name, phone, or ID..." 
                           class="w-full bg-transparent text-white placeholder-gray-400 outline-none">
                </div>
            </div>

            <!-- Queue List -->
            <div class="mx-4 mt-4 space-y-3">
                <div v-if="filteredQueueData.length === 0" class="glass-card p-8 text-center">
                    <i class="fas fa-search text-gray-400 text-3xl mb-3"></i>
                    <div class="text-gray-400">No results found</div>
                </div>
                <div v-for="item in filteredQueueData" :key="item.id"
                     class="glass-card p-4 cursor-pointer slide-up"
                     :class="`priority-${item.risk}`"
                     @click="showCustomerDetail(item)">
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="font-semibold text-white">{{ item.name }}</div>
                            <div class="text-sm text-gray-400">{{ item.customerId }} • D+{{ item.dpd }} • {{ item.contactAttempts }} calls</div>
                            <div class="mt-2">
                                <span v-if="item.ptp === 'valid'" class="status-badge ptp-valid">✓ PTP: {{ item.ptpDate }}</span>
                                <span v-if="item.ptp === 'broken'" class="status-badge ptp-broken">✗ PTP Broken</span>
                                <span v-if="item.ptp === 'none'" class="status-badge ptp-none">No PTP</span>
                                <span class="status-badge ml-2" :class="getRiskBadgeClass(item.risk)">{{ item.risk.toUpperCase() }} Risk</span>
                                <span v-if="item.assignedAgent === 'John'" class="status-badge ml-2" style="background: rgba(59, 130, 246, 0.2); color: #3b82f6;">My Case</span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold" :class="getAmountColorClass(item.risk)">₦{{ formatAmount(item.amount) }}</div>
                            <div class="text-xs text-gray-400">Last: {{ item.lastContact }}</div>
                        </div>
                    </div>
                    <div class="flex gap-2 mt-3">
                        <button @click.stop="makeCall(item.customerId)" class="flex-1 gradient-primary text-white py-2 px-4 rounded-lg text-sm quick-action-btn">
                            <i class="fas fa-phone mr-2"></i>Call
                        </button>
                        <button @click.stop="sendWhatsApp(item.customerId, 'customer')" class="flex-1 bg-gray-700 text-white py-2 px-4 rounded-lg text-sm quick-action-btn">
                            <i class="fas fa-whatsapp mr-2"></i>WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Analytics Page -->
        <div v-show="currentPage === 'analytics'" class="page">
            <div class="glass-card mx-4 mt-6 p-6 slide-up">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="flex items-center">
                            <h1 class="text-2xl font-bold text-white">Analytics Dashboard</h1>
                            <div class="ml-3 px-2 py-1 bg-green-600 bg-opacity-20 rounded-full">
                                <span class="text-green-400 text-xs font-semibold flex items-center">
                                    <div class="w-2 h-2 bg-green-400 rounded-full mr-2 pulse-animation"></div>
                                    Live Data
                                </span>
                            </div>
                        </div>
                        <p class="text-gray-400 text-sm mt-1">Real-time insights powered by AI</p>
                    </div>
                    <div class="flex gap-2">
                        <button @click="refreshAnalyticsData" class="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                            <i class="fas fa-sync-alt" :class="{ 'fa-spin': refreshing }"></i>
                        </button>
                        <button @click="exportAnalyticsReport" class="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                            <i class="fas fa-download mr-1"></i>Export Report
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- AI Assistant Page -->
        <div v-show="currentPage === 'ai-assistant'" class="page">
            <div class="glass-card mx-4 mt-6 p-4">
                <h1 class="text-xl font-bold text-white">AI Collection Assistant</h1>
            </div>

            <!-- AI Chat Interface -->
            <div class="mx-4 mt-6">
                <div class="glass-card p-4 h-96 overflow-y-auto">
                    <div class="space-y-4">
                        <div v-for="(msg, index) in chatMessages" :key="index" class="flex items-start slide-up">
                            <div v-if="msg.sender === 'ai'" class="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white text-sm mr-3">
                                <i class="fas fa-robot"></i>
                            </div>
                            <div :class="msg.sender === 'user' ? 'flex-1 text-right' : 'flex-1'">
                                <div v-if="msg.sender === 'user'" class="text-sm text-gray-400 mb-1">You</div>
                                <div v-else class="text-sm text-gray-400 mb-1">AI Assistant</div>
                                <div class="glass-card p-3" :class="msg.sender === 'user' ? 'text-blue-400 inline-block text-left' : 'text-white'">
                                    {{ msg.message }}
                                </div>
                            </div>
                            <div v-if="msg.sender === 'user'" class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm ml-3">
                                JC
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- AI Tools -->
            <div class="mx-4 mt-4">
                <div class="glass-card p-4">
                    <h3 class="text-white font-semibold mb-3">Quick AI Tools</h3>
                    <div class="grid grid-cols-2 gap-2">
                        <button @click="generateScript" class="p-3 bg-gray-700 rounded-lg text-white text-sm">
                            <i class="fas fa-comment-dots mb-1"></i><br>Generate Script
                        </button>
                        <button @click="analyzeRisk" class="p-3 bg-gray-700 rounded-lg text-white text-sm">
                            <i class="fas fa-shield-alt mb-1"></i><br>Risk Analysis
                        </button>
                        <button @click="predictPayment" class="p-3 bg-gray-700 rounded-lg text-white text-sm">
                            <i class="fas fa-chart-line mb-1"></i><br>Payment Prediction
                        </button>
                        <button @click="optimizeSchedule" class="p-3 bg-gray-700 rounded-lg text-white text-sm">
                            <i class="fas fa-calendar-check mb-1"></i><br>Optimize Schedule
                        </button>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="mx-4 mt-4 mb-4">
                <div class="glass-card p-3">
                    <div class="flex gap-2">
                        <input type="text" 
                               v-model="aiInput"
                               @keyup.enter="sendAIMessage"
                               placeholder="Ask me anything about collection..." 
                               class="flex-1 bg-transparent text-white placeholder-gray-400 outline-none">
                        <button @click="sendAIMessage" class="gradient-primary text-white px-4 py-2 rounded-lg">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Customer Detail Page -->
        <div v-show="currentPage === 'customer-detail'" class="page">
            <div class="glass-card mx-4 mt-6 p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <button @click="backToPreviousPage" class="text-cyan-400 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h1 class="text-xl font-bold text-white">Customer Details</h1>
                    </div>
                </div>
            </div>

            <div v-if="currentCustomer" class="mx-4 mt-4">
                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <button @click="makeCallFromDetail" class="gradient-primary text-white py-3 rounded-xl font-semibold action-button">
                        <i class="fas fa-phone mr-2"></i>Call Now
                    </button>
                    <button @click="sendWhatsAppFromDetail" class="bg-green-600 text-white py-3 rounded-xl font-semibold action-button">
                        <i class="fas fa-whatsapp mr-2"></i>WhatsApp
                    </button>
                </div>

                <!-- Customer Basic Info -->
                <div class="glass-card p-4">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <div class="text-2xl font-bold text-white">{{ currentCustomer.name }}</div>
                            <div class="text-sm text-gray-400 mt-1">Customer ID: {{ currentCustomer.customerId }}</div>
                            <div class="text-sm text-gray-400">Phone: {{ currentCustomer.phone }}</div>
                            <div class="text-sm text-gray-400">State: {{ currentCustomer.state }}</div>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold text-red-400">D+{{ currentCustomer.dpd }}</div>
                            <div class="text-xs text-gray-400">Days Past Due</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Profile Page -->
        <div v-show="currentPage === 'profile'" class="page">
            <!-- Header -->
            <div class="glass-card mx-4 mt-6 p-6">
                <div class="text-center">
                    <div class="w-20 h-20 gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                        JC
                    </div>
                    <h1 class="text-xl font-bold text-white">John Collector</h1>
                    <p class="text-gray-400">Senior Collection Agent</p>
                    <div class="flex justify-center gap-2 mt-3">
                        <span class="status-badge ptp-valid">Level 3</span>
                        <span class="status-badge" style="background: rgba(59, 130, 246, 0.2); color: #3b82f6;">Top Performer</span>
                    </div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="mx-4 mt-6">
                <div class="grid grid-cols-2 gap-3">
                    <div class="glass-card p-4 text-center">
                        <i class="fas fa-trophy text-yellow-400 text-2xl mb-2"></i>
                        <div class="text-2xl font-bold text-white">156</div>
                        <div class="text-xs text-gray-400">Total Wins</div>
                    </div>
                    <div class="glass-card p-4 text-center">
                        <i class="fas fa-calendar-check text-green-400 text-2xl mb-2"></i>
                        <div class="text-2xl font-bold text-white">342</div>
                        <div class="text-xs text-gray-400">Days Active</div>
                    </div>
                </div>
            </div>

            <!-- Settings -->
            <div class="mx-4 mt-6 mb-4">
                <h2 class="text-lg font-semibold text-white mb-4">Settings</h2>
                <div class="glass-card p-4">
                    <div class="space-y-4">
                        <button @click="openNotifications" class="w-full flex justify-between items-center py-2">
                            <div class="flex items-center">
                                <i class="fas fa-bell text-gray-400 mr-3"></i>
                                <span class="text-white">Notifications</span>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <div class="border-t border-gray-700"></div>
                        <button @click="toggleDarkMode" class="w-full flex justify-between items-center py-2">
                            <div class="flex items-center">
                                <i class="fas fa-moon text-gray-400 mr-3"></i>
                                <span class="text-white">Dark Mode</span>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                        <div class="border-t border-gray-700"></div>
                        <button @click="handleLogout" class="w-full flex justify-between items-center py-2">
                            <div class="flex items-center">
                                <i class="fas fa-sign-out-alt text-gray-400 mr-3"></i>
                                <span class="text-white">Logout</span>
                            </div>
                            <i class="fas fa-chevron-right text-gray-400"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Advanced Analytics Modules -->
            <div class="mx-4 mb-4">
                <div class="glass-card p-4">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-white font-semibold">Deep Analytics</h3>
                        <div class="flex gap-1">
                            <button @click="showAdvancedModule('channels')" 
                                    class="px-2 py-1 rounded text-xs"
                                    :class="activeAnalyticsModule === 'channels' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'">
                                Channels
                            </button>
                            <button @click="showAdvancedModule('timing')" 
                                    class="px-2 py-1 rounded text-xs"
                                    :class="activeAnalyticsModule === 'timing' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'">
                                Timing
                            </button>
                            <button @click="showAdvancedModule('risk')" 
                                    class="px-2 py-1 rounded text-xs"
                                    :class="activeAnalyticsModule === 'risk' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'">
                                Risk
                            </button>
                        </div>
                    </div>
                    
                    <!-- Channel Effectiveness Analysis -->
                    <div v-show="activeAnalyticsModule === 'channels'" class="space-y-4">
                        <div class="grid grid-cols-3 gap-3 text-center">
                            <div class="bg-gradient-to-br from-blue-900 to-blue-700 bg-opacity-20 p-3 rounded-lg border border-blue-700 border-opacity-30">
                                <i class="fas fa-phone text-blue-400 text-xl mb-2"></i>
                                <div class="text-lg font-bold text-white">78%</div>
                                <div class="text-xs text-gray-400">Call Success</div>
                                <div class="text-xs text-green-400 mt-1">↑ 5.2%</div>
                            </div>
                            <div class="bg-gradient-to-br from-green-900 to-green-700 bg-opacity-20 p-3 rounded-lg border border-green-700 border-opacity-30">
                                <i class="fab fa-whatsapp text-green-400 text-xl mb-2"></i>
                                <div class="text-lg font-bold text-white">65%</div>
                                <div class="text-xs text-gray-400">WhatsApp Rate</div>
                                <div class="text-xs text-green-400 mt-1">↑ 12.8%</div>
                            </div>
                            <div class="bg-gradient-to-br from-purple-900 to-purple-700 bg-opacity-20 p-3 rounded-lg border border-purple-700 border-opacity-30">
                                <i class="fas fa-sms text-purple-400 text-xl mb-2"></i>
                                <div class="text-lg font-bold text-white">42%</div>
                                <div class="text-xs text-gray-400">SMS Response</div>
                                <div class="text-xs text-yellow-400 mt-1">↓ 2.1%</div>
                            </div>
                        </div>
                        
                        <!-- Channel Mix Optimization -->
                        <div class="p-3 bg-blue-900 bg-opacity-20 rounded-lg">
                            <div class="text-blue-300 text-sm font-semibold mb-2">AI Channel Recommendation</div>
                            <div class="text-xs text-gray-300 space-y-1">
                                <div class="flex items-center">
                                    <i class="fas fa-phone text-blue-400 mr-2"></i>
                                    <span>Use calls for high-value cases (₦50K+)</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fab fa-whatsapp text-green-400 mr-2"></i>
                                    <span>WhatsApp best for 25-45 age group</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-sms text-purple-400 mr-2"></i>
                                    <span>SMS effective for payment reminders</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Timing Patterns Analysis -->
                    <div v-show="activeAnalyticsModule === 'timing'" class="space-y-4">
                        <!-- Hourly Performance Heatmap -->
                        <div>
                            <h4 class="text-white text-sm font-semibold mb-3">Hourly Success Rate Heatmap</h4>
                            <div class="grid grid-cols-8 gap-1 text-xs">
                                <div class="text-gray-400 text-center">Time</div>
                                <div class="text-center">9AM</div>
                                <div class="text-center">11AM</div>
                                <div class="text-center">1PM</div>
                                <div class="text-center">3PM</div>
                                <div class="text-center">5PM</div>
                                <div class="text-center">7PM</div>
                                <div class="text-center">9PM</div>
                                
                                <div class="text-gray-400">Mon-Fri</div>
                                <div class="h-6 bg-green-600 rounded opacity-50 text-center text-white">55%</div>
                                <div class="h-6 bg-green-600 rounded opacity-70 text-center text-white">72%</div>
                                <div class="h-6 bg-yellow-600 rounded opacity-60 text-center text-white">61%</div>
                                <div class="h-6 bg-green-500 rounded opacity-90 text-center text-white font-bold">89%</div>
                                <div class="h-6 bg-green-600 rounded opacity-80 text-center text-white">78%</div>
                                <div class="h-6 bg-yellow-600 rounded opacity-70 text-center text-white">65%</div>
                                <div class="h-6 bg-orange-600 rounded opacity-50 text-center text-white">42%</div>
                                
                                <div class="text-gray-400">Weekend</div>
                                <div class="h-6 bg-orange-600 rounded opacity-40 text-center text-white">38%</div>
                                <div class="h-6 bg-yellow-600 rounded opacity-50 text-center text-white">52%</div>
                                <div class="h-6 bg-green-600 rounded opacity-60 text-center text-white">58%</div>
                                <div class="h-6 bg-green-600 rounded opacity-75 text-center text-white">71%</div>
                                <div class="h-6 bg-green-500 rounded opacity-95 text-center text-white font-bold">86%</div>
                                <div class="h-6 bg-green-600 rounded opacity-85 text-center text-white">79%</div>
                                <div class="h-6 bg-yellow-600 rounded opacity-60 text-center text-white">61%</div>
                            </div>
                        </div>
                        
                        <!-- Optimal Timing Insights -->
                        <div class="p-3 bg-green-900 bg-opacity-20 rounded-lg">
                            <div class="text-green-300 text-sm font-semibold mb-2">Peak Performance Windows</div>
                            <div class="text-xs text-gray-300 space-y-1">
                                <div>🏆 Best: Weekdays 2-4 PM (89% success)</div>
                                <div>🥈 Second: Weekdays 5-7 PM (78% success)</div>
                                <div>🥉 Third: Weekend 5-7 PM (86% success)</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Advanced Risk Analysis -->
                    <div v-show="activeAnalyticsModule === 'risk'" class="space-y-4">
                        <!-- Risk Segmentation -->
                        <div>
                            <h4 class="text-white text-sm font-semibold mb-3">Advanced Risk Segmentation</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between items-center p-2 bg-red-900 bg-opacity-20 rounded-lg border-l-4 border-red-500">
                                    <div class="flex-1">
                                        <div class="text-red-400 text-sm font-semibold">Critical Risk</div>
                                        <div class="text-xs text-gray-300">15 cases • ₦1.2M value • 90% loss probability</div>
                                    </div>
                                    <div class="text-red-400 font-bold">Action Required</div>
                                </div>
                                
                                <div class="flex justify-between items-center p-2 bg-orange-900 bg-opacity-20 rounded-lg border-l-4 border-orange-500">
                                    <div class="flex-1">
                                        <div class="text-orange-400 text-sm font-semibold">High Risk</div>
                                        <div class="text-xs text-gray-300">28 cases • ₦2.8M value • 65% loss probability</div>
                                    </div>
                                    <div class="text-orange-400 font-bold">Monitor Closely</div>
                                </div>
                                
                                <div class="flex justify-between items-center p-2 bg-yellow-900 bg-opacity-20 rounded-lg border-l-4 border-yellow-500">
                                    <div class="flex-1">
                                        <div class="text-yellow-400 text-sm font-semibold">Medium Risk</div>
                                        <div class="text-xs text-gray-300">45 cases • ₦3.5M value • 35% loss probability</div>
                                    </div>
                                    <div class="text-yellow-400 font-bold">Standard Process</div>
                                </div>
                                
                                <div class="flex justify-between items-center p-2 bg-green-900 bg-opacity-20 rounded-lg border-l-4 border-green-500">
                                    <div class="flex-1">
                                        <div class="text-green-400 text-sm font-semibold">Low Risk</div>
                                        <div class="text-xs text-gray-300">62 cases • ₦4.2M value • 10% loss probability</div>
                                    </div>
                                    <div class="text-green-400 font-bold">Optimal Recovery</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Risk Mitigation Strategies -->
                        <div class="p-3 bg-purple-900 bg-opacity-20 rounded-lg">
                            <div class="text-purple-300 text-sm font-semibold mb-2">AI Risk Mitigation Strategies</div>
                            <div class="text-xs text-gray-300 space-y-1">
                                <div class="flex items-center">
                                    <i class="fas fa-exclamation-triangle text-red-400 mr-2"></i>
                                    <span>Critical: Escalate to senior agents immediately</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-phone-alt text-orange-400 mr-2"></i>
                                    <span>High: Multiple daily contacts + payment plans</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-calendar-check text-yellow-400 mr-2"></i>
                                    <span>Medium: Structured PTP follow-ups</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-bolt text-green-400 mr-2"></i>
                                    <span>Low: Standard collection workflow</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Action Button -->
        <button @click="toggleQuickActions" class="floating-button">
            <i class="fas fa-bolt"></i>
        </button>

        <!-- Quick Actions Panel -->
        <div v-show="showQuickActionsPanel" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click="closeQuickActions">
            <div @click.stop class="absolute bottom-20 left-4 right-4 glass-card rounded-t-3xl p-4 slide-up">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-bold text-white">Quick Actions</h3>
                    <button @click="closeQuickActions" class="text-gray-400">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-2 gap-3">
                    <button @click="quickCallLastCustomer" class="bg-green-600 text-white p-4 rounded-xl flex flex-col items-center action-button">
                        <i class="fas fa-phone text-2xl mb-2"></i>
                        <span class="text-sm">Call Last</span>
                    </button>
                    <button @click="quickDialer" class="bg-blue-600 text-white p-4 rounded-xl flex flex-col items-center action-button">
                        <i class="fas fa-th text-2xl mb-2"></i>
                        <span class="text-sm">Dialer</span>
                    </button>
                    <button @click="quickWhatsAppTemplate" class="bg-green-700 text-white p-4 rounded-xl flex flex-col items-center action-button">
                        <i class="fas fa-whatsapp text-2xl mb-2"></i>
                        <span class="text-sm">WA Template</span>
                    </button>
                    <button @click="quickSMSTemplate" class="bg-purple-600 text-white p-4 rounded-xl flex flex-col items-center action-button">
                        <i class="fas fa-sms text-2xl mb-2"></i>
                        <span class="text-sm">SMS Template</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="fixed bottom-0 w-full glass-card border-t border-gray-700 rounded-t-2xl">
            <div class="flex justify-around py-3">
                <button v-for="nav in navigationItems" :key="nav.key"
                        @click="showPage(nav.key)"
                        class="nav-item flex flex-col items-center"
                        :class="currentPage === nav.key ? 'active text-white' : 'text-gray-400'">
                    <i :class="nav.icon + ' text-xl mb-1'"></i>
                    <span class="text-xs">{{ nav.label }}</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index_module.scss" scoped></style>
