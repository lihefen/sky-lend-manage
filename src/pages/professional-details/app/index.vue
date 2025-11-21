<!--
 * @Description: Professional Details - Customer Detail Page
 * @version: 1.0.0
 * @Author: hean
 * @Date: 2025-07-22 11:00:33
 * @LastEditors: hean
 * @LastEditTime: 2025-11-01 12:18:30
-->
<template>
    <div class="app min-h-screen pb-20" :style="appStyle">
        <!-- Customer Detail Page -->
        <div class="page">
            <!-- Header -->
            <div class="glass-card mx-4 mt-6 p-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <button @click="goBack" class="text-cyan-400 mr-4">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h1 class="text-xl font-bold text-white">Customer Details</h1>
                    </div>
                </div>
            </div>

            <div v-if="currentCustomer" class="mx-4 mt-4">
                <!-- Action Buttons - Moved to Top -->
                <div class="grid grid-cols-2 gap-3 mb-3">
                    <button @click="makeCallFromDetail" class="gradient-primary text-white py-3 rounded-xl font-semibold action-button">
                        <i class="fas fa-phone mr-2"></i>Call Now
                    </button>
                    <button @click="sendWhatsAppFromDetail" class="bg-green-600 text-white py-3 rounded-xl font-semibold action-button">
                        <i class="fas fa-whatsapp mr-2"></i>WhatsApp
                    </button>
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <button @click="sendSMSFromDetail" class="bg-blue-600 text-white py-2 px-3 rounded-lg font-semibold text-sm action-button">
                        <i class="fas fa-sms mr-1"></i>SMS
                    </button>
                    <button @click="recordPTPFromDetail" class="bg-yellow-600 text-white py-2 px-3 rounded-lg font-semibold text-sm action-button">
                        <i class="fas fa-calendar-check mr-1"></i>PTP
                    </button>
                    <button @click="escalateCase" class="bg-red-600 text-white py-2 px-3 rounded-lg font-semibold text-sm action-button">
                        <i class="fas fa-exclamation-triangle mr-1"></i>Escalate
                    </button>
                </div>

                <!-- Customer Basic Info -->
                <div class="glass-card mt-4 p-4">
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
                    
                    <!-- Queue Progress Info -->
                    <div class="mt-4 pt-3 border-t border-gray-700" v-if="queueProgress">
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-400">
                                <span>Progress: </span>
                                <span class="text-white font-semibold">{{ queueProgress }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Emergency Contacts -->
                <div class="glass-card mt-4 p-4">
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="text-lg font-semibold text-white">Emergency Contacts</h2>
                        <button @click="showAddContactModal" class="text-cyan-400 text-sm">
                            <i class="fas fa-user-plus mr-1"></i>Add Contact
                        </button>
                    </div>
                    
                    <div class="space-y-3">
                        <div v-for="(contact, index) in emergencyContacts" :key="index" 
                             :class="contact.bgClass">
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center">
                                    <div :class="contact.avatarClass">
                                        {{ contact.initial }}
                                    </div>
                                    <div>
                                        <div class="text-white font-medium">{{ contact.name }}</div>
                                        <div class="text-xs text-gray-400">{{ contact.relationship }}</div>
                                    </div>
                                </div>
                                <div class="flex gap-1">
                                    <button @click="callEmergencyContact(contact.phone, contact.name)" class="bg-green-600 text-white p-2 rounded-lg text-xs">
                                        <i class="fas fa-phone"></i>
                                    </button>
                                    <button @click="whatsappEmergencyContact(contact.phone, contact.name)" class="bg-green-700 text-white p-2 rounded-lg text-xs">
                                        <i class="fas fa-whatsapp"></i>
                                    </button>
                                    <button @click="smsEmergencyContact(contact.phone, contact.name)" class="bg-blue-600 text-white p-2 rounded-lg text-xs">
                                        <i class="fas fa-sms"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="text-sm text-gray-400">📱 {{ contact.phone }} <span v-if="contact.altPhone">| 🏠 {{ contact.altPhone }}</span></div>
                            <div class="text-xs text-gray-500 mt-1">{{ contact.details }}</div>
                        </div>
                    </div>
                    
                    <!-- Contact History Summary -->
                    <div class="mt-4 pt-3 border-t border-gray-700">
                        <div class="grid grid-cols-3 gap-2 text-center">
                            <div>
                                <div class="text-sm text-green-400 font-semibold">{{ contactHistory.timesContacted }}</div>
                                <div class="text-xs text-gray-400">Times Contacted</div>
                            </div>
                            <div>
                                <div class="text-sm text-yellow-400 font-semibold">{{ contactHistory.successful }}</div>
                                <div class="text-xs text-gray-400">Successful</div>
                            </div>
                            <div>
                                <div class="text-sm text-blue-400 font-semibold">{{ contactHistory.daysSinceLast }}</div>
                                <div class="text-xs text-gray-400">Days Since Last</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Loan Information -->
                <div class="glass-card mt-4 p-4">
                    <h2 class="text-lg font-semibold text-white mb-3">Loan Information</h2>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-400">Loan Amount</span>
                            <span class="text-white font-semibold">₦{{ formatAmount(loanInfo.loanAmount) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Disbursed Date</span>
                            <span class="text-white">{{ loanInfo.disbursedDate }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Original Due Date</span>
                            <span class="text-white">{{ loanInfo.dueDate }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Tenure</span>
                            <span class="text-white">{{ loanInfo.tenure }}</span>
                        </div>
                    </div>
                </div>

                <!-- Collection Notes Section -->
                <div class="glass-card mt-4 p-4">
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="text-lg font-semibold text-white">Collection Notes</h2>
                        <button @click="showQuickNoteModal" class="text-cyan-400 text-sm">
                            <i class="fas fa-sticky-note mr-1"></i>Quick Note
                        </button>
                    </div>
                    
                    <!-- Quick Note Templates -->
                    <div class="mb-4">
                        <div class="text-sm text-gray-400 mb-2">Quick Templates:</div>
                        <div class="grid grid-cols-2 gap-2">
                            <button @click="addTemplateNote('customer_unreachable')" class="bg-gray-700 text-white py-2 px-3 rounded-lg text-sm">
                                Customer Unreachable
                            </button>
                            <button @click="addTemplateNote('payment_dispute')" class="bg-gray-700 text-white py-2 px-3 rounded-lg text-sm">
                                Payment Dispute
                            </button>
                            <button @click="addTemplateNote('financial_hardship')" class="bg-gray-700 text-white py-2 px-3 rounded-lg text-sm">
                                Financial Hardship
                            </button>
                            <button @click="addTemplateNote('request_extension')" class="bg-gray-700 text-white py-2 px-3 rounded-lg text-sm">
                                Request Extension
                            </button>
                        </div>
                    </div>
                    
                    <!-- Notes Display -->
                    <div class="space-y-3">
                        <div v-for="(note, index) in collectionNotes" :key="index" 
                             :class="note.borderClass">
                            <div class="flex justify-between items-start mb-2">
                                <div class="text-sm text-gray-400">{{ note.timestamp }} - {{ note.agent }}</div>
                                <button @click="deleteNote(index)" class="text-red-400 text-xs">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            <div class="text-white text-sm">{{ note.content }}</div>
                            <div class="flex gap-2 mt-2">
                                <span v-for="(badge, bIndex) in note.badges" :key="bIndex" 
                                      :class="badge.class">
                                    {{ badge.text }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Outstanding Details -->
                <div class="glass-card mt-4 p-4">
                    <h2 class="text-lg font-semibold text-white mb-3">Outstanding Details</h2>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-400">Outstanding Amount</span>
                            <span class="text-white font-semibold">₦{{ formatAmount(outstandingDetails.outstandingAmount) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Due Amount</span>
                            <span class="text-white font-semibold">₦{{ formatAmount(outstandingDetails.dueAmount) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Penalty Amount:</span>
                            <span class="text-red-400">₦{{ formatAmount(outstandingDetails.penaltyFee) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Total Due</span>
                            <span class="text-red-400 font-semibold">₦{{ formatAmount(outstandingDetails.totalDue) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Paid Amount:</span>
                            <span class="text-green-400">₦{{ formatAmount(outstandingDetails.paidAmount) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Loan ID:</span>
                            <span class="text-white">{{ currentCustomer.customerId }}</span>
                        </div>
                    </div>
                </div>

                <!-- Payment Information -->
                <div class="glass-card mt-4 p-4">
                    <h2 class="text-lg font-semibold text-white mb-3">Payment Information</h2>
                    <div class="space-y-3">
                        <div>
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-gray-400">App Link:</span>
                                <button @click="copyToClipboard(paymentInfo.appLink)" class="text-cyan-400 text-sm">
                                    <i class="fas fa-copy mr-1"></i>Copyable
                                </button>
                            </div>
                            <div class="bg-gray-800 bg-opacity-50 p-2 rounded text-cyan-400 text-sm">{{ paymentInfo.appLink }}</div>
                        </div>
                        
                        <div>
                            <div class="text-gray-400 mb-2">Virtual Account:</div>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span class="text-gray-400">Bank Name:</span>
                                    <span class="text-white">{{ paymentInfo.bankName }}</span>
                                </div>
                                <div>
                                    <div class="flex justify-between items-center mb-2">
                                        <span class="text-gray-400">Payment Link:</span>
                                        <button @click="copyToClipboard(paymentInfo.paymentLink)" class="text-cyan-400 text-sm">
                                            <i class="fas fa-copy mr-1"></i>Copyable
                                        </button>
                                    </div>
                                    <div class="bg-gray-800 bg-opacity-50 p-2 rounded text-cyan-400 text-sm">{{ paymentInfo.paymentLink }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Customer Employment Information -->
                <div class="glass-card mt-4 p-4">
                    <h2 class="text-lg font-semibold text-white mb-3">Employment Information</h2>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-gray-400">Salary Range:</span>
                            <span class="text-white font-semibold">{{ employmentInfo.salaryRange }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Pay Frequency:</span>
                            <span class="text-white">{{ employmentInfo.payFrequency }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">付款日期</span>
                            <span class="text-white">{{ employmentInfo.paymentDate }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-400">Email:</span>
                            <span class="text-white">{{ employmentInfo.email }}</span>
                        </div>
                    </div>
                </div>

                <!-- WhatsApp Work Screenshot Upload -->
                <div class="glass-card mt-4 p-4">
                    <h2 class="text-lg font-semibold text-white mb-3">Daily Work Report</h2>
                    <div class="bg-yellow-900 bg-opacity-20 p-3 rounded-lg border border-yellow-700 border-opacity-30 mb-3">
                        <div class="text-yellow-400 text-sm mb-1">
                            <i class="fas fa-exclamation-triangle mr-2"></i>Daily Reminder
                        </div>
                        <div class="text-gray-300 text-sm">
                            Please upload WhatsApp work screenshots daily for incomplete debt collection tasks. Deadline: 10 PM every day.
                        </div>
                    </div>
                    
                    <div class="space-y-3">
                        <div>
                            <label class="block text-gray-400 text-sm mb-2">Upload WhatsApp Screenshot</label>
                            <div class="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                                <input type="file" ref="whatsappScreenshot" accept="image/*" capture="environment" class="hidden" @change="handleScreenshotUpload">
                                <label @click="$refs.whatsappScreenshot && $refs.whatsappScreenshot.click()" class="cursor-pointer">
                                    <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                                    <div class="text-gray-400 text-sm">Click to upload screenshot</div>
                                    <div class="text-gray-500 text-xs mt-1">PNG, JPG up to 10MB</div>
                                </label>
                            </div>
                        </div>
                        
                        <div v-if="uploadedFile" class="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                            <div class="flex justify-between items-center mb-2">
                                <span class="text-white text-sm">{{ uploadedFile.name }}</span>
                                <button @click="removeUpload" class="text-red-400 text-sm">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                            <div class="text-xs text-gray-400">Uploaded at: {{ uploadedFile.time }}</div>
                        </div>
                        
                        <button @click="submitDailyReport" class="w-full gradient-primary text-white py-3 rounded-lg font-semibold action-button">
                            <i class="fas fa-paper-plane mr-2"></i>Submit Daily Report
                        </button>
                    </div>
                </div>

                <!-- Collection History -->
                <div class="glass-card mt-4 p-4">
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="text-lg font-semibold text-white">Collection History</h2>
                        <button @click="showAddRecordModal" class="text-cyan-400 text-sm">
                            <i class="fas fa-plus mr-1"></i>Add Record
                        </button>
                    </div>
                    <div class="space-y-3">
                        <div v-for="(record, index) in collectionHistory" :key="index" 
                             :class="record.borderClass">
                            <div class="text-sm text-gray-400">{{ record.timestamp }}</div>
                            <div class="text-white">{{ record.action }}</div>
                            <div class="text-sm text-gray-400">{{ record.result }}</div>
                        </div>
                    </div>
                </div>

                <!-- Collection Scripts Templates -->
                <div class="glass-card mt-4 p-4 mb-4">
                    <div class="flex justify-between items-center mb-3">
                        <h2 class="text-lg font-semibold text-white">Collection Scripts</h2>
                        <button @click="toggleScriptView" class="text-cyan-400 text-sm">
                            <i class="fas fa-eye mr-1"></i>View All
                        </button>
                    </div>
                    
                    <!-- Script Categories -->
                    <div class="flex gap-2 mb-4 overflow-x-auto">
                        <button v-for="category in scriptCategories" :key="category.key"
                                @click="filterScripts(category.key)"
                                :class="['script-category-btn px-3 py-1 rounded-lg text-xs whitespace-nowrap', 
                                         selectedScriptCategory === category.key ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white']">
                            {{ category.label }}
                        </button>
                        <button @click="addCustomScript" class="bg-green-600 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap">
                            <i class="fas fa-plus mr-1"></i>Add Custom
                        </button>
                    </div>
                    
                    <!-- Script Templates -->
                    <div class="space-y-3">
                        <div v-for="(script, index) in filteredScripts" :key="index" 
                             :class="script.borderClass">
                            <div class="flex justify-between items-start mb-2">
                                <div class="text-white font-medium">{{ script.title }}</div>
                                <div class="flex gap-2">
                                    <button @click="copyScript(script.content)" class="text-cyan-400 text-xs">
                                        <i class="fas fa-copy mr-1"></i>Copy
                                    </button>
                                    <button @click="playScriptAudio(script.key)" class="text-green-400 text-xs">
                                        <i class="fas fa-play mr-1"></i>Play
                                    </button>
                                </div>
                            </div>
                            <div class="text-sm text-gray-400 mb-2">{{ script.category }}</div>
                            <div class="text-white text-sm">{{ script.content }}</div>
                            <div class="flex gap-2 mt-2">
                                <span v-for="(tag, tIndex) in script.tags" :key="tIndex" 
                                      :class="tag.class">
                                    {{ tag.text }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index_module.scss" scoped></style>
