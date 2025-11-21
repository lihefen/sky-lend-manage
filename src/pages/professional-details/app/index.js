import { navigateTo } from '@/utils';
import { get } from 'lodash';

// Mock queue data
const mockQueueData = [
    // Today's Target - High Priority
    { id: 1, name: "Grace Johnson", customerId: "NG456789", dpd: 89, amount: 85200, risk: "high", ptp: "broken", lastContact: "2 hours ago", contactAttempts: 8, ptpDate: "2025-02-15", assignedAgent: "John", phone: "0803-224-5531", state: "Lagos", aiScore: 9.2, recoveryProb: 85, bestContactTime: "2-4 PM", aiPriority: true },
    { id: 2, name: "Ahmed Bello", customerId: "NG234567", dpd: 45, amount: 42800, risk: "medium", ptp: "valid", lastContact: "5 hours ago", contactAttempts: 3, ptpDate: "2025-02-20", assignedAgent: "Sarah", phone: "0802-915-6723", state: "Abuja", recoveryProb: 70 },
    { id: 3, name: "Chioma Okoro", customerId: "NG345678", dpd: 12, amount: 15600, risk: "low", ptp: "valid", lastContact: "1 day ago", contactAttempts: 1, ptpDate: "2025-02-19", assignedAgent: "John", phone: "0801-456-7890", state: "Lagos", recoveryProb: 95 },
    
    // Severely Overdue
    { id: 4, name: "Tunde Adekunle", customerId: "NG345678", dpd: 67, amount: 67800, risk: "high", ptp: "broken", lastContact: "3 days ago", contactAttempts: 12, ptpDate: "2025-02-10", assignedAgent: "Mike", phone: "0803-123-4567", state: "Lagos" },
    { id: 5, name: "Michael Yusuf", customerId: "NG789012", dpd: 78, amount: 76500, risk: "high", ptp: "none", lastContact: "4 days ago", contactAttempts: 15, ptpDate: null, assignedAgent: "John", phone: "0804-234-5678", state: "Abuja" },
    { id: 6, name: "Ruth Nwankwo", customerId: "NG678901", dpd: 92, amount: 54300, risk: "high", ptp: "broken", lastContact: "2 days ago", contactAttempts: 10, ptpDate: "2025-02-08", assignedAgent: "Peter", phone: "0805-345-6789", state: "Port Harcourt" },
    
    // PTP Confirmed
    { id: 7, name: "Funke Adebayo", customerId: "NG901234", dpd: 12, amount: 8900, risk: "low", ptp: "valid", lastContact: "6 hours ago", contactAttempts: 2, ptpDate: "2025-02-19", assignedAgent: "John", phone: "0806-456-7890", state: "Lagos" },
    { id: 8, name: "Samuel Okafor", customerId: "NG567890", dpd: 34, amount: 23400, risk: "medium", ptp: "valid", lastContact: "1 hour ago", contactAttempts: 4, ptpDate: "2025-02-18", assignedAgent: "Mike", phone: "0807-567-8901", state: "Kano" },
    { id: 9, name: "Patience Eze", customerId: "NG890123", dpd: 29, amount: 19800, risk: "low", ptp: "valid", lastContact: "3 hours ago", contactAttempts: 3, ptpDate: "2025-02-20", assignedAgent: "Sarah", phone: "0808-678-9012", state: "Ibadan" },
    
    // New Cases
    { id: 10, name: "Tola Adeyemi", customerId: "NG456790", dpd: 3, amount: 9800, risk: "low", ptp: "none", lastContact: "2 hours ago", contactAttempts: 0, ptpDate: null, assignedAgent: "Sarah", phone: "0809-789-0123", state: "Lagos" },
    { id: 11, name: "Ibrahim Sule", customerId: "NG123457", dpd: 7, amount: 22300, risk: "low", ptp: "none", lastContact: "6 hours ago", contactAttempts: 2, ptpDate: null, assignedAgent: "Mike", phone: "0810-890-1234", state: "Abuja" },
];

export default {
    name: 'ProfessionalCollectionApp',
    data() {
        return {
            currentPage: 'dashboard',
            currentSort: 'amount',
            currentFilter: 'today',
            searchTerm: '',
            showPerformanceDetails: false,
            showQuickActionsPanel: false,
            refreshing: false,
            currentCustomer: null,
            currentCaseIndex: 0,
            previousPage: 'dashboard',
            aiInput: '',
            activeAnalyticsModule: 'channels',
            showDetailedMetrics: false,
            selectedDateRange: 'today',
            currentChartView: 'week',
            currentChartType: 'bar',
            showDPDHeatmap: false,
            teamView: 'ranking',
            dateRanges: [
                { key: 'today', label: 'Today' },
                { key: 'week', label: 'Week' },
                { key: 'month', label: 'Month' },
                { key: 'custom', label: 'Custom' }
            ],
            chartViews: [
                { key: 'week', label: 'Week' },
                { key: 'month', label: 'Month' },
                { key: 'quarter', label: 'Quarter' }
            ],
            chartTypes: [
                { key: 'bar', icon: 'fas fa-chart-bar' },
                { key: 'line', icon: 'fas fa-chart-line' },
                { key: 'area', icon: 'fas fa-chart-area' }
            ],
            chartData: [
                { label: 'Mon', amount: '₦2.1M', change: 12, targetHeight: 70, collectedHeight: 65, predictionHeight: 5, isToday: false, isPredicted: false },
                { label: 'Tue', amount: '₦2.6M', change: 18, targetHeight: 85, collectedHeight: 82, predictionHeight: 5, isToday: false, isPredicted: false },
                { label: 'Wed', amount: '₦1.8M', change: -8, targetHeight: 60, collectedHeight: 55, predictionHeight: 5, isToday: false, isPredicted: false },
                { label: 'Thu', amount: '₦2.9M', change: 15, targetHeight: 90, collectedHeight: 88, predictionHeight: 8, isToday: true, isPredicted: false },
                { label: 'Fri', amount: '₦2.4M', change: 0, targetHeight: 75, collectedHeight: 70, predictionHeight: 5, isToday: false, isPredicted: true },
                { label: 'Sat', amount: '₦3.1M', change: 0, targetHeight: 95, collectedHeight: 92, predictionHeight: 5, isToday: false, isPredicted: true },
                { label: 'Sun', amount: '₦2.8M', change: 0, targetHeight: 88, collectedHeight: 85, predictionHeight: 5, isToday: false, isPredicted: true }
            ],
            heatmapData: [
                { class: 'bg-green-600', opacity: 0.4, title: '0-30 Days: 45 cases' },
                { class: 'bg-green-600', opacity: 0.6, title: '0-30 Days: 52 cases' },
                { class: 'bg-yellow-600', opacity: 0.5, title: '31-60 Days: 28 cases' },
                { class: 'bg-green-600', opacity: 0.4, title: '0-30 Days: 41 cases' },
                { class: 'bg-yellow-600', opacity: 0.7, title: '31-60 Days: 35 cases' },
                { class: 'bg-red-600', opacity: 0.8, title: '61+ Days: 18 cases' },
                { class: 'bg-yellow-600', opacity: 0.6, title: '31-60 Days: 30 cases' },
                { class: 'bg-green-600', opacity: 0.5, title: '0-30 Days: 48 cases' },
                { class: 'bg-green-600', opacity: 0.45, title: '0-30 Days: 43 cases' },
                { class: 'bg-yellow-600', opacity: 0.65, title: '31-60 Days: 32 cases' },
                { class: 'bg-red-600', opacity: 0.9, title: '61+ Days: 25 cases' },
                { class: 'bg-yellow-600', opacity: 0.55, title: '31-60 Days: 29 cases' },
                { class: 'bg-red-600', opacity: 0.85, title: '61+ Days: 22 cases' },
                { class: 'bg-green-600', opacity: 0.6, title: '0-30 Days: 55 cases' },
                { class: 'bg-yellow-600', opacity: 0.7, title: '31-60 Days: 36 cases' },
                { class: 'bg-red-600', opacity: 0.95, title: '61+ Days: 28 cases' },
                { class: 'bg-red-600', opacity: 0.75, title: '61+ Days: 20 cases' },
                { class: 'bg-yellow-600', opacity: 0.5, title: '31-60 Days: 27 cases' },
                { class: 'bg-green-600', opacity: 0.55, title: '0-30 Days: 46 cases' },
                { class: 'bg-green-600', opacity: 0.65, title: '0-30 Days: 58 cases' },
                { class: 'bg-yellow-600', opacity: 0.6, title: '31-60 Days: 31 cases' },
                { class: 'bg-green-600', opacity: 0.7, title: '0-30 Days: 62 cases' },
                { class: 'bg-green-600', opacity: 0.75, title: '0-30 Days: 67 cases' },
                { class: 'bg-yellow-600', opacity: 0.45, title: '31-60 Days: 25 cases' },
                { class: 'bg-red-600', opacity: 0.8, title: '61+ Days: 19 cases' },
                { class: 'bg-yellow-600', opacity: 0.55, title: '31-60 Days: 28 cases' },
                { class: 'bg-red-600', opacity: 0.7, title: '61+ Days: 16 cases' },
                { class: 'bg-green-600', opacity: 0.8, title: '0-30 Days: 71 cases' }
            ],
            teamRankings: [
                {
                    rank: 1,
                    name: 'Sarah Chen',
                    stats: '₦185,000 collected • 42 cases',
                    rate: 92,
                    change: '↑ 3.2%',
                    aiScore: 9.4,
                    bgClass: 'bg-gradient-to-r from-yellow-900 to-yellow-700 bg-opacity-10 border-yellow-500',
                    rankClass: 'gradient-warning',
                    rateClass: 'text-yellow-400',
                    changeClass: 'text-green-400',
                    badges: [
                        { icon: 'fas fa-fire', text: '7 day streak', class: 'text-green-400' },
                        { icon: 'fas fa-chart-line', text: '+23% vs avg', class: 'text-blue-400' }
                    ]
                },
                {
                    rank: 2,
                    name: 'You',
                    stats: '₦168,000 collected • 38 cases',
                    rate: 85,
                    change: '↑ 5.1%',
                    aiScore: 8.7,
                    bgClass: 'bg-gradient-to-r from-blue-900 to-blue-700 bg-opacity-10 border-blue-500',
                    rankClass: 'bg-blue-600',
                    rateClass: 'text-blue-400',
                    changeClass: 'text-green-400',
                    badges: [
                        { icon: 'fas fa-brain', text: 'AI optimized', class: 'text-purple-400' },
                        { icon: 'fas fa-trending-up', text: 'Top performer', class: 'text-green-400' }
                    ]
                },
                {
                    rank: 3,
                    name: 'Mike Okafor',
                    stats: '₦152,000 collected • 35 cases',
                    rate: 78,
                    change: '↓ 1.2%',
                    aiScore: 7.8,
                    bgClass: '',
                    rankClass: 'bg-orange-700',
                    rateClass: 'text-orange-400',
                    changeClass: 'text-red-400',
                    badges: [
                        { icon: 'fas fa-clock', text: 'Steady pace', class: 'text-yellow-400' },
                        { icon: 'fas fa-minus', text: '0% change', class: 'text-gray-400' }
                    ]
                }
            ],
            bestTimeSlots: [
                { time: '10-11 AM', success: '82%', colorClass: 'text-green-400' },
                { time: '2-4 PM', success: '89%', colorClass: 'text-green-400' },
                { time: '7-8 PM', success: '71%', colorClass: 'text-yellow-400' }
            ],
            channelEffectiveness: [
                { name: 'Phone Call', rate: '78%', colorClass: 'text-green-400' },
                { name: 'WhatsApp', rate: '65%', colorClass: 'text-blue-400' },
                { name: 'SMS', rate: '42%', colorClass: 'text-yellow-400' }
            ],
            chatMessages: [
                {
                    sender: 'ai',
                    message: "Hello! I'm your AI collection assistant. I can help you with:\n\n• Payment negotiation strategies\n• Customer communication tips\n• Risk assessment\n• PTP follow-up timing\n\nWhat would you like help with today?"
                }
            ],
            queueData: mockQueueData,
            sortOptions: [
                { key: 'amount', label: 'Amount', icon: 'fas fa-money-bill' },
                { key: 'dpd', label: 'Days', icon: 'fas fa-clock' },
                { key: 'contact', label: 'Contacts', icon: 'fas fa-phone' },
                { key: 'risk', label: 'Risk', icon: 'fas fa-exclamation-triangle' }
            ],
            queueTabs: [
                { key: 'today', label: 'Target', count: 35 },
                { key: 'overdue', label: 'Overdue', count: 28 },
                { key: 'ptp', label: 'PTP', count: 22 },
                { key: 'broken', label: 'Lost', count: 18 },
                { key: 'new', label: 'New', count: 25 }
            ],
            navigationItems: [
                { key: 'dashboard', label: 'Home', icon: 'fas fa-home' },
                { key: 'queue', label: 'Queue', icon: 'fas fa-list' },
                { key: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
                { key: 'ai-assistant', label: 'AI', icon: 'fas fa-robot' },
                { key: 'profile', label: 'Profile', icon: 'fas fa-user' }
            ],
            appStyle: {
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                color: '#e2e8f0',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, sans-serif',
                maxWidth: '430px',
                margin: 'auto',
                overflowX: 'hidden',
                minHeight: '100vh'
            }
        };
    },
    computed: {
        priorityQueue() {
            return this.queueData
                .filter(item => item.risk === 'high' || item.aiPriority)
                .sort((a, b) => {
                    if (a.aiScore && b.aiScore) {
                        return b.aiScore - a.aiScore;
                    }
                    return b.amount - a.amount;
                })
                .slice(0, 5);
        },
        filteredQueueData() {
            let filtered = [...this.queueData];
            
            // Apply filter
            if (this.currentFilter === 'today') {
                filtered = filtered.filter(item => 
                    item.risk === 'high' || 
                    (item.ptp === 'valid' && item.dpd <= 7) ||
                    (item.ptp === 'broken' && item.dpd <= 14)
                );
            } else if (this.currentFilter === 'overdue') {
                filtered = filtered.filter(item => item.dpd >= 60);
            } else if (this.currentFilter === 'ptp') {
                filtered = filtered.filter(item => item.ptp === 'valid');
            } else if (this.currentFilter === 'broken') {
                filtered = filtered.filter(item => 
                    item.ptp === 'broken' || item.contactAttempts >= 5
                );
            } else if (this.currentFilter === 'new') {
                filtered = filtered.filter(item => item.dpd <= 7);
            }
            
            // Apply search
            if (this.searchTerm) {
                const term = this.searchTerm.toLowerCase();
                filtered = filtered.filter(item => 
                    item.name.toLowerCase().includes(term) ||
                    item.customerId.toLowerCase().includes(term) ||
                    item.dpd.toString().includes(term)
                );
            }
            
            // Apply sort
            filtered.sort((a, b) => {
                switch(this.currentSort) {
                    case 'amount':
                        return b.amount - a.amount;
                    case 'dpd':
                        return b.dpd - a.dpd;
                    case 'contact':
                        return a.contactAttempts - b.contactAttempts;
                    case 'risk':
                        const riskOrder = { 'high': 3, 'medium': 2, 'low': 1 };
                        return riskOrder[b.risk] - riskOrder[a.risk];
                    default:
                        return 0;
                }
            });
            
            return filtered;
        },
        tabIndicatorStyle() {
            const activeIndex = this.queueTabs.findIndex(tab => tab.key === this.currentFilter);
            return {
                width: '20%',
                left: `${activeIndex * 20}%`
            };
        }
    },
    mounted() {
        this.initializeApp();
    },
    methods: {
        initializeApp() {
            // Initialize app
        },
        showPage(page) {
            if (page !== 'customer-detail') {
                this.previousPage = this.currentPage;
            }
            this.currentPage = page;
        },
        sortQueue(sortBy) {
            this.currentSort = sortBy;
        },
        switchQueueTab(tab) {
            this.currentFilter = tab;
        },
        filterQueue() {
            // Filtering is handled by computed property
        },
        togglePerformanceDetails() {
            this.showPerformanceDetails = !this.showPerformanceDetails;
        },
        refreshPriorities() {
            this.showNotification('Refreshed', 'Priority queue updated');
        },
        startSmartWorkflow() {
            this.showNotification('Smart Workflow', 'Starting AI-recommended workflow...');
            this.showPage('queue');
        },
        startHighValueWorkflow() {
            this.currentFilter = 'today';
            this.currentSort = 'amount';
            this.showPage('queue');
        },
        startOverdueWorkflow() {
            this.currentFilter = 'overdue';
            this.showPage('queue');
        },
        startPTPWorkflow() {
            this.currentFilter = 'ptp';
            this.showPage('queue');
        },
        startNewCaseWorkflow() {
            this.currentFilter = 'new';
            this.showPage('queue');
        },
        showCustomerDetail(item) {
            this.currentCustomer = item;
            this.currentCaseIndex = this.queueData.findIndex(c => c.id === item.id);
            this.previousPage = this.currentPage;
            this.showPage('customer-detail');
        },
        backToPreviousPage() {
            this.showPage(this.previousPage);
        },
        makeCall(customerId) {
            const customer = this.queueData.find(c => c.customerId === customerId);
            if (customer) {
                this.showNotification('Calling', `Calling ${customer.name}...`);
                // In real app, this would trigger actual call
            }
        },
        sendWhatsApp(customerId, contactType = 'customer') {
            const customer = this.queueData.find(c => c.customerId === customerId);
            if (customer) {
                this.showNotification('WhatsApp', `Opening WhatsApp for ${customer.name}...`);
                // In real app, this would open WhatsApp
            }
        },
        makeCallFromDetail() {
            if (this.currentCustomer) {
                this.makeCall(this.currentCustomer.customerId);
            }
        },
        sendWhatsAppFromDetail() {
            if (this.currentCustomer) {
                this.sendWhatsApp(this.currentCustomer.customerId);
            }
        },
        toggleQuickActions() {
            this.showQuickActionsPanel = !this.showQuickActionsPanel;
        },
        closeQuickActions() {
            this.showQuickActionsPanel = false;
        },
        quickCallLastCustomer() {
            if (this.currentCustomer) {
                this.makeCall(this.currentCustomer.customerId);
            }
            this.closeQuickActions();
        },
        quickDialer() {
            this.showNotification('Dialer', 'Opening dialer...');
            this.closeQuickActions();
        },
        quickWhatsAppTemplate() {
            this.showNotification('WhatsApp Template', 'Opening WhatsApp templates...');
            this.closeQuickActions();
        },
        quickSMSTemplate() {
            this.showNotification('SMS Template', 'Opening SMS templates...');
            this.closeQuickActions();
        },
        sendAIMessage() {
            if (!this.aiInput.trim()) return;
            
            // Add user message
            this.chatMessages.push({
                sender: 'user',
                message: this.aiInput
            });
            
            const userMessage = this.aiInput;
            this.aiInput = '';
            
            // Simulate AI response
            setTimeout(() => {
                const responses = [
                    "Based on the customer's payment history, I recommend a flexible payment plan with 2-3 installments.",
                    "This customer has a high risk score. Consider offering a settlement at 70% of the total amount.",
                    "The best time to call this customer is between 6-8 PM based on their answer patterns.",
                    "I suggest mentioning the legal consequences but maintaining a professional tone."
                ];
                const response = responses[Math.floor(Math.random() * responses.length)];
                this.chatMessages.push({
                    sender: 'ai',
                    message: response
                });
            }, 1000);
        },
        generateScript() {
            this.showNotification('Script Generated', 'Custom collection script created');
        },
        analyzeRisk() {
            this.showNotification('Risk Analysis', 'Customer risk score: 7.8/10 (High)');
        },
        predictPayment() {
            this.showNotification('Payment Prediction', '82% chance of payment within 7 days');
        },
        optimizeSchedule() {
            this.showNotification('Schedule Optimized', 'Best call times: 6-8 PM, Weekends preferred');
        },
        refreshAnalyticsData() {
            this.refreshing = true;
            setTimeout(() => {
                this.refreshing = false;
                this.showNotification('Data Refreshed', 'Analytics data updated');
            }, 2000);
        },
        exportAnalyticsReport() {
            this.showNotification('Export Started', 'Generating report...');
            setTimeout(() => {
                this.showNotification('Export Complete', 'Report downloaded successfully');
            }, 3000);
        },
        showNotification(title, message) {
            // Simple notification - in real app, use a proper notification component
            console.log(`${title}: ${message}`);
            // You can implement a toast notification here
        },
        formatAmount(amount) {
            return amount.toLocaleString();
        },
        getRiskBadgeClass(risk) {
            const classes = {
                'high': 'bg-red-600 bg-opacity-20 text-red-400',
                'medium': 'bg-yellow-600 bg-opacity-20 text-yellow-400',
                'low': 'bg-green-600 bg-opacity-20 text-green-400'
            };
            return classes[risk] || 'bg-gray-600 bg-opacity-20 text-gray-400';
        },
        getAmountColorClass(risk) {
            const classes = {
                'high': 'text-red-400',
                'medium': 'text-yellow-400',
                'low': 'text-green-400'
            };
            return classes[risk] || 'text-white';
        },
        showAdvancedModule(module) {
            this.activeAnalyticsModule = module;
        },
        openNotifications() {
            this.showNotification('Notifications', 'Opening notification settings...');
        },
        toggleDarkMode() {
            this.showNotification('Dark Mode', 'Dark mode toggle feature coming soon');
        },
        handleLogout() {
            if (confirm('Are you sure you want to logout?')) {
                this.showNotification('Logout', 'Logging out...');
                // In real app, this would handle actual logout
            }
        },
        showAIDetailedInsights() {
            this.showNotification('AI Insights', 'Opening detailed AI insights...');
        },
        selectDateRange(range) {
            this.selectedDateRange = range;
            this.refreshAnalyticsData();
        },
        toggleMetricsView() {
            this.showDetailedMetrics = !this.showDetailedMetrics;
        },
        showKPIDetails(kpi) {
            this.showNotification('KPI Details', `Showing details for ${kpi}...`);
        },
        changeChartView(view) {
            this.currentChartView = view;
            // In real app, this would update chart data based on view
        },
        toggleChartType(type) {
            this.currentChartType = type;
            // In real app, this would change chart rendering
        },
        showDayDetails(day) {
            this.showNotification('Day Details', `Showing details for ${day}...`);
        },
        toggleDPDView() {
            this.showDPDHeatmap = !this.showDPDHeatmap;
        },
        refreshPredictions() {
            this.showNotification('Predictions', 'Refreshing AI predictions...');
            this.refreshing = true;
            setTimeout(() => {
                this.refreshing = false;
                this.showNotification('Predictions Updated', 'AI predictions refreshed');
            }, 2000);
        },
        showDetailedRecommendations() {
            this.showNotification('Action Plan', 'Opening detailed action plan...');
        },
        toggleTeamView(view) {
            this.teamView = view;
        }
    }
};
