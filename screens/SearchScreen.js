import React from 'react';
import { Text, View,TextInput,TouchableOpacity,FlatList } from 'react-native';
import db from '../config'
import firebase  from 'firebase';
export default class Searchscreen extends React.Component {

  constructor(){
    super();
    this.state = {
      searchText:'',
      transactions:[],
      lastDoc:null
    }
  }

  fetchTransactions= async()=>{
    var searchText = this.state.searchText
    var searchText2 = searchText.toLowerCase()
    var letters = searchText2.split("")
    console.log(letters)
    if(letters[0]==="b"){
      console.log("it is book")
      const transactions = await db.collection('transactions').where('bookId','==',searchText2).limit(10).get();
      console.log(transactions)
      transactions.docs.map((doc)=>{
        this.setState({
          transactions : [...this.state.transactions,doc.data()],
          lastDoc:doc
        })
      })
    }else if(letters[0]==="s"){
       console.log("it is student")
      const transactions = await db.collection('transactions').where('studentId','==',searchText2).limit(10).get();
      console.log(transactions)
      transactions.docs.map((doc)=>{
        this.setState({
          transactions : [...this.state.transactions,doc.data()],
          lastDoc:doc
        })
      })
    }
  }
  fetchMore= async()=>{
    var searchText = this.state.searchText
    var searchText2 = searchText.toLowerCase()
    var letters = searchText2.split("")
    console.log(letters)
    if(letters[0]==="b"){
      console.log("it is book")
      const transactions = await db.collection('transactions').where('bookId','==',searchText2).startAfter(this.state.lastDoc).limit(10).get();
      console.log(transactions)
      transactions.docs.map((doc)=>{
        this.setState({
          transactions : [...this.state.transactions,doc.data()],
          lastDoc:doc
        })
      })
    }else if(letters[0]==="s"){
       console.log("it is student")
      const transactions = await db.collection('transactions').where('studentId','==',searchText2).startAfter(this.state.lastDoc).limit(10).get();
      console.log(transactions)
      transactions.docs.map((doc)=>{
        this.setState({
          transactions : [...this.state.transactions,doc.data()],
          lastDoc:doc
        })
      })
    }
  }
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
          <TextInput style={{borderWidth:3,borderColor:'red'}} placeholder="Enter ID" onChangeText={text=>{this.setState({searchText : text})}}/>
          <TouchableOpacity
          style={{backgroundColor:'green'}}
          onPress={this.fetchTransactions}
          >
            <Text>Search</Text>
          </TouchableOpacity>
          </View>
          <FlatList 
           data = {this.state.transactions}
           keyExtractor = {(item,index)=>{index.toString}}
           renderItem = {({item})=>(
             <View style={{borderWidth: 2}}>
               <Text style={{borderWidth:2}}>book Id :{item.bookId}</Text>
               <Text>student Id :{item.studentId}</Text>
               <Text>transactions type:{item.transactionType}</Text>
             
             </View>
           

           )}
           onEndReached={this.fetchMore}
           onEndReachedThreshold={0.7}
          />
        </View>
      );
    }
  }
