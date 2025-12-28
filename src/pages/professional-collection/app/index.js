/**
 * @Description: Professional Collection Management System
 * @version: 1.0.0
 * @Author: hean
 * @Date: 2025-07-22 11:00:33
 * @LastEditors: hean
 * @LastEditTime: 2025-11-01 12:18:30
 */

/**********************
 * MOCK QUEUE DATA
 * TODO: 替换为后端 API
 **********************/
function generateMockQueue() {
    const baseQueue = [
        {
            id: 'NG456789',
            name: 'Grace Johnson',
            phone: '0803-224-5531',
            state: 'Lagos',
            dpd: 89,
            outstanding: 85200,
            risk: 'high',
            ptpStatus: 'broken',
            ptpDate: null,
            queue: 'all'
        },
        {
            id: 'NG234567',
            name: 'Ahmed Bello',
            phone: '0802-915-6723',
            state: 'Abuja',
            dpd: 45,
            outstanding: 42800,
            risk: 'medium',
            ptpStatus: 'valid',
            ptpDate: todayISO(),
            queue: 'ptpToday'
        },
        {
            id: 'NG999001',
            name: 'Chioma Okeke',
            phone: '0812-334-1111',
            state: 'Lagos',
            dpd: 12,
            outstanding: 32000,
            risk: 'low',
            ptpStatus: 'none',
            ptpDate: null,
            queue: 'all'
        },
        {
            id: 'NG999002',
            name: 'Ibrahim Musa',
            phone: '0807-223-9988',
            state: 'Kano',
            dpd: 63,
            outstanding: 112000,
            risk: 'high',
            ptpStatus: 'valid',
            ptpDate: todayISO(),
            queue: 'ptpToday'
        },
        {
            id: 'NG999003',
            name: 'Blessing Uche',
            phone: '0809-778-2044',
            state: 'Port Harcourt',
            dpd: 31,
            outstanding: 56000,
            risk: 'medium',
            ptpStatus: 'broken',
            ptpDate: null,
            queue: 'broken'
        }
    ];

    // 生成更多 mock 数据，方便演示分页
    const mockQueue = [...baseQueue];
    for (let i = 0; i < 25; i++) {
        mockQueue.push({
            id: 'NGMOCK' + (100 + i),
            name: 'Test User ' + (i + 1),
            phone: '0800-000-' + String(1000 + i),
            state: ['Lagos', 'Abuja', 'Kano', 'Ibadan'][i % 4],
            dpd: 1 + (i * 3) % 90,
            outstanding: 20000 + (i * 5000),
            risk: ['low', 'medium', 'high'][i % 3],
            ptpStatus: ['none', 'valid', 'broken'][i % 3],
            ptpDate: i % 4 === 0 ? todayISO() : null,
            queue: 'all'
        });
    }

    return mockQueue;
}

/**********************
 * UTILITIES
 **********************/
function todayISO() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
}

function formatNaira(n) {
    return '₦' + n.toLocaleString('en-NG');
}

export default {
    name: 'ProfessionalCollectionApp',
    data() {
        return {
            // Page state
            currentPageKey: 'dashboard',
            currentQueueTab: 'all',
            queuePageIndex: 0,
            pageSize: 10,
            filteredQueueCache: [],
            currentDetailCustomerId: null,
            autoRefreshTimer: null,
            recordsByCustomer: {},

            // Mock data
            MOCK_QUEUE: generateMockQueue(),

            // Filters
            searchQuery: '',
            filterRisk: '',
            filterPTP: '',
            filterAmount: '',

            // AI
            aiInput: '',
            aiMessages: [],

            // Modal
            showRecordModal: false,
            recordForm: {
                result: '',
                amount: null,
                nextDate: '',
                note: ''
            },

            // Navigation
            navItems: [
                { key: 'dashboard', label: 'Home', icon: 'fa-solid fa-house' },
                { key: 'queue', label: 'Queue', icon: 'fa-solid fa-list-check' },
                { key: 'analytics', label: 'Analytics', icon: 'fa-solid fa-chart-line' },
                { key: 'ai', label: 'AI', icon: 'fa-solid fa-robot' }
            ],

            // Queue tabs
            queueTabs: [
                { key: 'all', label: 'All' },
                { key: 'high', label: 'High Risk' },
                { key: 'ptpToday', label: 'PTP Today' },
                { key: 'broken', label: 'Broken PTP' }
            ]
        };
    },
    computed: {
        priorityQueueList() {
            return this.MOCK_QUEUE.slice()
                .sort((a, b) => b.dpd - a.dpd)
                .slice(0, 3);
        },
        displayedQueueItems() {
            const start = 0;
            const end = (this.queuePageIndex + 1) * this.pageSize;
            return this.filteredQueueCache.slice(start, end);
        },
        hasMoreItems() {
            return this.filteredQueueCache.length > (this.queuePageIndex + 1) * this.pageSize;
        },
        currentCustomer() {
            if (!this.currentDetailCustomerId) return null;
            return this.MOCK_QUEUE.find(x => x.id === this.currentDetailCustomerId);
        },
        detailNotes() {
            if (!this.currentDetailCustomerId) return [];
            const records = this.recordsByCustomer[this.currentDetailCustomerId] || [];
            return records.slice().reverse();
        },
        tabIndicatorStyle() {
            const index = this.queueTabs.findIndex(tab => tab.key === this.currentQueueTab);
            return {
                width: '25%',
                left: `${index * 25}%`
            };
        }
    },
    methods: {
        /**********************
         * UTILITIES
         **********************/
        todayISO,
        formatNaira,
        riskLabelClass(risk) {
            if (risk === 'high') return 'badge-risk-high';
            if (risk === 'medium') return 'badge-risk-medium';
            if (risk === 'low') return 'badge-risk-low';
            return '';
        },
        ptpLabelClass(status) {
            if (status === 'valid') return 'badge-ptp-valid';
            if (status === 'broken') return 'badge-ptp-broken';
            return '';
        },
        priorityClass(dpd) {
            if (dpd >= 60) return 'priority-high';
            if (dpd >= 30) return 'priority-medium';
            return 'priority-low';
        },

        /**********************
         * PAGE SWITCH
         **********************/
        switchPage(pageKey) {
            this.currentPageKey = pageKey;

            if (pageKey === 'queue') {
                this.ensureQueueRendered();
            }

            if (pageKey === 'dashboard') {
                // Priority queue is computed, no need to render
            }
        },
        backToQueue() {
            this.switchPage('queue');
        },

        /**********************
         * QUEUE FILTERING
         **********************/
        setQueueTab(tabKey) {
            this.currentQueueTab = tabKey;
            this.queuePageIndex = 0;
            this.ensureQueueRendered();
        },
        onFilterChanged() {
            this.queuePageIndex = 0;
            this.ensureQueueRendered();
        },
        ensureQueueRendered() {
            const search = this.searchQuery.trim().toLowerCase();
            const risk = this.filterRisk;
            const ptp = this.filterPTP;
            const amount = this.filterAmount;

            // 基于当前队列 tab 选择子集
            let data = this.MOCK_QUEUE.slice();
            if (this.currentQueueTab === 'high') {
                data = data.filter(c => c.risk === 'high');
            } else if (this.currentQueueTab === 'ptpToday') {
                data = data.filter(c => c.ptpDate === todayISO());
            } else if (this.currentQueueTab === 'broken') {
                data = data.filter(c => c.ptpStatus === 'broken');
            }

            // 搜索
            if (search) {
                data = data.filter(c => {
                    const target = (
                        c.name +
                        ' ' +
                        c.phone +
                        ' ' +
                        c.id
                    ).toLowerCase();
                    return target.includes(search);
                });
            }

            // Risk filter
            if (risk) {
                data = data.filter(c => c.risk === risk);
            }

            // PTP filter
            if (ptp) {
                if (ptp === 'none') {
                    data = data.filter(c => c.ptpStatus === 'none');
                } else {
                    data = data.filter(c => c.ptpStatus === ptp);
                }
            }

            // Amount filter
            if (amount) {
                data = data.filter(c => {
                    if (amount === 'lt50k') return c.outstanding < 50000;
                    if (amount === '50-100k')
                        return c.outstanding >= 50000 && c.outstanding <= 100000;
                    if (amount === 'gt100k') return c.outstanding > 100000;
                    return true;
                });
            }

            this.filteredQueueCache = data;
        },
        loadMoreQueue() {
            this.queuePageIndex++;
        },
        refreshQueue(fromUser) {
            // TODO: 将这里替换为真实 API 刷新逻辑
            if (fromUser) {
                // Show loading state if needed
                setTimeout(() => {
                    this.ensureQueueRendered();
                }, 400);
            } else {
                this.ensureQueueRendered();
            }
        },

        /**********************
         * CUSTOMER DETAIL
         **********************/
        openCustomerDetail(customerId) {
            const c = this.MOCK_QUEUE.find(x => x.id === customerId);
            if (!c) return;

            this.currentDetailCustomerId = customerId;
            this.switchPage('detail');
        },

        /**********************
         * RECORD MODAL
         **********************/
        openRecordModal() {
            if (!this.currentDetailCustomerId) return;
            this.showRecordModal = true;
        },
        hideRecordModal() {
            this.showRecordModal = false;
        },
        closeRecordModal(e) {
            if (e.target === e.currentTarget) {
                this.hideRecordModal();
            }
        },
        saveRecord() {
            if (!this.currentDetailCustomerId) return;
            const result = this.recordForm.result;
            const amountVal = this.recordForm.amount;
            const nextDate = this.recordForm.nextDate;
            const note = this.recordForm.note.trim();

            if (!result) {
                alert('Please select a result.');
                return;
            }

            const labelMap = {
                'connected': 'Customer Connected',
                'no-answer': 'No Answer',
                'wrong-number': 'Wrong Number',
                'busy': 'Busy',
                'ptp-made': 'PTP Made',
                'payment-received': 'Payment Received',
                'dispute': 'Customer Disputed',
                'refusal': 'Refused to Pay'
            };

            const rec = {
                result,
                resultLabel: labelMap[result] || result,
                amount: amountVal ? Number(amountVal) : null,
                nextDate: nextDate || null,
                note,
                date: new Date().toLocaleString('en-NG', {
                    hour12: true,
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            if (!this.recordsByCustomer[this.currentDetailCustomerId]) {
                this.$set(this.recordsByCustomer, this.currentDetailCustomerId, []);
            }
            this.recordsByCustomer[this.currentDetailCustomerId].push(rec);

            // reset
            this.recordForm = {
                result: '',
                amount: null,
                nextDate: '',
                note: ''
            };

            this.hideRecordModal();
            alert('Record saved.');
        },

        /**********************
         * AI DEMO
         **********************/
        demoAI(text) {
            this.aiMessages.push(text);
            this.$nextTick(() => {
                const box = this.$refs.aiChat;
                if (box) {
                    box.scrollTop = box.scrollHeight;
                }
            });
        },
        sendAIMessage() {
            const value = this.aiInput.trim();
            if (!value) return;
            this.demoAI(value);
            this.aiInput = '';
        },

        /**********************
         * DEMO ACTIONS
         **********************/
        demoCall(id) {
            alert('Mock: calling customer ' + id);
        },
        demoWhatsApp(id) {
            alert('Mock: open WhatsApp chat for ' + id);
        }
    },
    mounted() {
        this.ensureQueueRendered();
        if (this.autoRefreshTimer) clearInterval(this.autoRefreshTimer);
        this.autoRefreshTimer = setInterval(() => this.refreshQueue(false), 30000);
    },
    beforeDestroy() {
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
        }
    }
};
