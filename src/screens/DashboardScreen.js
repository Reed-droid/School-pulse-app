// src/screens/DashboardScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import {
  getDashboardSummary,
  getInsights,
  testConnection,
} from "../services/api";

export default function DashboardScreen() {
  const [summary, setSummary] = useState({});
  const [insights, setInsights] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");

  const loadData = async () => {
    try {
      const summaryData = await getDashboardSummary();
      setSummary(summaryData);

      const insightsData = await getInsights();
      setInsights(insightsData.insights);

      await testConnection(); // just logs internally

      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1976D2" />

      {/* Blue Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>School Dashboard</Text>
      </View>

      {/* Main content */}
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.subText}>
          Last updated: {lastUpdated || "just now"}
        </Text>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Late Arrivals</Text>
            <Text style={[styles.cardValue, { color: "#E53935" }]}>
              {summary?.totalDelays ?? 0}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Disciplinary Issues</Text>
            <Text style={[styles.cardValue, { color: "#FB8C00" }]}>
              {summary?.totalInfractions ?? 0}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resolved Cases</Text>
            <Text style={[styles.cardValue, { color: "#2E7D32" }]}>
              {summary?.totalResolved ?? 0}
            </Text>
          </View>
        </View>

        {/* Insights Section */}
        <View style={styles.insightSection}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          {insights.length > 0 ? (
            insights.map((item) => (
              <View key={item.id} style={styles.insightCard}>
                <Text style={styles.insightText}>
                  {item.title}:{" "}
                  <Text style={styles.insightValue}>{item.value}</Text>
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noInsights}>No insights available</Text>
          )}
        </View>

        {/* Refresh Button */}
        <TouchableOpacity style={styles.button} onPress={onRefresh}>
          <Text style={styles.buttonText}>Refresh Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerBar: {
    backgroundColor: "#1976D2",
    paddingTop: 40, // space for status bar
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  subText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
    textAlign: "right",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  insightSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  insightCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
  },
  insightText: {
    fontSize: 14,
    color: "#444",
  },
  insightValue: {
    fontWeight: "bold",
    color: "#1976D2",
  },
  noInsights: {
    color: "#888",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: "#1976D2",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
