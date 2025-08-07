
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const transactions = [
  { id: '1', title: 'Free Cash Expired', date: '7 Jan 2025, 04:51AM', amount: '₹25', type: 'debited' },
  { id: '2', title: 'Free Cash Expired', date: '7 Jan 2025, 04:21AM', amount: '₹25', type: 'debited' },
  { id: '3', title: 'Free Cash Expired', date: '7 Jan 2025, 03:13AM', amount: '₹100', type: 'debited' },
  { id: '4', title: 'Free Cash - Valid for next order only', date: '11 Dec 2024, 02:03PM', amount: '+₹25', type: 'credited', expires: 'Expires: 6 Jan 2025' },
  { id: '5', title: 'Free Cash Expired', date: '11 Dec 2024, 04:17AM', amount: '₹25', type: 'debited' },
  { id: '6', title: 'Free Cash - Valid for next order only', date: '8 Dec 2024, 05:03AM', amount: '+₹25', type: 'credited', expires: 'Expires: 10 Dec 2024' },
  { id: '7', title: 'Free Cash - Valid for next order only', date: '3 Dec 2024, 06:00PM', amount: '+₹25', type: 'credited', expires: 'Expires: 6 Jan 2025' },
  { id: '8', title: 'Free Cash Expired', date: '3 Dec 2024, 03:40AM', amount: '₹25', type: 'debited' },
  { id: '9', title: 'Free Cash Expired', date: '3 Dec 2024, 03:22AM', amount: '₹50', type: 'debited' },
  { id: '10', title: 'Free Cash Expired', date: '3 Dec 2024, 02:13AM', amount: '₹50', type: 'debited' },
];

const Alltransaction = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('All');

  const filteredTransactions = transactions.filter(item => {
    if (activeTab === 'All') return true;
    return item.type === activeTab.toLowerCase();
  });

  const renderTransaction = ({ item }: { item: typeof transactions[0] }) => {
    const isExpired = item.title.toLowerCase().includes('expired');
    const isDebited = item.type === 'debited';
    const isCredited = item.type === 'credited';

    return (
      <View style={[styles.transactionItem, isExpired && styles.disabledItem]}>
        <View>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
          {item.expires && (
            <Text style={styles.transactionExpires}>{item.expires}</Text>
          )}
        </View>
        <Text
          style={[
            styles.amountText,
            isCredited && styles.amountCredited,
            isDebited && styles.amountDebited,
          ]}
        >
          {item.amount}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Transactions</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {['All', 'Credited', 'Debited'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={item => item.id}
        renderItem={renderTransaction}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 16,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderColor: '#000',
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
    fontSize: 14,
  },
  activeTabText: {
    color: '#000',
  },
  listContainer: {
    padding: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionExpires: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
  },
  amountCredited: {
    color: '#0A7B45', // green
  },
  amountDebited: {
    color: '#D32F2F', // red
  },
  disabledItem: {
    opacity: 0.5,
  },
});

export default Alltransaction;
