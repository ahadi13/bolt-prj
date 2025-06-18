import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { User, Wallet, MapPin, Bell, Shield, CircleHelp as HelpCircle, Star, Gift, ChevronRight, CreditCard as Edit, IndianRupee, TrendingUp, Award, LogOut, Phone, Mail } from 'lucide-react-native';

const profileData = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  phone: '+91 98765 43210',
  address: '123, Green Valley Apartment, Sector 21, Pune - 411001',
  joinDate: 'January 2024',
  totalOrders: 24,
  totalEarnings: 8420,
  totalRecycled: 186,
  rating: 4.8,
  wallet: {
    balance: 2840,
    pendingAmount: 480,
    recentTransactions: [
      { id: 1, type: 'credit', amount: 480, description: 'Order #ORD-2024-001', date: 'Today' },
      { id: 2, type: 'debit', amount: 200, description: 'Withdrawal to Bank', date: 'Yesterday' },
      { id: 3, type: 'credit', amount: 650, description: 'Order #ORD-2024-002', date: '2 days ago' },
    ]
  }
};

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showWalletDetails, setShowWalletDetails] = useState(false);

  const handleWithdraw = () => {
    Alert.alert(
      'Withdraw Money',
      'Withdraw ₹2,840 to your linked bank account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Withdraw', onPress: () => Alert.alert('Success', 'Withdrawal request submitted!') }
      ]
    );
  };

  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: User, title: 'Edit Profile', subtitle: 'Update your personal information', action: () => {} },
        { icon: MapPin, title: 'Addresses', subtitle: 'Manage pickup addresses', action: () => {} },
        { icon: Phone, title: 'Verify Phone', subtitle: '+91 98765 43210', action: () => {} },
      ]
    },
    {
      section: 'App Settings',
      items: [
        { 
          icon: Bell, 
          title: 'Notifications', 
          subtitle: 'Push notifications and alerts',
          hasSwitch: true,
          switchValue: notificationsEnabled,
          onSwitchChange: setNotificationsEnabled
        },
        { icon: Shield, title: 'Privacy & Security', subtitle: 'Account security settings', action: () => {} },
      ]
    },
    {
      section: 'Support & Feedback',
      items: [
        { icon: HelpCircle, title: 'Help & Support', subtitle: 'FAQs and contact support', action: () => {} },
        { icon: Star, title: 'Rate the App', subtitle: 'Share your feedback', action: () => {} },
        { icon: Gift, title: 'Refer Friends', subtitle: 'Earn rewards for referrals', action: () => {} },
      ]
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileData.name}</Text>
            <Text style={styles.profileEmail}>{profileData.email}</Text>
            <Text style={styles.joinDate}>Member since {profileData.joinDate}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Award size={20} color="#f59e0b" />
            </View>
            <Text style={styles.statValue}>{profileData.totalOrders}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <TrendingUp size={20} color="#16a34a" />
            </View>
            <Text style={styles.statValue}>₹{profileData.totalEarnings}</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.statIcon}>
              <Star size={20} color="#8b5cf6" />
            </View>
            <Text style={styles.statValue}>{profileData.rating}</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </View>

      {/* Wallet Section */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.walletCard}
          onPress={() => setShowWalletDetails(!showWalletDetails)}
        >
          <View style={styles.walletHeader}>
            <View style={styles.walletLeft}>
              <View style={styles.walletIcon}>
                <Wallet size={24} color="#16a34a" />
              </View>
              <View>
                <Text style={styles.walletTitle}>My Wallet</Text>
                <Text style={styles.walletBalance}>₹{profileData.wallet.balance}</Text>
              </View>
            </View>
            <View style={styles.walletRight}>
              <TouchableOpacity style={styles.withdrawButton} onPress={handleWithdraw}>
                <Text style={styles.withdrawButtonText}>Withdraw</Text>
              </TouchableOpacity>
              <ChevronRight 
                size={16} 
                color="#6b7280" 
                style={[
                  styles.chevron,
                  showWalletDetails && styles.chevronExpanded
                ]}
              />
            </View>
          </View>
          
          {profileData.wallet.pendingAmount > 0 && (
            <View style={styles.pendingAmount}>
              <Text style={styles.pendingText}>
                ₹{profileData.wallet.pendingAmount} pending from recent orders
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {showWalletDetails && (
          <View style={styles.walletDetails}>
            <Text style={styles.walletDetailsTitle}>Recent Transactions</Text>
            {profileData.wallet.recentTransactions.map((transaction) => (
              <View key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={[
                    styles.transactionIcon,
                    { backgroundColor: transaction.type === 'credit' ? '#dcfce7' : '#fee2e2' }
                  ]}>
                    <IndianRupee 
                      size={16} 
                      color={transaction.type === 'credit' ? '#16a34a' : '#dc2626'} 
                    />
                  </View>
                  <View>
                    <Text style={styles.transactionDescription}>
                      {transaction.description}
                    </Text>
                    <Text style={styles.transactionDate}>{transaction.date}</Text>
                  </View>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: transaction.type === 'credit' ? '#16a34a' : '#dc2626' }
                ]}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Menu Sections */}
      {menuItems.map((section, sectionIndex) => (
        <View key={sectionIndex} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.section}</Text>
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity 
              key={itemIndex} 
              style={styles.menuItem}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIcon}>
                  <item.icon size={20} color="#6b7280" />
                </View>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <View style={styles.menuItemRight}>
                {item.hasSwitch ? (
                  <Switch
                    value={item.switchValue}
                    onValueChange={item.onSwitchChange}
                    trackColor={{ false: '#e5e7eb', true: '#bbf7d0' }}
                    thumbColor={item.switchValue ? '#16a34a' : '#f3f4f6'}
                  />
                ) : (
                  <ChevronRight size={16} color="#d1d5db" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Environmental Impact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Environmental Impact</Text>
        <View style={styles.impactCard}>
          <Text style={styles.impactEmoji}>🌱</Text>
          <View style={styles.impactContent}>
            <Text style={styles.impactTitle}>Great Job!</Text>
            <Text style={styles.impactDescription}>
              You've recycled {profileData.totalRecycled}kg of waste, helping save the environment!
            </Text>
            <View style={styles.impactStats}>
              <Text style={styles.impactStat}>🌳 124 trees saved</Text>
              <Text style={styles.impactStat}>💨 340kg CO₂ reduced</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
        >
          <LogOut size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#16a34a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  joinDate: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter-Regular',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  walletCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  walletHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  walletTitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  walletBalance: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  walletRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  withdrawButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  withdrawButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  pendingAmount: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  pendingText: {
    fontSize: 12,
    color: '#92400e',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
  walletDetails: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  walletDetailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  menuItemRight: {
    marginLeft: 12,
  },
  impactCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  impactEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  impactContent: {
    flex: 1,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  impactDescription: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  impactStats: {
    flexDirection: 'row',
    gap: 16,
  },
  impactStat: {
    fontSize: 12,
    color: '#16a34a',
    fontFamily: 'Inter-Medium',
  },
  logoutButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#dc2626',
    fontFamily: 'Inter-Medium',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
    fontFamily: 'Inter-Regular',
  },
});