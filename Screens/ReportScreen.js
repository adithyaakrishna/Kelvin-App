import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import theme from '../theme.json'
import { Table, Row, Rows } from 'react-native-table-component';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ReportScreen = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {

            await firestore().collection('devices').where("user", "==", auth().currentUser.email).onSnapshot(snapshot => {
                snapshot.forEach(async (snap) => {
                    setData([])
                    await firestore().collection('data').where("deviceID", '==', snap.data().deviceId).onSnapshot(sshot => {
                        sshot.forEach(ss => {
                            if (ss.exists) {
                                if (isMounted) {
                                    setData(prevState => [...prevState, ss.data()])
                                }
                            }
                        })
                    })
                })
            })
        }

        fetchData();

        

        return () => {
            isMounted = false;
        }
    },[])

    const printPDF = async() => {

        let dis = `<h1>Visitor's Report</h1>
      <table style="width:100%;">
      <tr style="border: 1px solid black;">
        <td style="border: 1px solid black;text-align: center;">Name</td>
        <td style="border: 1px solid black;text-align: center;">Email</td>
        <td style="border: 1px solid black;text-align: center;">Temperature</td>
      </tr>

    `;
        data.map((d) => {
            dis += `<tr style="border: 1px solid black;">
        <td style="border: 1px solid black;text-align: center;">${d.name}</td>
        <td style="border: 1px solid black;text-align: center;">${d.email}</td>
        <td style="border: 1px solid black;text-align: center;">${d.temperature}</td>
      </tr>`;
        });
        dis += "</table>";

        const results = await RNHTMLtoPDF.convert({
            html: dis,
            fileName: 'Report',
            base64: true,
        })

        await RNPrint.print({ filePath: results.filePath })
    }

    return (
        <View style={styles.container}>
        <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <TouchableOpacity style={{
                    backgroundColor: "#cc2936",
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 30,
                    width: "100%",
                    alignSelf: 'center'}}>
                        <Text style = {{color: 'white'}} onPress = {() => {auth().signOut()}}>Logout</Text>
                    </TouchableOpacity>
                <Text style={{ color: 'white', fontSize: 32, marginVertical: 10 }}>Report</Text>
                <TouchableOpacity style={{
                    backgroundColor: theme.blue,
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: 30,
                    width: "100%",
                    alignSelf: 'center'
                }} onPress = {printPDF}>
                    <Text style = {{color: 'white'}}>Print</Text>
                </TouchableOpacity>
        </View>
            
            <Table borderStyle={{ borderWidth: 2, borderColor: 'white' }}>
                <Row data={["Name", "Temperature", "Email"]} style={{ width: "100%" }} textStyle={{ color: 'white', padding: 10 }} />
                {
                    data.length > 0 ? data.map((d) => {
                        return <Row data={[d.name, d.temperature, d.email]} key = {d.userID} style={{ width: "100%" }} textStyle={{ color: 'white', padding: 10 }} ></Row>
                    }): <Text>No Data</Text>
                }
            </Table>
        </View>
    )
}

export default ReportScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: theme.black,
        paddingHorizontal: 20
    }
})
