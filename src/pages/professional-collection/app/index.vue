<!--
 * @Description: Professional Collection Management System
 * @version: 1.0.0
 * @Author: hean
 * @Date: 2025-07-22 11:00:33
 * @LastEditors: hean
 * @LastEditTime: 2025-11-01 12:18:30
-->
<template>
    <div id="app" class="min-h-screen pb-20">
        <!-- ================= HEADER (GLOBAL) ================= -->
        <header class="px-4 pt-4 flex items-center justify-between">
            <div>
                <div class="text-xs text-slate-400 uppercase tracking-wide">
                    SkyLend Pro · Collections
                </div>
                <div class="text-lg font-semibold text-white">
                    Agent Workspace
                </div>
            </div>
            <button
                class="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
            >
                <i class="fa-solid fa-bell text-sm"></i>
            </button>
        </header>

        <!-- ================= DASHBOARD PAGE ================= -->
        <main v-show="currentPageKey === 'dashboard'" class="page">
            <!-- Top card -->
            <section class="glass-card mx-4 mt-4 p-5">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <div class="text-white text-xl font-semibold">
                            Hi, John 👋
                        </div>
                        <div class="text-slate-400 text-sm">
                            Let's make today productive
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-cyan-400">85%</div>
                        <div class="text-[11px] text-slate-400">Daily Target</div>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-3 mt-2">
                    <div class="stat-card p-3 text-center">
                        <div class="text-2xl font-bold text-emerald-400">42</div>
                        <div class="text-[11px] text-slate-400">Collected</div>
                    </div>
                    <div class="stat-card p-3 text-center">
                        <div class="text-2xl font-bold text-amber-400">18</div>
                        <div class="text-[11px] text-slate-400">Pending</div>
                    </div>
                    <div class="stat-card p-3 text-center">
                        <div class="text-2xl font-bold text-sky-400">156</div>
                        <div class="text-[11px] text-slate-400">Calls</div>
                    </div>
                </div>
            </section>

            <!-- Performance -->
            <section class="mx-4 mt-5">
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-sm font-semibold text-slate-100">
                        Today's Performance
                    </h2>
                </div>
                <div class="glass-card p-4">
                    <div class="space-y-4 text-xs">
                        <div class="flex justify-between items-center">
                            <span class="text-slate-400">Collection Rate</span>
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-28 h-2 bg-slate-800 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="gradient-primary h-full rounded-full"
                                        style="width: 76%"
                                    ></div>
                                </div>
                                <span class="text-slate-50 font-semibold text-xs">76%</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <span class="text-slate-400">Connect Rate</span>
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-28 h-2 bg-slate-800 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="gradient-success h-full rounded-full"
                                        style="width: 81%"
                                    ></div>
                                </div>
                                <span class="text-slate-50 font-semibold text-xs">81%</span>
                            </div>
                        </div>

                        <div class="flex justify-between items-center">
                            <span class="text-slate-400">PTP Rate</span>
                            <div class="flex items-center gap-2">
                                <div
                                    class="w-28 h-2 bg-slate-800 rounded-full overflow-hidden"
                                >
                                    <div
                                        class="gradient-warning h-full rounded-full"
                                        style="width: 43%"
                                    ></div>
                                </div>
                                <span class="text-slate-50 font-semibold text-xs">43%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Priority Queue -->
            <section class="mx-4 mt-5 mb-5">
                <div class="flex justify-between items-center mb-3">
                    <h2 class="text-sm font-semibold text-slate-100">
                        Priority Queue
                    </h2>
                    <button
                        class="text-xs text-cyan-400"
                        @click="switchPage('queue')"
                    >
                        View all
                    </button>
                </div>

                <div class="space-y-3 text-xs">
                    <div
                        v-for="c in priorityQueueList"
                        :key="c.id"
                        :class="['glass-card p-3 flex flex-col gap-2 cursor-pointer', priorityClass(c.dpd)]"
                        @click="openCustomerDetail(c.id)"
                    >
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="text-slate-100 font-semibold text-sm">{{ c.name }}</div>
                                <div class="text-[11px] text-slate-400">{{ c.id }} • D+{{ c.dpd }}</div>
                                <div class="mt-1 flex flex-wrap gap-1">
                                    <span :class="['status-badge', riskLabelClass(c.risk)]">
                                        {{ c.risk.toUpperCase() }} risk
                                    </span>
                                    <span
                                        v-if="c.ptpStatus === 'none'"
                                        class="status-badge text-slate-400 bg-slate-700/50"
                                    >
                                        No PTP
                                    </span>
                                    <span
                                        v-else
                                        :class="['status-badge', ptpLabelClass(c.ptpStatus)]"
                                    >
                                        {{ c.ptpStatus.toUpperCase() }} PTP
                                    </span>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-sm font-semibold text-sky-400">
                                    {{ formatNaira(c.outstanding) }}
                                </div>
                                <div class="text-[11px] text-slate-400">Outstanding</div>
                            </div>
                        </div>
                        <div class="flex gap-2 mt-1.5 text-[11px]">
                            <button
                                class="flex-1 gradient-primary text-white py-1.5 rounded-lg"
                                @click.stop="demoCall(c.id)"
                            >
                                <i class="fa-solid fa-phone mr-1"></i>Call
                            </button>
                            <button
                                class="flex-1 bg-slate-800 text-slate-100 py-1.5 rounded-lg"
                                @click.stop="demoWhatsApp(c.id)"
                            >
                                <i class="fa-brands fa-whatsapp mr-1"></i>WA
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- ================= QUEUE PAGE ================= -->
        <main v-show="currentPageKey === 'queue'" class="page">
            <section class="glass-card mx-4 mt-4 p-4">
                <div class="flex justify-between items-center mb-3">
                    <div>
                        <h1 class="text-base font-semibold text-slate-100">
                            Collection Queue
                        </h1>
                        <div class="text-[11px] text-slate-400">
                            {{ filteredQueueCache.length }} customers in this queue
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button
                            class="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 text-xs"
                            @click="refreshQueue(true)"
                            title="Refresh"
                        >
                            <i class="fa-solid fa-rotate-right"></i>
                        </button>
                    </div>
                </div>

                <!-- Tabs: 多队列 -->
                <div class="relative border-b border-slate-700 mt-1">
                    <div class="flex text-xs">
                        <button
                            v-for="(tab, index) in queueTabs"
                            :key="tab.key"
                            :class="['flex-1 py-2 text-center nav-tab', currentQueueTab === tab.key ? 'text-slate-100 queue-tab-active' : 'text-slate-400']"
                            @click="setQueueTab(tab.key, $event)"
                        >
                            {{ tab.label }}
                        </button>
                    </div>
                    <div
                        id="queueTabIndicator"
                        class="tab-indicator"
                        :style="tabIndicatorStyle"
                    ></div>
                </div>
            </section>

            <!-- Search & Filters -->
            <section class="mx-4 mt-3 space-y-2">
                <!-- Search -->
                <div class="glass-card px-3 py-2 flex items-center gap-2 text-xs">
                    <i class="fa-solid fa-magnifying-glass text-slate-400"></i>
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search by name / phone / ID"
                        class="flex-1 bg-transparent outline-none text-slate-100 placeholder-slate-500 text-xs"
                        @input="onFilterChanged"
                    />
                </div>

                <!-- Filter row -->
                <div class="grid grid-cols-3 gap-2 text-[11px]">
                    <select
                        v-model="filterAmount"
                        class="glass-card px-2 py-2 bg-transparent text-slate-100 outline-none"
                        @change="onFilterChanged"
                    >
                        <option value="">Amount</option>
                        <option value="lt50k">&lt; ₦50k</option>
                        <option value="50-100k">₦50k–₦100k</option>
                        <option value="gt100k">&gt; ₦100k</option>
                    </select>

                    <select
                        v-model="filterRisk"
                        class="glass-card px-2 py-2 bg-transparent text-slate-100 outline-none"
                        @change="onFilterChanged"
                    >
                        <option value="">Risk</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>

                    <select
                        v-model="filterPTP"
                        class="glass-card px-2 py-2 bg-transparent text-slate-100 outline-none"
                        @change="onFilterChanged"
                    >
                        <option value="">PTP</option>
                        <option value="valid">Valid</option>
                        <option value="broken">Broken</option>
                        <option value="none">No PTP</option>
                    </select>
                </div>
            </section>

            <!-- Queue List -->
            <section class="mx-4 mt-4 space-y-3 mb-4 text-xs">
                <div
                    v-for="c in displayedQueueItems"
                    :key="c.id"
                    :class="['glass-card p-3 flex flex-col gap-2 cursor-pointer', priorityClass(c.dpd)]"
                    @click="openCustomerDetail(c.id)"
                >
                    <div class="flex justify-between items-start">
                        <div>
                            <div class="text-slate-100 font-semibold text-sm">{{ c.name }}</div>
                            <div class="text-[11px] text-slate-400">{{ c.id }} • D+{{ c.dpd }}</div>
                            <div class="mt-1 flex flex-wrap gap-1">
                                <span :class="['status-badge', riskLabelClass(c.risk)]">
                                    {{ c.risk.toUpperCase() }} risk
                                </span>
                                <span
                                    v-if="c.ptpStatus === 'none'"
                                    class="status-badge text-slate-400 bg-slate-700/50"
                                >
                                    No PTP
                                </span>
                                <span
                                    v-else
                                    :class="['status-badge', ptpLabelClass(c.ptpStatus)]"
                                >
                                    {{ c.ptpStatus.toUpperCase() }} PTP
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-semibold text-sky-400">
                                {{ formatNaira(c.outstanding) }}
                            </div>
                            <div class="text-[11px] text-slate-400">Outstanding</div>
                            <div class="text-[10px] text-slate-500 mt-1">{{ c.state }}</div>
                        </div>
                    </div>
                    <div class="flex gap-2 mt-1.5 text-[11px]">
                        <button
                            class="flex-1 gradient-primary text-white py-1.5 rounded-lg"
                            @click.stop="demoCall(c.id)"
                        >
                            <i class="fa-solid fa-phone mr-1"></i>Call
                        </button>
                        <button
                            class="flex-1 bg-slate-800 text-slate-100 py-1.5 rounded-lg"
                            @click.stop="demoWhatsApp(c.id)"
                        >
                            <i class="fa-brands fa-whatsapp mr-1"></i>WA
                        </button>
                    </div>
                </div>
            </section>

            <!-- Load More -->
            <section class="mx-4 mb-5">
                <button
                    :disabled="!hasMoreItems"
                    class="w-full py-2.5 rounded-xl bg-slate-800 text-slate-100 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="loadMoreQueue"
                >
                    {{ hasMoreItems ? 'Load more' : 'No more customers' }}
                </button>
            </section>
        </main>

        <!-- ================= ANALYTICS PAGE ================= -->
        <main v-show="currentPageKey === 'analytics'" class="page">
            <section class="glass-card mx-4 mt-4 p-4">
                <div class="flex justify-between items-center mb-2">
                    <h1 class="text-base font-semibold text-slate-100">
                        Analytics
                    </h1>
                    <button
                        class="px-3 py-1 rounded-lg bg-sky-500 text-[11px] text-white"
                    >
                        <i class="fa-solid fa-download mr-1"></i>Export
                    </button>
                </div>
                <div class="text-[11px] text-slate-400">
                    High-level performance overview for this agent.
                </div>
            </section>

            <section class="mx-4 mt-4">
                <div class="grid grid-cols-2 gap-3 text-xs">
                    <div class="glass-card p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-slate-400 text-[11px]">Total Collected</span>
                            <span class="text-emerald-400 text-[11px]">+12.5%</span>
                        </div>
                        <div class="text-xl font-semibold text-slate-50">
                            ₦2.40M
                        </div>
                    </div>

                    <div class="glass-card p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-slate-400 text-[11px]">Recovery Rate</span>
                            <span class="text-sky-400 text-[11px]">+8.2%</span>
                        </div>
                        <div class="text-xl font-semibold text-slate-50">78.5%</div>
                    </div>

                    <div class="glass-card p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-slate-400 text-[11px]">Calls Made</span>
                            <span class="text-rose-400 text-[11px]">-3.1%</span>
                        </div>
                        <div class="text-xl font-semibold text-slate-50">
                            1,234
                        </div>
                    </div>

                    <div class="glass-card p-4">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-slate-400 text-[11px]">Avg Call Time</span>
                            <span class="text-emerald-400 text-[11px]">+5.7%</span>
                        </div>
                        <div class="text-xl font-semibold text-slate-50">3.2m</div>
                    </div>
                </div>
            </section>
        </main>

        <!-- ================= AI ASSISTANT PAGE ================= -->
        <main v-show="currentPageKey === 'ai'" class="page">
            <section class="glass-card mx-4 mt-4 p-4">
                <h1 class="text-base font-semibold text-slate-100">
                    AI Collection Assistant
                </h1>
                <div class="text-[11px] text-slate-400 mt-1">
                    Use AI to generate scripts, analyze risk and plan follow-ups.
                </div>
            </section>

            <section class="mx-4 mt-4">
                <div class="glass-card p-4 h-72 overflow-y-auto text-xs" ref="aiChat">
                    <div class="flex items-start gap-2 mb-3">
                        <div
                            class="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs"
                        >
                            <i class="fa-solid fa-robot"></i>
                        </div>
                        <div class="flex-1">
                            <div class="text-[11px] text-slate-400 mb-1">
                                AI Assistant
                            </div>
                            <div class="bg-slate-900/60 rounded-xl px-3 py-2">
                                Hi, I'm your AI assistant. I can:
                                <ul class="list-disc ml-4 mt-1 space-y-0.5">
                                    <li>Generate call scripts</li>
                                    <li>Estimate payment probability</li>
                                    <li>Suggest next best action</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div
                        v-for="(msg, index) in aiMessages"
                        :key="index"
                        class="mt-2 text-[11px] text-slate-100 bg-slate-900/70 rounded-lg px-3 py-2"
                    >
                        👉 {{ msg }}
                    </div>
                </div>
            </section>

            <section class="mx-4 mt-3">
                <div class="grid grid-cols-2 gap-2 text-[11px]">
                    <button
                        class="glass-card py-2 px-3 text-left"
                        @click="demoAI('Generate script for customer with D+60 & high risk.')"
                    >
                        <div class="text-slate-100 mb-0.5">
                            <i class="fa-solid fa-comment-dots mr-1"></i>Script
                        </div>
                        <div class="text-slate-400 text-[10px]">
                            Short, polite, firm.
                        </div>
                    </button>
                    <button
                        class="glass-card py-2 px-3 text-left"
                        @click="demoAI('Analyze risk for broken PTP and 3 missed calls.')"
                    >
                        <div class="text-slate-100 mb-0.5">
                            <i class="fa-solid fa-shield-halved mr-1"></i>Risk
                        </div>
                        <div class="text-slate-400 text-[10px]">
                            See risk factors and advice.
                        </div>
                    </button>
                </div>
            </section>

            <section class="mx-4 mt-3 mb-5">
                <div class="glass-card px-3 py-2 flex items-center gap-2 text-xs">
                    <input
                        v-model="aiInput"
                        type="text"
                        placeholder="Ask anything about this case..."
                        class="flex-1 bg-transparent outline-none text-slate-100 placeholder-slate-500"
                        @keyup.enter="sendAIMessage"
                    />
                    <button
                        class="gradient-primary px-3 py-1.5 rounded-xl text-[11px]"
                        @click="sendAIMessage"
                    >
                        <i class="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </section>
        </main>

        <!-- ================= CUSTOMER DETAIL PAGE ================= -->
        <main v-show="currentPageKey === 'detail'" class="page">
            <section class="glass-card mx-4 mt-4 p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                        <button
                            class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-200"
                            @click="backToQueue"
                        >
                            <i class="fa-solid fa-arrow-left text-xs"></i>
                        </button>
                        <div>
                            <div class="text-sm font-semibold text-slate-100">
                                {{ currentCustomer?.name || '-' }}
                            </div>
                            <div class="text-[11px] text-slate-400">
                                Customer ID: {{ currentCustomer?.id || '-' }}
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-xl font-semibold text-rose-400">
                            D+{{ currentCustomer?.dpd || 0 }}
                        </div>
                        <div class="text-[10px] text-slate-400">Days Past Due</div>
                    </div>
                </div>
            </section>

            <!-- Action buttons -->
            <section class="mx-4 mt-3">
                <div class="grid grid-cols-2 gap-2 text-xs">
                    <button
                        class="gradient-primary text-white py-2.5 rounded-xl font-semibold"
                    >
                        <i class="fa-solid fa-phone mr-1"></i>Call Now
                    </button>
                    <button
                        class="bg-emerald-600 text-white py-2.5 rounded-xl font-semibold"
                    >
                        <i class="fa-brands fa-whatsapp mr-1"></i>WhatsApp
                    </button>
                </div>
                <div class="grid grid-cols-3 gap-2 text-[11px] mt-2">
                    <button
                        class="bg-sky-600 text-white py-1.5 rounded-lg font-semibold"
                    >
                        SMS
                    </button>
                    <button
                        class="bg-amber-500 text-white py-1.5 rounded-lg font-semibold"
                        @click="openRecordModal"
                    >
                        Record PTP
                    </button>
                    <button
                        class="bg-rose-600 text-white py-1.5 rounded-lg font-semibold"
                    >
                        Escalate
                    </button>
                </div>
            </section>

            <!-- Loan + Contact info -->
            <section class="mx-4 mt-3 space-y-3 mb-6 text-xs">
                <div class="glass-card p-4">
                    <div class="flex justify-between items-center mb-2">
                        <div class="text-[11px] text-slate-400">Outstanding</div>
                        <div class="text-lg font-semibold text-rose-400">
                            {{ currentCustomer ? formatNaira(currentCustomer.outstanding) : '₦0' }}
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                        <div>
                            Phone:
                            <span class="text-slate-100">{{ currentCustomer?.phone || '-' }}</span>
                        </div>
                        <div>
                            State:
                            <span class="text-slate-100">{{ currentCustomer?.state || '-' }}</span>
                        </div>
                        <div>
                            Risk:
                            <span class="text-slate-100">{{ currentCustomer ? currentCustomer.risk.toUpperCase() : '-' }}</span>
                        </div>
                        <div>
                            PTP:
                            <span class="text-slate-100">
                                {{ currentCustomer?.ptpStatus === 'none' ? 'No PTP' : (currentCustomer?.ptpStatus?.toUpperCase() + ' PTP' || '-') }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="glass-card p-4">
                    <div class="flex justify-between items-center mb-2">
                        <div class="text-sm font-semibold text-slate-100">
                            Collection Notes
                        </div>
                        <button
                            class="text-[11px] text-cyan-400"
                            @click="openRecordModal"
                        >
                            + Add
                        </button>
                    </div>
                    <div class="space-y-2 text-[11px]">
                        <div
                            v-if="!detailNotes.length"
                            class="text-slate-500"
                        >
                            No notes yet. Add your first call result.
                        </div>
                        <div
                            v-for="(r, index) in detailNotes"
                            :key="index"
                            class="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2"
                        >
                            <div class="flex justify-between items-center mb-1">
                                <div class="text-[11px] text-slate-400">
                                    {{ r.date }} • {{ r.resultLabel }}
                                </div>
                                <div
                                    v-if="r.amount"
                                    class="text-[11px] text-emerald-400"
                                >
                                    {{ formatNaira(r.amount) }}
                                </div>
                            </div>
                            <div class="text-[11px] text-slate-100">{{ r.note || '-' }}</div>
                            <div
                                v-if="r.nextDate"
                                class="text-[10px] text-amber-400 mt-1"
                            >
                                Next action: {{ r.nextDate }}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- ================= BOTTOM NAV ================= -->
        <nav
            class="fixed bottom-0 left-0 right-0 bg-slate-900/95 border-t border-slate-800"
            style="max-width: 430px; margin: auto"
        >
            <div class="flex justify-around py-2.5 text-[11px] text-slate-400">
                <button
                    v-for="nav in navItems"
                    :key="nav.key"
                    :class="['nav-item flex flex-col items-center gap-0.5', currentPageKey === nav.key ? 'text-sky-400' : '']"
                    @click="switchPage(nav.key)"
                >
                    <i :class="[nav.icon, 'text-sm']"></i>
                    <span>{{ nav.label }}</span>
                </button>
            </div>
        </nav>

        <!-- ================= RECORD MODAL ================= -->
        <div
            v-if="showRecordModal"
            class="modal-backdrop"
            @click="closeRecordModal"
        >
            <div class="modal-content glass-card p-4 pb-6" @click.stop>
                <div class="flex justify-between items-center mb-3">
                    <div class="text-sm font-semibold text-slate-100">
                        Add Collection Record
                    </div>
                    <button
                        class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300"
                        @click="hideRecordModal"
                    >
                        <i class="fa-solid fa-xmark text-sm"></i>
                    </button>
                </div>

                <div class="space-y-3 text-xs">
                    <div>
                        <label class="block mb-1 text-slate-400">Result</label>
                        <select
                            v-model="recordForm.result"
                            class="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
                        >
                            <option value="">Select result</option>
                            <option value="connected">Customer Connected</option>
                            <option value="no-answer">No Answer</option>
                            <option value="wrong-number">Wrong Number</option>
                            <option value="busy">Busy</option>
                            <option value="ptp-made">PTP Made</option>
                            <option value="payment-received">Payment Received</option>
                            <option value="dispute">Customer Disputed</option>
                            <option value="refusal">Refused to Pay</option>
                        </select>
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-400">Payment Amount (if any)</label>
                        <input
                            v-model.number="recordForm.amount"
                            type="number"
                            class="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
                            placeholder="Enter amount"
                        />
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-400">Next Action Date</label>
                        <input
                            v-model="recordForm.nextDate"
                            type="date"
                            class="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none"
                        />
                    </div>

                    <div>
                        <label class="block mb-1 text-slate-400">Note</label>
                        <textarea
                            v-model="recordForm.note"
                            rows="3"
                            class="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 outline-none resize-none"
                            placeholder="Short summary of this attempt."
                        ></textarea>
                    </div>

                    <button
                        class="w-full mt-1 gradient-primary text-white py-2.5 rounded-xl text-xs font-semibold"
                        @click="saveRecord"
                    >
                        Save Record
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index_module.scss" scoped></style>
