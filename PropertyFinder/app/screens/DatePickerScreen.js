import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';
import { Button, Item, Input, Icon } from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import PeopleListScreen from './PeopleListScreen';
import CustomButton from '../components/CustomButton';

export default class DatePickerScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible : false,
      fromDate : '',
      toDate : '',
      whichDate: '',
      submit: false,
      productCount: 0
    }
  }
  _addProduct = () => {
    this.setState((prevState) => ({productCount: prevState.productCount + 1}))
  }
  _doSearch = () => {
    this.setState({submit:true});
  } 
  _handledFromDate = () => {
    this.setState({whichDate:'from'});
    this._showDateTimePicker();
  }
  _handledToDate = () => {
    this.setState({whichDate:'to'});
    this._showDateTimePicker();
  }
  _showDateTimePicker = () => {
    this.setState({isDatePickerVisible : true});
  }
  _hideDateTimePicker = () => {
    this.setState({isDatePickerVisible : false});
  }
  _handleDatePicked = (date) => {
    // Alert.alert('Date has been picked' , date);
    var dateFormatted = this._formatDate(date);
    if(this.state.whichDate == 'from')
      this.setState({fromDate : dateFormatted.toString()});
    else
      this.setState({toDate : dateFormatted.toString()});
    this._hideDateTimePicker();
  }
  _formatDate = (dateObj) => {
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "-" + month + "-" + day;
    return newdate;
  }
  render() { 
    return (
      <View style={[styles.container]}>
        <View style={[styles.calendarContainer]}>
          <Item style={styles.inputContainer}>
            <Icon active name="calendar" />
            <Input
              placeholder="from"
              value={this.state.fromDate}
              style={{width : 20}}
              onFocus={this._handledFromDate}
              size={20}
            />
          </Item>
          <Item style={styles.inputContainer}>
            <Icon active name="calendar" />
            <Input
              placeholder="to"
              value={this.state.toDate}
              style={{width : 20}}
              onFocus={this._handledToDate}
              size={20} 
            />
          </Item>
        </View>
        <Button primary 
          onPress={this._doSearch}
          style={styles.submitButton}
        >
          <Text>Search</Text>
        </Button>
        <CustomButton onPress={this._addProduct}/>
        <Text>Product Count : {this.state.productCount}</Text>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
        {(this.state.submit) ? <PeopleListScreen/> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  calendarContainer: {
    flexDirection: 'row',
    width: 380,
    marginTop: 20 
  },
  inputContainer: {
    flex: 1,
    width: 50,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    // justifyContent: 'space-between' 
  },
  submitButton: {
    width: 150,
    marginTop: 20,
    marginLeft: 120,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
  },
  test: {
    borderWidth: 1,
    borderColor: '#000000',
  }
});