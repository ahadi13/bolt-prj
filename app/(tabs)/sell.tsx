import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Plus,
  Minus,
  Calendar,
  MapPin,
  Camera,
  IndianRupee,
  ArrowRight,
  Trash2,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const scrapCategories = [
  {
    id: 1,
    name: 'Paper & Cardboard',
    rate: 12,
    icon: '📄',
    color: '#10b981',
    items: ['Newspapers', 'Magazines', 'Cardboard', 'Office Paper']
  },
  {
    id: 2,
    name: 'Plastic',
    rate: 18,
    icon: '🧴',
    color: '#3b82f6',
    items: ['Bottles', 'Containers', 'Bags', 'Electronics Cases']
  },
  {
    id: 3,
    name: 'Metal',
    rate: 45,
    icon: '🔧',
    color: '#f59e0b',
    items: ['Iron', 'Steel', 'Aluminum', 'Copper']
  },
  {
    id: 4,
    name: 'Electronics',
    rate: 85,
    icon: '📱',
    color: '#8b5cf6',
    items: ['Mobile Phones', 'Laptops', 'Components', 'Cables']
  },
  {
    id: 5,
    name: 'Glass',
    rate: 8,
    icon: '🥛',
    color: '#06b6d4',
    items: ['Bottles', 'Jars', 'Containers', 'Windows']
  },
  {
    id: 6,
    name: 'Textiles',
    rate: 15,
    icon: '👕',
    color: '#ec4899',
    items: ['Clothes', 'Fabric', 'Shoes', 'Bags']
  }
];

const timeSlots = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '1:00 PM - 3:00 PM',
  '3:00 PM - 5:00 PM',
  '5:00 PM - 7:00 PM'
];

export default function SellScreen() {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');

  const addItem = (category: any) => {
    const existingItem = selectedItems.find(item => item.id === category.id);
    if (existingItem) {
      setSelectedItems(selectedItems.map(item =>
        item.id === category.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setSelectedItems([...selectedItems, { ...category, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setSelectedItems(selectedItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id: number) => {
    setSelectedItems(selectedItems.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return selectedItems.reduce((total, item) => total + (item.rate * item.quantity), 0);
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedItems.length === 0) {
      Alert.alert('Error', 'Please select at least one item to sell');
      return;
    }
    if (currentStep === 2 && (!selectedDate || !selectedTime)) {
      Alert.alert('Error', 'Please select date and time for pickup');
      return;
    }
    if (currentStep === 3 && !address.trim()) {
      Alert.alert('Error', 'Please enter your pickup address');
      return;
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit order
      Alert.alert('Success', 'Your pickup has been scheduled successfully!', [
        { text: 'OK', onPress: () => setCurrentStep(1) }
      ]);
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <React.Fragment key={step}>
          <View style={[
            styles.stepCircle,
            currentStep >= step && styles.stepCircleActive
          ]}>
            <Text style={[
              styles.stepNumber,
              currentStep >= step && styles.stepNumberActive
            ]}>
              {step}
            </Text>
          </View>
          {step < 4 && (
            <View style={[
              styles.stepLine,
              currentStep > step && styles.stepLineActive
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select Items to Sell</Text>
      <Text style={styles.stepSubtitle}>Choose the scrap materials you want to sell</Text>
      
      <ScrollView style={styles.categoriesGrid} showsVerticalScrollIndicator={false}>
        {scrapCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => addItem(category)}
          >
            <View style={styles.categoryLeft}>
              <Text style={styles.categoryIconLarge}>{category.icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryNameLarge}>{category.name}</Text>
                <Text style={[styles.categoryRateLarge, { color: category.color }]}>
                  ₹{category.rate}/kg
                </Text>
              </View>
            </View>
            <View style={[styles.addButton, { backgroundColor: category.color }]}>
              <Plus size={20} color="white" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedItems.length > 0 && (
        <View style={styles.selectedItems}>
          <Text style={styles.selectedItemsTitle}>Selected Items</Text>
          {selectedItems.map((item) => (
            <View key={item.id} style={styles.selectedItemCard}>
              <View style={styles.selectedItemLeft}>
                <Text style={styles.selectedItemIcon}>{item.icon}</Text>
                <View>
                  <Text style={styles.selectedItemName}>{item.name}</Text>
                  <Text style={styles.selectedItemRate}>₹{item.rate}/kg</Text>
                </View>
              </View>
              <View style={styles.quantityControls}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, -1)}
                >
                  <Minus size={16} color="#6b7280" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}kg</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, 1)}
                >
                  <Plus size={16} color="#6b7280" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Trash2 size={16} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Schedule Pickup</Text>
      <Text style={styles.stepSubtitle}>Choose your preferred date and time</Text>
      
      <View style={styles.dateSection}>
        <Text style={styles.sectionLabel}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.datesScroll}>
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const dateStr = date.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            });
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.dateCard,
                  selectedDate === dateStr && styles.dateCardSelected
                ]}
                onPress={() => setSelectedDate(dateStr)}
              >
                <Text style={[
                  styles.dateText,
                  selectedDate === dateStr && styles.dateTextSelected
                ]}>
                  {dateStr}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.timeSection}>
        <Text style={styles.sectionLabel}>Select Time Slot</Text>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot}
            style={[
              styles.timeSlot,
              selectedTime === slot && styles.timeSlotSelected
            ]}
            onPress={() => setSelectedTime(slot)}
          >
            <Text style={[
              styles.timeSlotText,
              selectedTime === slot && styles.timeSlotTextSelected
            ]}>
              {slot}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Pickup Address</Text>
      <Text style={styles.stepSubtitle}>Enter your pickup location details</Text>
      
      <View style={styles.addressSection}>
        <View style={styles.addressHeader}>
          <MapPin size={20} color="#6b7280" />
          <Text style={styles.addressLabel}>Pickup Address</Text>
        </View>
        <TextInput
          style={styles.addressInput}
          placeholder="Enter your complete address with landmark"
          multiline
          numberOfLines={4}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <TouchableOpacity style={styles.photoButton}>
        <Camera size={24} color="#6b7280" />
        <Text style={styles.photoButtonText}>Add Photos (Optional)</Text>
        <Text style={styles.photoButtonSubtext}>Help us identify your scrap better</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Order Summary</Text>
      <Text style={styles.stepSubtitle}>Review your pickup details</Text>
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Items</Text>
        {selectedItems.map((item) => (
          <View key={item.id} style={styles.summaryItem}>
            <Text style={styles.summaryItemName}>
              {item.icon} {item.name} ({item.quantity}kg)
            </Text>
            <Text style={styles.summaryItemAmount}>
              ₹{item.rate * item.quantity}
            </Text>
          </View>
        ))}
        <View style={styles.summaryDivider} />
        <View style={styles.summaryTotal}>
          <Text style={styles.summaryTotalLabel}>Estimated Total</Text>
          <Text style={styles.summaryTotalAmount}>₹{getTotalAmount()}</Text>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Pickup Details</Text>
        <View style={styles.summaryDetail}>
          <Calendar size={16} color="#6b7280" />
          <Text style={styles.summaryDetailText}>{selectedDate} • {selectedTime}</Text>
        </View>
        <View style={styles.summaryDetail}>
          <MapPin size={16} color="#6b7280" />
          <Text style={styles.summaryDetailText}>{address}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sell Scrap</Text>
        {renderStepIndicator()}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
      </ScrollView>

      {selectedItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <View style={styles.totalAmount}>
              <IndianRupee size={16} color="#16a34a" />
              <Text style={styles.totalValue}>{getTotalAmount()}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === 4 ? 'Schedule Pickup' : 'Next'}
            </Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
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
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#16a34a',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    fontFamily: 'Inter-SemiBold',
  },
  stepNumberActive: {
    color: 'white',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#16a34a',
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 24,
  },
  categoriesGrid: {
    maxHeight: 400,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIconLarge: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryNameLarge: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  categoryRateLarge: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItems: {
    marginTop: 24,
  },
  selectedItemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  selectedItemCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedItemIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  selectedItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    fontFamily: 'Inter-Medium',
  },
  selectedItemRate: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    minWidth: 40,
    textAlign: 'center',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  datesScroll: {
    marginHorizontal: -8,
  },
  dateCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateCardSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#16a34a',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'Inter-Medium',
  },
  dateTextSelected: {
    color: '#16a34a',
  },
  timeSection: {
    marginBottom: 24,
  },
  timeSlot: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeSlotSelected: {
    backgroundColor: '#f0fdf4',
    borderColor: '#16a34a',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  timeSlotTextSelected: {
    color: '#16a34a',
  },
  addressSection: {
    marginBottom: 24,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 8,
  },
  addressInput: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  photoButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    fontFamily: 'Inter-Medium',
    marginTop: 8,
  },
  photoButtonSubtext: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryItemName: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  summaryItemAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    fontFamily: 'Inter-SemiBold',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  summaryTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Inter-SemiBold',
  },
  summaryTotalAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#16a34a',
    fontFamily: 'Inter-SemiBold',
  },
  summaryDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryDetailText: {
    fontSize: 14,
    color: '#374151',
    fontFamily: 'Inter-Regular',
    marginLeft: 8,
    flex: 1,
  },
  footer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalSection: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  totalAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#16a34a',
    fontFamily: 'Inter-SemiBold',
    marginLeft: 4,
  },
  nextButton: {
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    fontFamily: 'Inter-SemiBold',
  },
});