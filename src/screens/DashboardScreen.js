import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl, Alert } from 'react-native';
import { getInsights } from '../services/api';

export default function DashboardScreen({ route, navigation }) {
  const [insights, setInsights] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { userRole } = route.params || {};

  useEffect(() => {
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      setRefreshing(true);
      const data = await getInsights();
      setInsights(data);
    } catch (error) {
      console.error('Failed to load insights:', error);
      Alert.alert('Error', 'Failed to load dashboard data. Check backend connection.');
    } finally {
      setRefreshing(false);
    }
  };

  const StatCard = ({ title, value, color = '#007AFF' }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => navigation.replace('Login') }
      ]
    );
  };

  if (!insights) {
    return (
      <View style={styles.center}>
        <Text>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadInsights} />
      }
    >
      {/* Header with User Role and Logout */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>School Pulse Dashboard</Text>
          <Text style={styles.subtitle}>
            Welcome, {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}!
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard
          title="Total Delays"
          value={insights.summary.totalDelays}
          color="#FF9500"
        />
        <StatCard
          title="Infractions"
          value={insights.summary.totalInfractions}
          color="#FF3B30"
        />
        <StatCard
          title="Positive Actions"
          value={insights.summary.positiveActions}
          color="#34C759"
        />
        <StatCard
          title="Common Delay"
          value={insights.summary.mostCommonDelayType || 'None'}
          color="#5856D6"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#007AFF' }]}
          onPress={() => navigation.navigate('Report', { type: 'delay', userRole })}
        >
          <Text style={styles.actionButtonText}>📝 Report Delay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#34C759' }]}
          onPress={() => navigation.navigate('Report', { type: 'infraction', userRole })}
        >
          <Text style={styles.actionButtonText}>✅ Report Infraction</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#5856D6' }]}
          onPress={() => navigation.navigate('Insights', { userRole })}
        >
          <Text style={styles.actionButtonText}>📊 View Insights</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Trends */}
      <View style={styles.trendsSection}>
        <Text style={styles.sectionTitle}>Recent Trends</Text>
        
        <View style={styles.trendItem}>
          <Text style={styles.trendLabel}>Delays by Date:</Text>
          {insights.trends.delaysByDate.slice(0, 3).map((item, index) => (
            <Text key={index} style={styles.trendText}>
              {item.timestamp}: {item.count} delays
            </Text>
          ))}
        </View>

        <View style={styles.trendItem}>
          <Text style={styles.trendLabel}>Infractions by Category:</Text>
          {insights.trends.infractionsByCategory.slice(0, 3).map((item, index) => (
            <Text key={index} style={styles.trendText}>
              {item.category}: {item.count}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  trendsSection: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  trendItem: {
    marginBottom: 16,
  },
  trendLabel: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  trendText: {
    color: '#666',
    marginLeft: 8,
    marginBottom: 4,
  },
});