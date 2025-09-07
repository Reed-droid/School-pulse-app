import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = ({ route }) => {
  const navigation = useNavigation();
  const { userRole } = route.params || { userRole: 'teacher' };

  // Sample data - will come from backend later
  const dashboardData = {
    teacher: {
      welcome: "Welcome back, Teacher!",
      tasks: ["Grade assignments", "Update lesson plans", "Meet with students"],
      stats: { pendingTasks: 5, completed: 12 }
    },
    principal: {
      welcome: "Principal Dashboard",
      tasks: ["Review staff reports", "Budget planning", "School events"],
      stats: { pendingApprovals: 8, meetings: 3 }
    },
    administrator: {
      welcome: "Administration Portal", 
      tasks: ["Process requests", "Manage resources", "Generate reports"],
      stats: { pendingRequests: 15, resolved: 25 }
    }
  };

  const data = dashboardData[userRole] || dashboardData.teacher;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>School Pulse</Text>
        <Text style={styles.roleBadge}>{userRole.toUpperCase()}</Text>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeText}>{data.welcome}</Text>
        <Text style={styles.subText}>Today: {new Date().toDateString()}</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{data.stats.pendingTasks || data.stats.pendingApprovals || data.stats.pendingRequests}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{data.stats.completed || data.stats.meetings || data.stats.resolved}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
      </View>

      {/* Tasks Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        {data.tasks.map((task, index) => (
          <TouchableOpacity key={index} style={styles.taskItem}>
            <Text style={styles.taskText}>• {task}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('DelayLog')}
        >
          <Text style={styles.buttonText}>Log Strategic Delay</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('InfractionLog')}
        >
          <Text style={styles.buttonText}>Report Positive Action</Text>
        </TouchableOpacity>

        {/* Admin Only Button */}
        {userRole === 'administrator' || userRole === 'principal' ? (
          <TouchableOpacity 
            style={styles.adminButton}
            onPress={() => navigation.navigate('AdminInsights')}
          >
            <Text style={styles.buttonText}>View Insights</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>School Pulse v1.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4361ee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  roleBadge: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    color: '#4361ee',
    fontWeight: '600',
    fontSize: 12,
  },
  welcomeCard: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  subText: {
    color: '#666',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4361ee',
  },
  statLabel: {
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  taskItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    color: '#555',
    fontSize: 16,
  },
  buttonContainer: {
    padding: 20,
  },
  mainButton: {
    backgroundColor: '#4361ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#f72585',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  adminButton: {
    backgroundColor: '#3a0ca3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  footerText: {
    color: '#999',
    fontSize: 12,
  },
});

export default DashboardScreen;