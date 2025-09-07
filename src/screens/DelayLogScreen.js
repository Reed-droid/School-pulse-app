import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { submitDelayLog } from '../services/api';  // ← ADD THIS IMPORT

const DelayLogScreen = () => {
  const [delayType, setDelayType] = useState('');
  const [notes, setNotes] = useState('');

  const delayTypes = ['RESOURCE', 'ADMIN', 'PERSONAL', 'TECHNICAL'];

 const handleSubmit = async () => {
  if (!delayType) {
    Alert.alert('Error', 'Please select a delay type');
    return;
  }

  try {
    console.log('Submitting:', { delayType, notes });
    const result = await submitDelayLog({ delayType, notes });
    
    if (result.success) {
      Alert.alert('Success', 'Delay logged successfully!');
      setDelayType('');  // Reset form
      setNotes('');      // Reset form
    } else {
      Alert.alert('Error', result.message);
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to submit delay log');
    console.error('Submission error:', error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log Strategic Delay</Text>
      
      <Text style={styles.label}>Delay Type *</Text>
      {delayTypes.map(type => (
  <TouchableOpacity
    key={type}
    style={[styles.option, delayType === type && styles.optionSelected]}
    onPress={() => setDelayType(type)}
  >
    <Text style={[
      styles.optionText, 
      delayType === type && styles.optionSelectedText
    ]}>
      {type}
    </Text>
  </TouchableOpacity>
))}

      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Describe what caused the delay..."
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Delay Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15, marginBottom: 5 },
  option: { backgroundColor: 'white', padding: 15, borderRadius: 8, marginVertical: 5 },
  optionSelected: { backgroundColor: '#4361ee' },
  optionText: { color: '#333' },
  optionSelectedText: { color: 'white' },
  input: { backgroundColor: 'white', padding: 15, borderRadius: 8, minHeight: 100, textAlignVertical: 'top' },
  submitButton: { backgroundColor: '#4361ee', padding: 15, borderRadius: 8, marginTop: 20 },
  submitText: { color: 'white', textAlign: 'center', fontWeight: '600' },
});

export default DelayLogScreen;