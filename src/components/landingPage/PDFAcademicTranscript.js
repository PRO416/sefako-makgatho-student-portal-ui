import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo_small from '../../images/logo-small.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#efefef',
    width: '100vw',
    padding: '0 10'
  },
  section: {
    marginBottom: '5',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '10vw',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    backgroundColor: '#0000ee'
  }
});

const PDFAcademicTranscript = (props) => {
  const { studentData, modules, course } = props;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Image
            style={styles.image}
            source={logo_small}
          />
          <Text>ACADEMIC RECORD</Text>
        </View>
        <View style={{
          padding: '0 3 3 3',
          justifyContent: 'center',
        }}>
          <Text>NAME: {`${studentData.user.firstname} ${studentData.user.lastname}`}</Text>
          <Text>STUDENT NUMBER: {`${studentData.studentNum}`}</Text>
          <Text>QUALIFICATION: {`${
            course
              .filter(c => c.approved)
              .map(c => (<Text>{`BSc(${c.course.name}) ${c.currentLevel}`}</Text>))
          }`}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={{
            justifyContent: 'space-evenly',
            width: '100vw',
          }}>
            <Text style={{
              minWidth: '25vw',
              margin: '0 3vw'
            }}>CODE</Text>
            <Text style={{
              minWidth: '25vw',
              margin: '0 3vw'
            }}>MODULE</Text>
            <Text style={{
              minWidth: '25vw',
              margin: '0 3vw'
            }}>PERIOD</Text>
            <Text style={{
              minWidth: '25vw',
              margin: '0 3vw'
            }}>GRADE</Text>
          </Text>
          <Text style={{
            padding: '10 0',
          }}>Year 2021</Text>
          {
            modules
            .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
            .filter(m => course[0].currentLevel === m.module.year)
            .map(mod => (
              <Text key={mod.id} style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'space-between',
                width: '100vw',
                fontSize: 10
              }}>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw',
                  flexGrow: 1
                }}>{mod.module.code}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw',
                  flexGrow: 1
                }}>{mod.module.name}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw',
                  flexGrow: 1
                }}>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw',
                  flexGrow: 1
                }}>{mod.grade}
                </Text>
              </Text>
            ))
          }
          <Text style={{
            margin: '10 0'
          }}>Year 2020</Text>
          {
            modules
            .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
            .filter(m => course[0].currentLevel > 0 && course[0].currentLevel - 1 === m.module.year)
            .map(mod => (
              <Text key={mod.id} style={{
                flexDirection: 'column',
                minWidth: '100vw',
                fontSize: 10
              }}>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.module.code}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.module.name}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.grade}
                </Text>
              </Text>
            ))
          }
          <Text style={{
            margin: '10 0'
          }}>Year 2019</Text>
          {
            modules
            .sort((a, b) => a.module.academicPeriod - b.module.academicPeriod)
            .filter(m => course[0].currentLevel > 0 && course[0].currentLevel - 2 === m.module.year)
            .map(mod => (
              <Text key={mod.id} style={{
                flexDirection: 'column',
                minWidth: '100vw',
                fontSize: 10
              }}>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.module.code}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.module.name}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.module.academicPeriod === 1 ? 'FIRST SEMESTER' : 'SECOND SEMESTER'}</Text>
                <Text style={{
                  minWidth: '25vw',
                  margin: '0 3vw'
                }}>{mod.grade}
                </Text>
            </Text>
            ))
          }
        </View>
      </Page>
    </Document>
  )
}

export default PDFAcademicTranscript;