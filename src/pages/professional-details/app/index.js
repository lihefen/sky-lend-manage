import { getUrlParam } from '@/utils';

export default {
    name: 'ProfessionalDetailsApp',
    data() {
        return {
            appStyle: {
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
                overflowX: 'hidden',
                minHeight: '100vh'
            },
            currentCustomer: null,
            queueProgress: null,
            emergencyContacts: [
                {
                    name: 'Sarah Johnson',
                    relationship: 'Spouse - Primary Contact',
                    phone: '0802-345-6789',
                    altPhone: '0801-234-5678',
                    initial: 'S',
                    bgClass: 'bg-red-900 bg-opacity-20 p-3 rounded-lg border border-red-700 border-opacity-30',
                    avatarClass: 'w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2',
                    details: 'Relationship: Spouse | Verified: Yes | Last contacted: 3 days ago'
                },
                {
                    name: 'James Johnson',
                    relationship: 'Brother - Secondary Contact',
                    phone: '0803-456-7890',
                    altPhone: '0802-345-6789',
                    initial: 'J',
                    bgClass: 'bg-yellow-900 bg-opacity-20 p-3 rounded-lg border border-yellow-700 border-opacity-30',
                    avatarClass: 'w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2',
                    details: 'Relationship: Brother | Verified: Yes | Last contacted: 1 week ago'
                },
                {
                    name: 'Johnson & Sons Ltd',
                    relationship: 'Workplace - Business Contact',
                    phone: '0804-567-8901',
                    altPhone: null,
                    initial: 'W',
                    bgClass: 'bg-blue-900 bg-opacity-20 p-3 rounded-lg border border-blue-700 border-opacity-30',
                    avatarClass: 'w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2',
                    details: 'Type: Business | Verified: Yes | Last contacted: 2 weeks ago'
                }
            ],
            contactHistory: {
                timesContacted: 8,
                successful: 3,
                daysSinceLast: 5
            },
            loanInfo: {
                loanAmount: 45000,
                disbursedDate: 'Jan 02, 2025',
                dueDate: 'Jan 16, 2025',
                tenure: '14 days'
            },
            collectionNotes: [
                {
                    timestamp: 'Today, 2:30 PM',
                    agent: 'Agent John',
                    content: 'Customer promised to pay by tomorrow but has broken previous PTP. High risk of default. Recommended for escalation.',
                    borderClass: 'bg-gray-800 bg-opacity-50 p-3 rounded-lg border-l-4 border-cyan-400',
                    badges: [
                        { text: 'High Priority', class: 'status-badge bg-red-600 bg-opacity-20 text-red-400' },
                        { text: 'PTP Broken', class: 'status-badge bg-yellow-600 bg-opacity-20 text-yellow-400' }
                    ]
                },
                {
                    timestamp: 'Yesterday, 4:15 PM',
                    agent: 'Agent Sarah',
                    content: 'Customer confirmed receiving loan but claims lost job. Willing to make partial payment of ₦20,000 this week.',
                    borderClass: 'bg-gray-800 bg-opacity-50 p-3 rounded-lg border-l-4 border-blue-400',
                    badges: [
                        { text: 'Partial Payment', class: 'status-badge bg-yellow-600 bg-opacity-20 text-yellow-400' },
                        { text: 'Financial Issue', class: 'status-badge bg-gray-600 bg-opacity-20 text-gray-400' }
                    ]
                },
                {
                    timestamp: 'Feb 16, 10:30 AM',
                    agent: 'Agent Mike',
                    content: 'Customer made partial payment of ₦15,000. Promised to clear balance by end of month.',
                    borderClass: 'bg-gray-800 bg-opacity-50 p-3 rounded-lg border-l-4 border-green-400',
                    badges: [
                        { text: 'Partial Paid', class: 'status-badge bg-green-600 bg-opacity-20 text-green-400' },
                        { text: 'Follow Up', class: 'status-badge bg-blue-600 bg-opacity-20 text-blue-400' }
                    ]
                }
            ],
            outstandingDetails: {
                outstandingAmount: 45000,
                dueAmount: 45000,
                penaltyFee: 12800,
                totalDue: 57800,
                paidAmount: 0
            },
            paymentInfo: {
                appLink: 'https://skyloan.app/pay/NG456789',
                bankName: 'PALMPAY',
                paymentLink: 'https://palmpay.com/pay/VIR123456789'
            },
            employmentInfo: {
                salaryRange: '₦80,000 - ₦120,000',
                payFrequency: 'Monthly',
                paymentDate: '25th of every month',
                email: 'grace.johnson@email.com'
            },
            uploadedFile: null,
            collectionHistory: [
                {
                    timestamp: 'Today, 3:40 PM',
                    action: 'Call Attempt',
                    result: 'Result: No Answer',
                    borderClass: 'border-l-2 border-yellow-400 pl-3'
                },
                {
                    timestamp: 'Yesterday, 10:12 AM',
                    action: 'SMS Reminder Sent',
                    result: 'Message: Payment reminder',
                    borderClass: 'border-l-2 border-blue-400 pl-3'
                },
                {
                    timestamp: 'Feb 15, 4:25 PM',
                    action: 'Call with Agent Peter',
                    result: 'PTP: Feb 19 - STATUS: BROKEN',
                    borderClass: 'border-l-2 border-red-400 pl-3'
                }
            ],
            scriptCategories: [
                { key: 'initial', label: 'Initial Contact' },
                { key: 'ptp', label: 'PTP Follow Up' },
                { key: 'overdue', label: 'Overdue' },
                { key: 'negotiation', label: 'Negotiation' },
                { key: 'escalation', label: 'Escalation' }
            ],
            selectedScriptCategory: 'initial',
            scripts: [
                {
                    key: 'initial',
                    title: 'Opening Statement',
                    category: 'Category: Initial Contact | Style: Professional',
                    content: 'Good morning/afternoon, my name is [Agent Name] from SkyLend Pro. I\'m calling regarding your loan with account number [Account Number]. Your current outstanding balance is ₦[Amount] and you are [DPD] days past due. Can you help me understand what\'s happening?',
                    borderClass: 'script-item bg-gray-800 bg-opacity-50 p-3 rounded-lg border-l-4 border-blue-400',
                    tags: [
                        { text: 'Professional', class: 'status-badge bg-blue-600 bg-opacity-20 text-blue-400' },
                        { text: 'Standard', class: 'status-badge bg-gray-600 bg-opacity-20 text-gray-400' }
                    ]
                },
                {
                    key: 'ptp',
                    title: 'PTP Follow Up',
                    category: 'Category: PTP Follow Up | Style: Friendly',
                    content: 'Hi [Customer Name], I\'m following up on your promise to pay yesterday. Did you get a chance to make the payment as discussed?',
                    borderClass: 'script-item bg-gray-800 bg-opacity-50 p-3 rounded-lg border-l-4 border-yellow-400',
                    tags: [
                        { text: 'Friendly', class: 'status-badge bg-yellow-600 bg-opacity-20 text-yellow-400' },
                        { text: 'Follow Up', class: 'status-badge bg-blue-600 bg-opacity-20 text-blue-400' }
                    ]
                }
            ]
        };
    },
    computed: {
        filteredScripts() {
            return this.scripts.filter(script => script.key === this.selectedScriptCategory);
        }
    },
    mounted() {
        this.loadCustomerData();
    },
    methods: {
        loadCustomerData() {
            // Try to get customer data from localStorage first
            const customerDataStr = localStorage.getItem('currentCustomerDetail');
            if (customerDataStr) {
                try {
                    const customerData = JSON.parse(customerDataStr);
                    this.currentCustomer = customerData.customer;
                    this.queueProgress = customerData.queueProgress;
                    
                    // Update loan info based on customer
                    if (this.currentCustomer) {
                        this.loanInfo.loanAmount = this.currentCustomer.amount || this.loanInfo.loanAmount;
                        this.outstandingDetails.outstandingAmount = this.currentCustomer.amount || this.outstandingDetails.outstandingAmount;
                        this.outstandingDetails.dueAmount = this.currentCustomer.amount || this.outstandingDetails.dueAmount;
                        this.outstandingDetails.totalDue = (this.currentCustomer.amount || this.outstandingDetails.outstandingAmount) + this.outstandingDetails.penaltyFee;
                        
                        // Update payment info
                        this.paymentInfo.appLink = `https://skyloan.app/pay/${this.currentCustomer.customerId}`;
                    }
                    
                    // Clear localStorage after loading
                    localStorage.removeItem('currentCustomerDetail');
                } catch (e) {
                    console.error('Error parsing customer data:', e);
                }
            }
        },
        goBack() {
            window.history.back();
        },
        makeCallFromDetail() {
            if (this.currentCustomer) {
                this.showNotification('Calling', `Calling ${this.currentCustomer.name}...`);
                // In real app, this would trigger actual call
            }
        },
        sendWhatsAppFromDetail() {
            if (this.currentCustomer) {
                this.showNotification('WhatsApp', `Opening WhatsApp for ${this.currentCustomer.name}...`);
                // In real app, this would open WhatsApp
            }
        },
        sendSMSFromDetail() {
            if (this.currentCustomer) {
                this.showNotification('SMS', `Sending SMS to ${this.currentCustomer.name}...`);
            }
        },
        recordPTPFromDetail() {
            if (this.currentCustomer) {
                const ptpDate = prompt('Enter PTP date (YYYY-MM-DD):');
                if (ptpDate) {
                    this.showNotification('PTP Recorded', `Promise to Pay recorded for ${this.currentCustomer.name} on ${ptpDate}`);
                }
            }
        },
        escalateCase() {
            if (this.currentCustomer) {
                if (confirm(`Are you sure you want to escalate ${this.currentCustomer.name}'s case?`)) {
                    this.showNotification('Case Escalated', `Case for ${this.currentCustomer.name} has been escalated`);
                }
            }
        },
        showAddContactModal() {
            this.showNotification('Add Contact', 'Opening add contact modal...');
        },
        callEmergencyContact(phone, name) {
            this.showNotification('Calling', `Calling ${name} at ${phone}...`);
        },
        whatsappEmergencyContact(phone, name) {
            this.showNotification('WhatsApp', `Opening WhatsApp for ${name} at ${phone}...`);
        },
        smsEmergencyContact(phone, name) {
            this.showNotification('SMS', `Sending SMS to ${name} at ${phone}...`);
        },
        showQuickNoteModal() {
            const note = prompt('Enter your note:');
            if (note) {
                this.addNote(note);
            }
        },
        addTemplateNote(template) {
            const templates = {
                customer_unreachable: 'Customer unreachable after multiple attempts. No response to calls, SMS, or WhatsApp.',
                payment_dispute: 'Customer disputes the payment amount. Claims to have made partial payment.',
                financial_hardship: 'Customer experiencing financial hardship. Unable to make full payment at this time.',
                request_extension: 'Customer requests extension of payment deadline due to unforeseen circumstances.'
            };
            const note = templates[template] || '';
            if (note) {
                this.addNote(note);
            }
        },
        addNote(content) {
            const now = new Date();
            const timestamp = now.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
            this.collectionNotes.unshift({
                timestamp: timestamp,
                agent: 'Current Agent',
                content: content,
                borderClass: 'bg-gray-800 bg-opacity-50 p-3 rounded-lg border-l-4 border-cyan-400',
                badges: []
            });
            this.showNotification('Note Added', 'Collection note has been added');
        },
        deleteNote(index) {
            if (confirm('Are you sure you want to delete this note?')) {
                this.collectionNotes.splice(index, 1);
                this.showNotification('Note Deleted', 'Collection note has been deleted');
            }
        },
        copyToClipboard(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    this.showNotification('Copied', 'Link copied to clipboard');
                }).catch(() => {
                    this.showNotification('Error', 'Failed to copy to clipboard');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    this.showNotification('Copied', 'Link copied to clipboard');
                } catch (err) {
                    this.showNotification('Error', 'Failed to copy to clipboard');
                }
                document.body.removeChild(textArea);
            }
        },
        handleScreenshotUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const now = new Date();
                const time = now.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                });
                this.uploadedFile = {
                    name: file.name,
                    time: time,
                    file: file
                };
                this.showNotification('File Selected', `Screenshot ${file.name} selected`);
            }
        },
        removeUpload() {
            this.uploadedFile = null;
            const fileInput = this.$refs.whatsappScreenshot;
            if (fileInput && fileInput.length > 0) {
                fileInput[0].value = '';
            } else if (fileInput) {
                fileInput.value = '';
            }
            this.showNotification('File Removed', 'Screenshot removed');
        },
        submitDailyReport() {
            if (!this.uploadedFile) {
                alert('Please upload a screenshot first');
                return;
            }
            this.showNotification('Submitting', 'Submitting daily report...');
            setTimeout(() => {
                this.showNotification('Report Submitted', 'Daily work report submitted successfully');
                this.uploadedFile = null;
                const fileInput = this.$refs.whatsappScreenshot;
                if (fileInput && fileInput.length > 0) {
                    fileInput[0].value = '';
                } else if (fileInput) {
                    fileInput.value = '';
                }
            }, 2000);
        },
        showAddRecordModal() {
            const action = prompt('Enter collection action:');
            if (action) {
                const now = new Date();
                const timestamp = now.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
                this.collectionHistory.unshift({
                    timestamp: timestamp,
                    action: action,
                    result: 'Recorded',
                    borderClass: 'border-l-2 border-blue-400 pl-3'
                });
                this.showNotification('Record Added', 'Collection history record added');
            }
        },
        toggleScriptView() {
            this.showNotification('Scripts', 'Viewing all collection scripts...');
        },
        filterScripts(category) {
            this.selectedScriptCategory = category;
        },
        addCustomScript() {
            const title = prompt('Enter script title:');
            if (title) {
                const content = prompt('Enter script content:');
                if (content) {
                    this.scripts.push({
                        key: 'custom',
                        title: title,
                        category: 'Category: Custom | Style: Custom',
                        content: content,
                        borderClass: 'script-item bg-gray-800 bg-opacity-50 p-3 rounded-lg border-l-4 border-green-400',
                        tags: [
                            { text: 'Custom', class: 'status-badge bg-green-600 bg-opacity-20 text-green-400' }
                        ]
                    });
                    this.showNotification('Script Added', 'Custom script has been added');
                }
            }
        },
        copyScript(content) {
            this.copyToClipboard(content);
            this.showNotification('Script Copied', 'Script copied to clipboard');
        },
        playScriptAudio(key) {
            this.showNotification('Playing', `Playing audio for ${key} script...`);
        },
        formatAmount(amount) {
            return amount.toLocaleString();
        },
        showNotification(title, message) {
            // Simple notification - in real app, use a proper notification component
            console.log(`${title}: ${message}`);
            // You can implement a toast notification here
        }
    }
};
