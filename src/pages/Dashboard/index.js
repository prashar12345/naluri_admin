import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import Layout from '../../components/global/layout';
import ApiClient from '../../methods/api/apiClient';
import canvasModel from '../../models/canvas.model';
import './style.scss';
import datepipeModel from '../../models/datepipemodel';
import countryModel from '../../models/country.model'

var CanvasJSChart = canvasModel.CanvasJSChart

const Dashboard = () => {
  const defaultCart = []
  const user = useSelector(state => state.user)
  const [filters, setFilter] = useState({ type: 'day', healthClinic: '', startDate: '', endDate: '', country: '' })
  const [createdUser, setCreatedUser] = useState(defaultCart)
  const [assessmentTypes, setAssessmentTypes] = useState([])
  const [createdCounsellor, setCreatedCounsellor] = useState(defaultCart)
  const [createdCA, setCreatedCA] = useState(defaultCart)
  const [activeUsers, setActiveUsers] = useState(defaultCart)
  const [activeCounsellor, setActiveCounsellor] = useState(defaultCart)
  const [activeCA, setActiveCA] = useState(defaultCart)
  const [caseNotes, setCaseNotes] = useState(defaultCart)
  const [casenoteType, setCasenoteType] = useState({ clinical: 0, nonClinical: 0 })
  const [userStatus, setUserstatus] = useState({ verified: 0, nonVerified: 0 })
  const [healthClinic, setHealthClinic] = useState([])
  const [healthText, setHealthText] = useState('')
  const [healthName, setHealthName] = useState('')
  const [tabs, setTab] = useState('user')
  const [assessment, setAssessment] = useState([])
  const [assessmentLevel, setAssessmentLevel] = useState([])
  const [allAssessment, setAllAssessment] = useState([])
  const [allAssessmentType, setAllAssessmentType] = useState([])
  const [whatsappAnalitcs, setWhatsappAnalitcs] = useState([])
  const [funnel, setfunnel] = useState([])
  const [loader, setLoader] = useState(false)

  const [consultationAnalytics, setConsultationAnalytics] = useState({
    counsultationBookedByUser: [],
    counsellorNumberCounsultation: [],
    totalBookedSession: []
  })

  const [contentAnalytics, setContentAnalytics] = useState({
    contentCategories: [],
    xLength: 0
  })

  const [userAnalytics, setUserAnalytics] = useState({
    viewOwnProfile: [],
    userAssessment: [],
    contentCounts: [],
    whatsappCounsellingCount: [],
    counsultationByUser: []
  })

  const [cousellorActivity, setCousellorActivity] = useState({
    appointmentAddedByCounsellor: [],
    counsellorCancelledAppointments: [],
    counsellorResceduleAppointments: [],
    editScheduleCounsellor: [],
    viewCounsellorByCounsellor: [],
    viewUserByCounsellor: [],
    totalCaseNotesAnalytics: [],
    ylength: 0,
    xlength: 0,
    whatsappxlength: 0
  })

  const [caActivity, setCaActivity] = useState({
    appointmentAddedByCa: [{ x: new Date(), y: 0 }],
    viewCaByCa: [{ x: new Date(), y: 0 }],
    editScheduleCa: [{ x: new Date(), y: 0 }],
    viewUserByCa: [{ x: new Date(), y: 0 }],
    viewCounsellorByCa: [{ x: new Date(), y: 0 }],
    caResceduleAppointments: [{ x: new Date(), y: 0 }],
    caCancelledAppointments: [{ x: new Date(), y: 0 }],
    xlength: 0
  })

  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const xAxis = {
    labelFontSize: 12,
    titleFontSize: 16,
    interval: 1,
    // prefix: filters.type == 'week' ? 'Week:' : '',
    titleFontWeight: "bold",
    labelWrap: true
  }

  const sortby = (arr, filter) => {
    if (!arr) return []

    let sortedArr = arr.sort(function (a, b) {
      return (a.x ? a.x : a.date) - (b.x ? b.x : b.date);
    })

    if (arr.length) {
      let days = datepipeModel.DaysNo(sortedArr[0].x ? sortedArr[0].x : sortedArr[0].date, sortedArr[sortedArr.length - 1].x ? sortedArr[sortedArr.length - 1].x : sortedArr[sortedArr.length - 1].date)
      sortedArr[0] = { ...sortedArr[0], daysno: days }
    }



    if (filter.type == 'week') {
      return sortedArr.map((itm, i) => {
        let date = new Date(itm.x ? itm.x : itm.date)
        // let label = `Week:${date.getDate()} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()}`;
        let label = `Week:${i + 1}`;
        return { ...itm, x: i + 1, label: label }
      })
    }

    return sortedArr
  }

  const isInterval = (arr) => {
    let interval = 0
    if (arr && arr.length && arr[0].daysno < 6) interval = 1
    return interval
  }

  const setDateRange = (p) => {
    let filter = { ...filters, startDate: p[0] ? p[0] : '', endDate: p[1] ? p[1] : '' }
    setFilter(filter)
    if (!p[0] && !p[1]) {
      typeChange(filter)
    } else if (p[0] && p[1]) {
      typeChange(filter)
    }
  }

  const toggleDataSeries = (e) => {
    // if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
    //   e.dataSeries.visible = false;
    // }
    // else {
    //   e.dataSeries.visible = true;
    // }
  }

  const typeChange = (p = {}) => {
    let filter = { ...filters, ...p }
    setFilter(filter)
    let payload = {
      ...filter,
      startDate: filter.startDate ? datepipeModel.datetostring(filter.startDate) : '',
      endDate: filter.endDate ? datepipeModel.datetostring(filter.endDate) : ''
    }

    assessmentAnalytics(payload)
    ConsultationSettion(payload)
    ContentAnalytics(payload)
    dropoff(payload)
    getuserAnalytics(payload)

    setLoader(true)
    ApiClient.get("analytics", payload).then(res => {
      if (res && res.success) {
        const setObj = (itm, noWeek = false) => {
          let obj = {}
          if (filter.type == 'day') obj = { x: new Date(`${itm.days}`), y: Number(itm.total ? itm.total : itm.userthisday) }
          if (filter.type == 'week') {
            let length = itm.months.length
            let week = itm.months[length - 1]
            let date = new Date(itm.months)
            obj = {
              date: date,
              label: `Week:${week} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()}`,
              y: Number(itm.total ? itm.total : itm.userthismonth)
            }
            if (noWeek) obj.x = date
          }

          if (filter.type == 'month') obj = { x: new Date(`12 ${itm.months}`), y: Number(itm.total ? itm.total : itm.userthismonth) }
          if (filter.type == 'year') obj = { x: new Date(`12 OCT ${itm.years}`), y: Number(itm.total ? itm.total : itm.userthisyear) }
          return { ...obj, typeofresult: itm.typeofresult }
        }

        let dailyActiveUsers = res.dailyActiveUsers.map(itm => {
          return setObj(itm)
        })

        let totalUserAccounts = res.totalUserAccounts.map(itm => {
          return setObj(itm)
        })

        let dailyActiveCounsellors = res.dailyActiveCounsellors.map(itm => {
          return setObj(itm)
        })

        let totalCounsellors = res.totalCounsellors.map(itm => {
          return setObj(itm)
        })

        let totalDailyActiveCA = res.totalDailyActiveCA.map(itm => {
          return setObj(itm)
        })

        let totalAccountCA = res.totalAccountCA.map(itm => {
          return setObj(itm)
        })

        let totalAddedCaseNotes = res.totalAddedCaseNotes.map(itm => {
          return setObj(itm, true)
        }).sort((a, b) => {
          return a.x - b.x
        })

        let totalCaseNotesAnalytics = res.totalCaseNotesAnalytics.map(itm => {
          return setObj(itm)
        })


        let appointmentAddedByCounsellor = res.appointmentAddedByCounsellor.map(itm => {
          return setObj(itm)
        })

        let counsellorCancelledAppointments = res.counsellorCancelledAppointments.map(itm => {
          return setObj(itm)
        })

        let counsellorResceduleAppointments = res.counsellorResceduleAppointments.map(itm => {
          return setObj(itm)
        })

        let editScheduleCounsellor = res.editScheduleCounsellor.map(itm => {
          return setObj(itm)
        })

        let viewCounsellorByCounsellor = res.viewCounsellorByCounsellor.map(itm => {
          return setObj(itm)
        })

        let viewUserByCounsellor = res.viewUserByCounsellor.map(itm => {
          return setObj(itm)
        })



        let whatsappClickRate = res.whatsappClickRate.map((itm, i) => {
          let day = itm.months
          if (filter.type == 'month') day = '01 ' + itm.months
          if (filter.type == 'year') day = '01 01 ' + itm.months

          let date = new Date(day)
          let wprm = {
            x: date,
            y: Number(itm.total),
            typeofresult: itm.typeofresult,
          }
          return wprm
        }).sort((a, b) => {
          return a.x - b.x
        })

        let whatsappxlength = 0
        if (whatsappClickRate && whatsappClickRate.length) {
          whatsappxlength = datepipeModel.DaysNo(whatsappClickRate[0].x, whatsappClickRate[whatsappClickRate.length - 1].x)
        }
        setWhatsappAnalitcs(setLevels(getLevelKeys(whatsappClickRate, filter), false, 'line', false))

        let cousellorAct = {
          appointmentAddedByCounsellor: sortby(appointmentAddedByCounsellor.length ? appointmentAddedByCounsellor : defaultCart, filter),
          counsellorCancelledAppointments: sortby(counsellorCancelledAppointments.length ? counsellorCancelledAppointments : defaultCart, filter),
          counsellorResceduleAppointments: sortby(counsellorResceduleAppointments.length ? counsellorResceduleAppointments : defaultCart, filter),
          editScheduleCounsellor: sortby(editScheduleCounsellor.length ? editScheduleCounsellor : defaultCart, filter),
          viewCounsellorByCounsellor: sortby(viewCounsellorByCounsellor.length ? viewCounsellorByCounsellor : defaultCart, filter),
          viewUserByCounsellor: sortby(viewUserByCounsellor.length ? viewUserByCounsellor : defaultCart, filter),
          totalCaseNotesAnalytics: sortby(totalCaseNotesAnalytics.length ? totalCaseNotesAnalytics : defaultCart, filter)
        }


        let arr = [
          ...cousellorAct.appointmentAddedByCounsellor,
          ...cousellorAct.counsellorCancelledAppointments,
          ...cousellorAct.counsellorResceduleAppointments,
          ...cousellorAct.editScheduleCounsellor,
          ...cousellorAct.viewCounsellorByCounsellor,
          ...cousellorAct.viewUserByCounsellor,
          ...cousellorAct.totalCaseNotesAnalytics,
        ].sort(function (a, b) {
          return b.y - a.y;
        })

        let xlength = getxLength([
          ...cousellorAct.appointmentAddedByCounsellor,
          ...cousellorAct.counsellorCancelledAppointments,
          ...cousellorAct.counsellorResceduleAppointments,
          ...cousellorAct.editScheduleCounsellor,
          ...cousellorAct.viewCounsellorByCounsellor,
          ...cousellorAct.viewUserByCounsellor,
          ...cousellorAct.totalCaseNotesAnalytics,
        ])

        setCousellorActivity({ ...cousellorActivity, ...cousellorAct, ylength: arr.length && arr[0].y, xlength, whatsappxlength: whatsappxlength })

        caAnalytics(payload, cousellorAct)

        res.totalCaseNotesTypes.map(itm => {
          if (itm.caseType == 'clinical') casenoteType.clinical = Number(itm.count)
          if (itm.caseType == 'non-clinical') casenoteType.nonClinical = Number(itm.count)
        })
        setCasenoteType(casenoteType)

        res.userIdentityVerified.map(itm => {
          if (itm.isVerified == 'Y') userStatus.verified = Number(itm.count)
          if (itm.isVerified == 'N') userStatus.nonVerified = Number(itm.count)
        })
        setUserstatus(userStatus)

        if (totalAddedCaseNotes && totalAddedCaseNotes.length) {
          totalAddedCaseNotes[0].daysno = datepipeModel.DaysNo(totalAddedCaseNotes[0].x, totalAddedCaseNotes[totalAddedCaseNotes.length - 1].x)
        }

        setCaseNotes(setLevels(getLevelKeys(totalAddedCaseNotes, filter), false, 'line', false))

        setTimeout(() => {
          setCreatedUser(sortby(totalUserAccounts.length ? totalUserAccounts : defaultCart, filter))
          setActiveUsers(sortby(dailyActiveUsers.length ? dailyActiveUsers : defaultCart, filter))
          setActiveCounsellor(sortby(dailyActiveCounsellors.length ? dailyActiveCounsellors : defaultCart, filter))
          setCreatedCounsellor(sortby(totalCounsellors.length ? totalCounsellors : defaultCart, filter))
          setActiveCA(sortby(totalDailyActiveCA.length ? totalDailyActiveCA : defaultCart, filter))
          setCreatedCA(sortby(totalAccountCA.length ? totalAccountCA : defaultCart, filter))
        }, 100);
      } else {
        setLoader(false)
      }


    })
  }

  const typFormate = (p = filters.type) => {
    let value = 'DD MMM YY'
    if (p == 'day') value = 'DD MMM YY'
    if (p == 'week') value = ''
    if (p == 'month') value = 'MMM YY'
    if (p == 'year') value = 'YYYY'

    return value
  }

  const getLevelKeys = (arr, filter) => {
    let keys = {}
    let keysdates = {}

    if (arr) {
      arr.map(itm => {
        if (keys[itm.typeofresult]) {
          keys[itm.typeofresult].push(itm)
        } else {
          keys[itm.typeofresult] = [itm]
        }

        if (keysdates[datepipeModel.date(itm.x)]) {
          keysdates[datepipeModel.date(itm.x)].push(itm)
        } else {
          keysdates[datepipeModel.date(itm.x)] = [itm]
        }
      })
    }

    let ukey = {}
    Object.keys(keys).map(itm => {
      ukey[itm] = Object.keys(keysdates).map((ditm, di) => {

        if (keysdates[ditm].find(dfind => dfind.typeofresult == itm)) {
          let prm = { ...keysdates[ditm].find(dfind => dfind.typeofresult == itm) }
          if (filter.type == 'week') {
            let date = new Date(prm.x ? prm.x : prm.date)
            // let label = `Week:${date.getDate()} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()}`;
            let label = `Week:${di + 1}`;
            prm.x = di;
            prm.label = label;
          }
          return prm
        } else {
          let prm = { x: new Date(ditm), y: 0, typeofresult: itm }
          if (filter.type == 'week') {
            let date = new Date(prm.x ? prm.x : prm.date)
            // let label = `Week:${date.getDate()} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()}`;
            let label = `Week:${di + 1}`;
            prm.x = di;
            prm.label = label;
          }
          return prm
        }
      })
    })
    return ukey
  }

  const assessmentAnalytics = (p) => {
    let filter = { ...filters, ...p }
    ApiClient.get('assessment/analytics', filter).then(res => {
      let arr = res.userCompletedAssessment
      if (arr) {
        arr = arr.map(itm => {
          let day = itm.months
          if (filter.type == 'month') day = '01 ' + itm.months
          if (filter.type == 'year') day = '01 01 ' + itm.months
          let prm = { x: new Date(day), y: Number(itm.total), typeofresult: itm.typeofresult }
          return prm
        }).sort((a, b) => {
          return a.x - b.x
        })
      }

      setAssessment(setLevels(getLevelKeys(arr, filter), false, 'line', false))
      let levkeys = {}
      let levmkeys = {}
      let levarr = res.userFirstCreateAccount

      if (levarr.length) {
        levarr.sort(function (a, b) {
          return new Date(a.months) - new Date(b.months);
        })
        levarr.map((itm, i) => {
          let length = itm.months.length
          let week = itm.months[length - 1]
          let date = new Date(itm.months)
          let prm = {
            date: date,
            label: `Week:${week} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()} `,
            y: Number(itm.total ? itm.total : itm.months),
            typeofresult: itm.typeofresult
          }

          if (levmkeys[itm.months]) {
            levmkeys[itm.months].push(prm)
          } else {
            levmkeys[itm.months] = [prm]
          }

          if (levkeys[itm.typeofresult]) {
            levkeys[itm.typeofresult].push(prm)
          } else {
            levkeys[itm.typeofresult] = [prm]
          }
        })
      }

      let ulevkeys = {}
      Object.keys(levkeys).map(itm => {
        ulevkeys[itm] = [...Object.keys(levmkeys).map((mitm, i) => {
          if (levmkeys[mitm]) {
            let ext = levmkeys[mitm].find(ffit => ffit.typeofresult == itm)

            let length = mitm.length
            let week = mitm[length - 1]
            let date = new Date(mitm)
            // let label = `Week:${ week } ${ datepipeModel.monthfind(date.getMonth()) } ${ date.getFullYear() } `
            let label = `Week:${i + 1} `

            if (ext) {
              return { y: ext.y, label }
            } else {
              return { y: 0, label }
            }
          }

        })]
      })

      setAssessmentLevel(setLevels(ulevkeys, false, 'line', false))

      let allKeys = {}
      res.other.map(itm => {
        let prm = {
          x: 0,
          y: Number(itm.count),
          type: itm.result,
          label: 'Other'
        }
        if (allKeys[itm.result]) {
          allKeys[itm.result].push(prm)
        } else {
          allKeys[itm.result] = [prm]
        }
      })
      res.readContent.map(itm => {
        let prm = {
          x: 1,
          y: Number(itm.count),
          type: itm.result,
          label: 'Read Content'
        }
        if (allKeys[itm.result]) {
          allKeys[itm.result].push(prm)
        } else {
          allKeys[itm.result] = [prm]
        }
      })
      res.downloadedAssessmentPdf.map(itm => {
        let prm = {
          x: 2,
          y: Number(itm.count),
          type: itm.result,
          label: 'Download Assessment Pdf'
        }
        if (allKeys[itm.result]) {
          allKeys[itm.result].push(prm)
        } else {
          allKeys[itm.result] = [prm]
        }
      })

      let whatskeys = {}
      res.whatsappCounselling.map(itm => {
        let day = itm.months
        if (filter.type == 'month') day = '01 ' + itm.months
        if (filter.type == 'year') day = '01 01 ' + itm.months


        let date = new Date(day)
        let prm = {
          x: 3,
          y: Number(itm.total),
          date: date,
          type: itm.typeofresult,
          label: 'Whatsapp Counselling'
        }

        let wprm = {
          x: date,
          y: Number(itm.total),
          type: itm.typeofresult,
        }

        if (filter.type == 'week') {
          let length = itm.months.length
          let week = itm.months[length - 1]
          let date = new Date(itm.months)
          wprm = {
            X: date,
            type: itm.typeofresult,
            label: `Week:${week} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()} `,
            y: Number(itm.total ? itm.total : itm.months)
          }
        }


        if (whatskeys[itm.typeofresult]) {
          whatskeys[itm.typeofresult].push(wprm)
        } else {
          whatskeys[itm.typeofresult] = [wprm]
        }
        if (allKeys[itm.typeofresult]) {
          allKeys[itm.typeofresult].push(prm)
        } else {
          allKeys[itm.typeofresult] = [prm]
        }
      })

      setAllAssessment(setLevels(allKeys, true, 'stackedColumn', false))
      let assessmentype = Object.keys(res.assessmentType)
      let levelkeys = {}
      assessmentype.map(itm => {
        res.assessmentType[itm].map(aitm => {
          let prm = { label: aitm.type, y: Number(aitm.count) }
          if (levelkeys[aitm.typeofresult]) {
            levelkeys[aitm.typeofresult].push(prm)
          } else {
            levelkeys[aitm.typeofresult] = [prm]
          }
        })
      })

      ApiClient.get('category/types', { page: 1, count: 20 }).then(res => {
        if (res.success) {

          let data = res.data
          Object.keys(levelkeys).map(lkey => {
            levelkeys[lkey] = data.map(itm => {
              let prm = { label: itm.name, y: 0 }
              if (levelkeys[lkey].find(litm => litm.label == itm.name)) prm = levelkeys[lkey].find(litm => litm.label == itm.name)
              return prm
            })
          })

          setAllAssessmentType([...setLevels(levelkeys, true, 'stackedColumn', false)])
        }
      })


    })
  }

  const setLevels = (levelkeys = {}, noDate = false, chart = 'stackedColumn', showInLegend = true) => {
    let findAllLevel = (p) => {
      let value = []
      if (levelkeys[p]) {
        value = levelkeys[p]
      }
      return value
    }

    let allLevels = [
      {
        type: chart,
        name: 'Extremely severe',
        color: '#e74c3c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Extremely severe'),
      },
      {
        type: chart,
        name: 'high',
        color: '#e74c3c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('high'),
      },
      {
        type: chart,
        name: 'Severe',
        color: '#F39C12',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Severe')
      },
      {
        type: chart,
        name: 'Moderate',
        color: '#F1C40F',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Moderate')
      },
      {
        type: chart,
        name: 'medium',
        color: '#F1C40F',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('medium')
      },
      {
        type: chart,
        name: 'Mild',
        color: '#2ECC71',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Mild')
      },
      {
        type: chart,
        name: 'Low',
        color: '#1abc9c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Low')
      },
      {
        type: chart,
        name: 'low',
        color: '#1abc9c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('low')
      },
      {
        type: chart,
        name: 'Normal',
        color: '#1abc9c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Normal')
      },
      {
        type: chart,
        name: 'Not Applicable',
        color: '#BDC3C7',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('')
      }
    ]

    let keyarr = Object.keys(levelkeys)
    let extraarr = []
    keyarr.map(kitm => {
      if (allLevels.find(itm => itm.name != kitm)) {
        // extraarr.push({
        //   type: chart,
        //   name: kitm,
        //   color: '#e74c3c',
        //   showInLegend: true,
        //   yValueFormatString: "#,##0",
        //   dataPoints: findAllLevel(kitm),
        // })
      }
    })


    return [...allLevels, ...extraarr].map(itm => {
      if (noDate) {
        return { ...itm, xValueFormatString: '' }
      } else {
        return { ...itm, xValueFormatString: typFormate() }
      }
    })
  }

  const orderLevels = (arr, noDate = false, chart = 'stackedColumn', showInLegend = true) => {
    let findAllLevel = (p) => {
      let value = []
      if (arr && arr.find(itm => itm.name == p)) {
        value = arr.find(itm => itm.name == p).dataPoints
      }
      return value
    }

    let allLevels = [
      {
        type: chart,
        name: 'Extremely severe',
        color: '#e74c3c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Extremely severe'),
      },
      {
        type: chart,
        name: 'High',
        color: '#e74c3c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('high'),
      },
      {
        type: chart,
        name: 'Severe',
        color: '#F39C12',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Severe')
      },
      {
        type: chart,
        name: 'Moderate',
        color: '#F1C40F',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Moderate')
      },
      {
        type: chart,
        name: 'Medium',
        color: '#F1C40F',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('medium')
      },
      {
        type: chart,
        name: 'Mild',
        color: '#2ECC71',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Mild')
      },
      {
        type: chart,
        name: 'low',
        color: '#1abc9c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('low')
      },
      {
        type: chart,
        name: 'Low',
        color: '#1abc9c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Low')
      },
      {
        type: chart,
        name: 'Normal',
        color: '#1abc9c',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('Normal')
      },
      {
        type: chart,
        name: 'Not Applicable',
        color: '#BDC3C7',
        showInLegend: showInLegend,
        yValueFormatString: "#,##0",
        dataPoints: findAllLevel('')
      }
    ]

    return allLevels.map(itm => {
      if (noDate) {
        return { ...itm }
      } else {
        return { ...itm, xValueFormatString: noDate ? '' : typFormate(), }
      }
    })
  }

  const getxLength = (arr = []) => {
    let order = arr.filter(itm => itm.daysno).sort((a, b) => b.daysno - a.daysno)
    return order.length ? order[0].daysno : 0
  }

  const getuserAnalytics = (p) => {
    let filter = { ...filters, ...p }
    ApiClient.get('user/analytics', filter).then(res => {

      const setObj = (itm) => {
        let obj = {}
        if (filter.type == 'day') obj = { x: new Date(`${itm.days ? itm.days : itm.months} `), y: Number(itm.total ? itm.total : itm.userthisday) }
        if (filter.type == 'week') {
          let length = itm.months.length
          let week = itm.months[length - 1]
          let date = new Date(itm.months)
          obj = {
            date: date,
            label: `Week:${week} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()} `,
            y: Number(itm.total ? itm.total : itm.userthismonth)
          }
        }
        if (filter.type == 'month') obj = { x: new Date(`12 ${itm.months} `), y: Number(itm.total ? itm.total : itm.userthismonth) }
        if (filter.type == 'year') obj = { x: new Date(`12 OCT ${itm.years ? itm.years : itm.months} `), y: Number(itm.total ? itm.total : itm.userthisyear) }
        return obj
      }

      let viewOwnProfile = res.viewOwnProfile.map(itm => {
        return setObj(itm)
      })

      let userAssessment = res.userAssessment.map(itm => {
        return setObj(itm)
      })

      let contentCounts = res.contentCounts.map(itm => {
        return setObj(itm)
      })

      let whatsappCounsellingCount = res.whatsappCounsellingCount.map(itm => {
        return setObj(itm)
      })

      let counsultationByUser = res.counsultationByUser.map(itm => {
        return setObj(itm)
      })

      let keys = {
        viewOwnProfile: sortby(viewOwnProfile.length ? viewOwnProfile : defaultCart, filter),
        userAssessment: sortby(userAssessment.length ? userAssessment : defaultCart, filter),
        contentCounts: sortby(contentCounts.length ? contentCounts : defaultCart, filter),
        counsultationByUser: sortby(counsultationByUser.length ? counsultationByUser : defaultCart, filter),
        whatsappCounsellingCount: sortby(whatsappCounsellingCount.length ? whatsappCounsellingCount : defaultCart, filter),
      }

      keys.daysno = getxLength([...keys.viewOwnProfile,
      ...keys.userAssessment,
      ...keys.contentCounts,
      ...keys.counsultationByUser,
      ...keys.whatsappCounsellingCount,
      ])
      setUserAnalytics(keys)
    })
  }

  const caAnalytics = (p, cousellorActivity = {}) => {
    let filter = { ...filters, ...p }
    ApiClient.get('ca/analytics', filter).then(res => {

      if (res.success) {
        const setObj = (itm) => {
          let obj = {}
          if (filter.type == 'day') obj = { x: new Date(`${itm.days} `), y: Number(itm.total ? itm.total : itm.userthisday) }
          if (filter.type == 'week') {
            let length = itm.months.length
            let week = itm.months[length - 1]
            let date = new Date(itm.months)
            obj = {
              date: date,
              label: `Week:${week} ${datepipeModel.monthfind(date.getMonth())} ${date.getFullYear()} `,
              y: Number(itm.total ? itm.total : itm.userthismonth)
            }
          }
          if (filter.type == 'month') obj = { x: new Date(`12 ${itm.months} `), y: Number(itm.total ? itm.total : itm.userthismonth) }
          if (filter.type == 'year') obj = { x: new Date(`12 OCT ${itm.years} `), y: Number(itm.total ? itm.total : itm.userthisyear) }
          return obj
        }

        let appointmentAddedByCa = res.appointmentAddedByCa.map(itm => {
          return setObj(itm)
        })
        let caCancelledAppointments = res.caCancelledAppointments.map(itm => {
          return setObj(itm)
        })
        let editScheduleCa = res.editScheduleCa.map(itm => {
          return setObj(itm)
        })
        let viewCaByCa = res.viewCaByCa.map(itm => {
          return setObj(itm)
        })
        let viewCounsellorByCa = res.viewCounsellorByCa.map(itm => {
          return setObj(itm)
        })
        let viewUserByCa = res.viewUserByCa.map(itm => {
          return setObj(itm)
        })
        let caResceduleAppointments = res.caResceduleAppointments.map(itm => {
          return setObj(itm)
        })

        let keys = {
          appointmentAddedByCa: sortby(appointmentAddedByCa.length ? appointmentAddedByCa : defaultCart, filter),
          viewCaByCa: sortby(viewCaByCa.length ? viewCaByCa : defaultCart, filter),
          caCancelledAppointments: sortby(caCancelledAppointments.length ? caCancelledAppointments : defaultCart, filter),
          editScheduleCa: sortby(editScheduleCa.length ? editScheduleCa : defaultCart, filter),
          viewUserByCa: sortby(viewUserByCa.length ? viewUserByCa : defaultCart, filter),
          viewCounsellorByCa: sortby(viewCounsellorByCa.length ? viewCounsellorByCa : defaultCart, filter),
          caResceduleAppointments: sortby(caResceduleAppointments.length ? caResceduleAppointments : defaultCart, filter),
        }


        let xlength = getxLength([
          ...keys.caResceduleAppointments,
          ...keys.caCancelledAppointments,
          ...keys.appointmentAddedByCa,
          ...keys.editScheduleCa,
          ...cousellorActivity.totalCaseNotesAnalytics,
          ...keys.viewUserByCa,
          ...keys.viewCounsellorByCa,
        ])

        setCaActivity({ ...keys, xlength })

        setTimeout(() => {
          setLoader(false)
        }, 1000);
      } else {
        setLoader(false)
      }
    })
  }

  const ConsultationSettion = (p = {}) => {
    let filter = { ...filters, ...p }
    ApiClient.get('consultation/analytics', { ...filter }).then(res => {

      let bookingkeys = {}
      let levelname = [
        { key: 'Extremely severeCount', name: 'Extremely severe' },
        { key: 'MildCount', name: 'Mild' },
        { key: 'ModerateCount', name: 'Moderate' },
        { key: 'NormalCount', name: 'Normal' },
        { key: 'SevereCount', name: 'Severe' },
        { key: 'Count', name: '' },
      ]
      res.totalBookedSession.map(titm => {
        let prm = {
          y: titm.totalCounsultations
        }

        levelname.map(itm => {
          if (bookingkeys[itm.name]) {
            if (titm[itm.key]) bookingkeys[itm.name].push({ ...prm, type: itm.name, x: titm[itm.key] })
          } else {
            if (titm[itm.key]) bookingkeys[itm.name] = [{ ...prm, type: itm.name, x: titm[itm.key] }]
          }
        })
      })




      let counsultationBookedByUser = res.counsultationBookedByUser.map((itm, i) => {
        let day = itm.months
        if (filter.type == 'month') day = '01 ' + itm.months
        if (filter.type == 'year') day = '01 01 ' + itm.months

        let date = new Date(day)
        let wprm = {
          x: date,
          y: Number(itm.total),
          typeofresult: itm.typeofresult,
        }
        return wprm
      }).sort((a, b) => {
        return a.x - b.x
      })

      let counsellorNumberCounsultation = res.counsellorNumberCounsultation.map((itm, i) => {
        let day = itm.months
        if (filter.type == 'month') day = '01 ' + itm.months
        if (filter.type == 'year') day = '01 01 ' + itm.months

        let date = new Date(day)
        let wprm = {
          x: date,
          y: Number(itm.total),
          typeofresult: itm.typeofresult,
        }
        return wprm
      }).sort((a, b) => {
        return a.x - b.x
      })



      if (counsultationBookedByUser && counsultationBookedByUser.length) {
        counsultationBookedByUser[0].daysno = datepipeModel.DaysNo(counsultationBookedByUser[0].x, counsultationBookedByUser[counsultationBookedByUser.length - 1].x)
      }

      if (counsellorNumberCounsultation && counsellorNumberCounsultation.length) {
        counsellorNumberCounsultation[0].daysno = datepipeModel.DaysNo(counsellorNumberCounsultation[0].x, counsellorNumberCounsultation[counsellorNumberCounsultation.length - 1].x)
      }

      setConsultationAnalytics({
        ...consultationAnalytics,
        counsultationBookedByUser: setLevels(getLevelKeys(counsultationBookedByUser, filter), true, 'line', false),
        totalBookedSession: setLevels(bookingkeys, true, 'stackedColumn', false),
        counsellorNumberCounsultation: setLevels(getLevelKeys(counsellorNumberCounsultation, filter), true, 'line', false),
      })
    })
  }

  const ContentAnalytics = (p = {}) => {
    let filter = { ...filters, ...p }
    ApiClient.get('content/analytics', { ...filter }).then(res => {

      let setline = (itm, name = '') => {
        let p = itm.key
        let value = itm.value
        let color = '#bdc3c7'
        if (p == 'Moderate' || p == 'Mild') color = '#f39c12'
        if (p == 'Severe' || p == 'Extremely severe' || p == 'High') color = '#e74c3c'
        if (p == 'Normal' || p == 'Low') color = '#1abc9c'
        let val = {
          type: "line",
          name: name ? name : p ? p : 'Not Applicable',
          showInLegend: p == 'undefined' ? false : true,
          xValueFormatString: typFormate(),
          yValueFormatString: "#,##0",
          dataPoints: [
            ...value
          ]
        }
        return val
      }



      let contentCategories = res.contentCategories.map(itm => {
        let day = itm.months
        if (filter.type == 'month') day = '01 ' + itm.months
        if (filter.type == 'year') day = '01 01 ' + itm.months
        let prm = { x: new Date(day), y: Number(itm.total), typeofresult: itm.typeofresult }
        return prm
      }).sort((a, b) => {
        return a.x - b.x
      })

      let contentCategorieskeys = getLevelKeys(contentCategories, filter)

      let ucontentCategories = []
      Object.keys(contentCategorieskeys).map(itm => {
        ucontentCategories.push(setline({ key: itm, value: contentCategorieskeys[itm] }, itm))
      })


      let xLength = 0
      if (contentCategories && contentCategories.length) {
        xLength = datepipeModel.DaysNo(contentCategories[0].x, contentCategories[contentCategories.length - 1].x)
      }
      // console.log("contentCategories", contentCategories)

      setContentAnalytics({ ...contentAnalytics, contentCategories: ucontentCategories, xLength })
    })
  }

  const dropoff = (p = {}) => {
    let filter = { ...filters, ...p }
    ApiClient.get('dropoff/analytics', filter).then(res => {
      if (res.success) {

        if (res.data.length) {
          // setfunnel(res.data.map(itm => {
          //   return { y: Number(itm.count), label: itm.page }
          // }))

          var dataPoints = res.data.map(itm => {
            return { y: Number(itm.count), label: itm.page }
          })
          dataPoints.sort(function (a, b) { return b.y - a.y });
          var total = dataPoints[0].y;
          for (var i = 0; i < dataPoints.length; i++) {
            if (i == 0) {
              dataPoints[i].percentage = 100;
            } else {
              dataPoints[i].percentage = ((dataPoints[i].y / total) * 100).toFixed(2);
            }
          }

          setfunnel(dataPoints)

        }
      }

    })
  }

  useEffect(() => {
    typeChange()
    getHealthClinic()
    getAssessmentTypes()
    let el = document.getElementById("datePicker")
    if (el) el.setAttribute('placeholder', 'dd/mm/yyy - dd/mm/yyy')
  }, [])

  const getHealthClinic = (p = '') => {
    let filter = { search: p, count: 50, page: 1 }
    ApiClient.get("health/clinics", filter).then(res => {
      if (res.success) {
        setHealthClinic(res.data)
      }
    })
  }

  const searchHealth = (p) => {
    setHealthText(p)
    getHealthClinic(p)
  }

  const healthClick = (itm) => {
    setHealthName(itm.name)
    typeChange({ healthClinic: itm.id })
  }

  const getCity = (code, country) => {
    ApiClient.get('city', { countryCode: country ? country : filters.country, stateCode: code }).then(res => {
      if (res.success) {
        setCities(res.data)
      }
    })
  }

  const getState = (code = 'MY') => {
    ApiClient.get('states', { countryCode: code }).then(res => {
      if (res.success) {
        setStates(res.data)
      }
    })
  }

  const getAssessmentTypes = () => {
    ApiClient.get('category/types', { page: 1, count: 100 }).then(res => {
      if (res.success) {
        setAssessmentTypes(res.data)
      }
    })
  }

  const LevelLegends = (p) => {
    let type = p.type
    let array = p.array

    if (array) {
      return <><div className='legends mb-2'>
        {array.map(itm => {
          return <div key={itm.name}>
            <div className='color' style={{ backgroundColor: itm.color }}></div> {itm.name}
          </div>
        })}
      </div>
      </>
    } else {
      return <><div className='legends mb-2'>
        {type === 'casenote' ? <>
          {orderLevels().map(itm => {
            if (itm.name === 'Low'
              || itm.name == 'Medium'
              || itm.name === 'High'
            )
              return <div>
                <div className='color' style={{ backgroundColor: itm.color }}></div> {itm.name}
              </div>
          }).reverse()}
        </> : <>
          {orderLevels().map(itm => {
            if (itm.name !== 'low'
              && itm.name !== 'Medium'
              && itm.name !== 'Low'
              && itm.name !== 'High'
            )
              return <div>
                <div className='color' style={{ backgroundColor: itm.color }}></div> {itm.name}
              </div>
          }).reverse()}
        </>}

      </div>
      </>
    }


  }

  const userLegends = [
    { name: 'View/Edit User Profile', color: 'rgb(189, 195, 199)' },
    { name: 'Assessment', color: 'rgb(46, 204, 113)' },
    { name: 'Contents', color: 'rgb(241, 196, 15)' },
    { name: 'Consultation Booking', color: 'rgb(243, 156, 18)' },
    { name: 'Whatsapp Counselling', color: 'rgb(231, 76, 60)' },
  ]

  const counsellorLegends = [
    {
      name: "Reschedule Appointment",
      color: 'rgb(189, 195, 199)',
    },
    {
      name: "Cancel Appointment",
      color: 'rgb(231, 76, 60)',
    },
    {
      name: "Book Appointment For Users",
      color: 'rgb(243, 156, 18)',
    },
    {
      name: "Edit Availabilities",
      color: 'rgb(241, 196, 15)',
    },
    {
      name: "Add Case Notes",
      color: 'rgb(46, 204, 113)',
    },
    {
      name: "View/Edit User Profile",
      color: 'rgb(25, 125, 159)',
    },
    {
      name: "View/Edit Counsellor Profile",
      color: 'rgb(161, 0, 39)',
    }
  ]

  const caLegends = [
    {
      name: "Reschedule Appointment",
      color: 'rgb(189, 195, 199)',
    },
    {
      name: "Cancel Appointment",
      color: 'rgb(231, 76, 60)',
    },
    {
      name: "Book Appointment For Users",
      color: 'rgb(243, 156, 18)',
    },
    {
      name: "Edit Availabilities",
      color: 'rgb(241, 196, 15)',
    },
    {
      name: "Add Case Notes",
      color: 'rgb(46, 204, 113)',
    },
    {
      name: "View/Edit User Profile",
      color: 'rgb(25, 125, 159)',
    },
    {
      name: "View/Edit Counsellor Profile",
      color: 'rgb(161, 0, 39)',
    }
  ]

  return (
    <Layout>
      <h2 className="mb-4"> <span className="dsh_hedding">Hi, </span>{user && user.fullName}</h2>

      {
        user.role != 'translater' ? <>
          <div className="mb-3 dashboardFilters">
            <select className="form-control" value={filters.type} onChange={e => typeChange({ type: e.target.value })}>
              <option value="" disabled>Select Option</option>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
              <option value="year">Yearly</option>
            </select>

            <select
              className="form-control"
              value={filters.country}
              onChange={e => { typeChange({ country: e.target.value, state: '', city: '' }); getState(e.target.value) }}
              required
            >
              <option value="">Select Country</option>
              {countryModel.list.map(itm => {
                return <option value={itm.isoCode} key={itm.isoCode}>{itm.name}</option>
              })}
            </select>

            <select
              className="form-control"
              value={filters && filters.state}
              onChange={e => { typeChange({ state: e.target.value, city: '' }); getCity(e.target.value) }}
              required
            >
              <option value="">Select State</option>
              {states && states.map(itm => {
                return <option value={itm.isoCode} key={itm.isoCode}>{itm.name}</option>
              })}
            </select>

            <select
              className="form-control"
              value={filters && filters.city}
              onChange={e => { typeChange({ city: e.target.value }) }}
              required
            >
              <option value="">Select City</option>
              {cities && cities.map((itm, i) => {
                return <option value={itm.name} key={i}>{itm.name}</option>
              })}
            </select>

            {/* {tabs == 'user' || tabs == 'assessment' || tabs == 'whatsapp' ? <> */}
            <select
              className="form-control"
              value={filters && filters.riskLevel}
              onChange={e => { typeChange({ riskLevel: e.target.value }) }}
            >
              <option value="">Select Risk Level</option>
              <option value="Normal">Normal</option>
              <option value="Mild">Mild</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
              <option value="Extremely severe">Extremely severe</option>
            </select>

            <select
              className="form-control text-capitalize"
              value={filters && filters.assessmentType}
              onChange={e => { typeChange({ assessmentType: e.target.value }) }}
            >
              <option value="">Select Assessment Type</option>
              {assessmentTypes && assessmentTypes.map(itm => {
                return <option value={itm.id} key={itm.id}>{itm.name}</option>
              })}
            </select>

            <select
              className="form-control"
              value={filters && filters.age}
              onChange={e => { typeChange({ age: e.target.value }) }}
            >
              <option value="">Select Age Range</option>
              <option value="15-20">15-20</option>
              <option value="21-25">21-25</option>
              <option value="26-30">26-30</option>
              <option value="31-35">31-35</option>
              <option value="36-40">36-40</option>
              <option value="41-45">41-45</option>
              <option value="46-50">46-50</option>
              <option value="51">More than 51</option>
            </select>

            <select className="form-control" value={filters.gender} onChange={e => typeChange({ gender: e.target.value })}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {/* </> : <></>} */}

            <div className="datepicker">
              <DatePicker
                id="datePicker"
                className="form-control"
                selectsRange={true}
                startDate={filters.startDate}
                endDate={filters.endDate}
                onKeyDown={e => e.preventDefault()}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
              />

            </div>

            <div className="dropdown d-inline-block searchDropdown">
              <button className="form-control dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {healthName ? healthName : 'Health Clinic'}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <input type="text" placeholder="Search Name" value={healthText} onChange={e => searchHealth(e.target.value)} className="form-control searchText" />
                <a className={`dropdown-item ${'' == filters.healthClinic ? 'active' : ''} `} onClick={e => healthClick({ id: '', name: '' })}>All</a>
                <div className="list">
                  {healthClinic && healthClinic.map(itm => {
                    return <a className={`dropdown-item ${itm.id == filters.healthClinic ? 'active' : ''} `} onClick={e => healthClick(itm)} key={itm.id}>{itm.name}</a>
                  })}
                  {healthClinic && !healthClinic.length ? <div className="text-center">No Data</div> : <></>}
                </div>

              </div>
            </div>


          </div>
          <div className="table-responsive mb-3">
            <ul className="nav nav-tabs tabnoWrap">
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'user' ? 'active' : ''} `} onClick={e => setTab('user')}>Users</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'counsellor' ? 'active' : ''} `} onClick={e => setTab('counsellor')}>Counsellors</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'ca' ? 'active' : ''} `} onClick={e => setTab('ca')}>Clinic Admin</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'assessment' ? 'active' : ''} `} onClick={e => setTab('assessment')}>Assessment</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'whatsapp' ? 'active' : ''} `} onClick={e => setTab('whatsapp')}>Whatsapp Counselling</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'session' ? 'active' : ''} `} onClick={e => setTab('session')}>Consultation session</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'casenote' ? 'active' : ''} `} onClick={e => setTab('casenote')}>Case Notes</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'content' ? 'active' : ''} `} onClick={e => setTab('content')}>Content</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${tabs == 'dropoff' ? 'active' : ''} `} onClick={e => setTab('dropoff')}>Drop-off funnel</a>
              </li>
              {/* <li className="nav-item">
                <a className={`nav-link ${ tabs == 'analytics' ? 'active' : '' } `} onClick={e => setTab('analytics')}>Google Analytics</a>
              </li> */}
            </ul>
          </div>

          {tabs == 'analytics' ? <>
            <h4 className="mb-3 text-primary text-center">Google Analytics</h4>
            click this link <a target="_blank" href='https://analytics.google.com/analytics/web/#'>https://analytics.google.com/analytics/web</a>
          </> : <></>}

          {tabs == 'dropoff' ? <>
            <h4 className="mb-3 text-primary">Drop-off funnel</h4>
            <div className="row mb-4">
              <div className='col-md-12'>
                <div className="shadow p-3">
                  <div className='table-responsive scrollable-element'>
                    <article className='funnel'>
                      {funnel && funnel.map(itm => {
                        return <div className='funnelItem' key={itm.label}>
                          <h5>{itm.label}</h5>
                          <div className='progressbar'>
                            <div className='progressline' style={{ height: `${itm.percentage}% ` }}></div>
                          </div>
                          <div className='funnelBottom'>
                            <b className='percent'>{itm.percentage}%</b>
                            <span className='count'>{itm.y}</span>
                          </div>
                        </div>
                      })}
                    </article>
                  </div>
                </div>

              </div>
              {/* <div className="col-md-8 mb-4">
                <div className="shadow p-3">
                  <h5>B2MM Portal</h5>
                  <CanvasJSChart options={{
                    animationEnabled: true,
                    exportEnabled: false,
                    data: [{
                      type: "funnel",
                      reversed: false,
                      legendText: "{label}",
                      indexLabel: "{label} - {y}",
                      toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
                      indexLabelFontColor: "black",
                      dataPoints: [
                        ...funnel
                      ]
                    }]
                  }} />
                </div>
              </div> */}

            </div>
          </> : <></>}

          {tabs == 'content' ? <>
            <h4 className="mb-3 text-primary">Content</h4>
            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Number of Users</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    {/* {contentAnalytics.xLength} */}
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: contentAnalytics.xLength < 7 ? 1 : 0,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Content Categories',
                        valueFormatString: typFormate(),
                      },
                      axisY: {
                        suffix: "",
                        minimum: 0,
                        valueFormatString: "#0#"
                      },
                      toolTip: {
                        shared: true
                      },
                      legend: {
                        reversed: true,
                        verticalAlign: "top",
                        horizontalAlign: "center"
                      },
                      data: [...contentAnalytics.contentCategories]
                    }} />
                  </>}
                </div>

              </div>

            </div>
          </> : <></>}

          {tabs == 'session' ? <>
            <h4 className="mb-3 text-primary">Consultation session</h4>
            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Number of Users who book consultation session</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(consultationAnalytics.counsultationBookedByUser),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate(),
                      },
                      axisY: {
                        suffix: "",
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [...consultationAnalytics.counsultationBookedByUser]
                    }} />
                  </>}
                </div>

              </div>
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Number of Users</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        title: 'Number of consultation session booked',
                        // valueFormatString: typFormate(),
                        suffix: "",
                        interval: 1,
                        minimum: 0,
                        valueFormatString: "#0#"
                      },
                      axisY: {
                        suffix: "",
                        minimum: 0,
                        // interval: 1,
                        valueFormatString: "#0#"
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [...consultationAnalytics.totalBookedSession]
                    }} />
                  </>}
                </div>

              </div>
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Number of counsellors who have consultation session</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(consultationAnalytics.counsellorNumberCounsultation),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate(),
                      },
                      axisY: {
                        suffix: "",
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [...consultationAnalytics.counsellorNumberCounsultation]
                    }} />
                  </>}
                </div>

              </div>

            </div>
          </> : <></>}

          {tabs == 'user' ? <>
            <h4 className="mb-3 text-primary">Users</h4>
            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Total User Accounts created</h5>

                  {loader ? <div className='shine shineChart'></div> : <>
                    <CanvasJSChart options={{
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(createdUser),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate()
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      data: [
                        {
                          type: "line",
                          color: "#197D9F",
                          xValueFormatString: typFormate(),
                          yValueFormatString: "#,##0## Users",
                          dataPoints: createdUser
                        }
                      ]
                    }} />
                  </>}



                </div>

              </div>
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Total Active Users</h5>
                  {loader ? <div className='shine shineChart'></div> :
                    <CanvasJSChart options={{
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(activeUsers),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate()
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      data: [
                        {
                          type: "line",
                          color: "#197D9F",
                          xValueFormatString: typFormate(),
                          yValueFormatString: "#,##0.## Users",
                          dataPoints: activeUsers
                        }
                      ]
                    }} />}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Number of Users</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends array={userLegends} />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: userAnalytics.daysno < 7 ? 1 : 0,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        valueFormatString: typFormate(),
                        title: 'User Activities'
                      },
                      axisY: {
                        minimum: 0,
                        // interval: 1,
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [{
                        name: "View/Edit User Profile",
                        color: 'rgb(189, 195, 199)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...userAnalytics.viewOwnProfile]
                      },
                      {
                        name: "Assessment",
                        color: 'rgb(46, 204, 113)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...userAnalytics.userAssessment]
                      },
                      {
                        name: "Contents",
                        color: 'rgb(241, 196, 15)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...userAnalytics.contentCounts]
                      },
                      {
                        name: "Consultation Booking",
                        color: 'rgb(243, 156, 18)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...userAnalytics.counsultationByUser]
                      },
                      {
                        name: "Whatsapp Counselling",
                        color: 'rgb(231, 76, 60)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...userAnalytics.whatsappCounsellingCount]
                      }
                      ]
                    }} />
                  </>}
                </div>
              </div>
            </div>
          </> : <></>}

          {tabs == 'assessment' ? <>
            <h4 className="mb-3 text-primary">Assessment</h4>
            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Users who completed assessments</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: 0,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate(),
                      },
                      axisY: {
                        suffix: "",
                        valueFormatString: "#0#",
                        minimum: 0
                      },
                      toolTip: {
                        shared: true
                      },
                      showInLegend: false,
                      legend: {
                        dispay: false,
                        reversed: true,
                        verticalAlign: "top",
                        horizontalAlign: "center"
                      },
                      data: [...assessment]
                    }} />
                  </>}
                </div>

              </div>
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Users Aggregate Risk level by Assessment type</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      theme: "light2",
                      toolTip: {
                        shared: true
                      },
                      axisY: {
                        minimum: 0,
                      },
                      axisX: {
                        ...xAxis,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Assessment Type'
                      },
                      legend: {
                        reversed: true,
                        verticalAlign: "top",
                        horizontalAlign: "center"
                      },
                      data: [...allAssessmentType]
                    }} />
                  </>}
                </div>

              </div>

              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Number of Users</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      theme: "light2",
                      toolTip: {
                        shared: true
                      },
                      axisY: {
                        minimum: 0,
                      },
                      axisX: {
                        ...xAxis,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Users CTA at results page'
                      },
                      legend: {
                        reversed: true,
                        verticalAlign: "top",
                        horizontalAlign: "center"
                      },
                      data: [...allAssessment]
                    }} />
                  </>}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Number of Users</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        valueFormatString: typFormate(),
                        title: 'Time after user first created an account'
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      legend: {
                        // cursor: "pointer",
                        fontSize: 14,
                        itemclick: toggleDataSeries,
                        verticalAlign: "top",
                        horizontalAlign: "center"
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [
                        ...assessmentLevel
                      ]
                    }} />
                  </>}
                </div>
              </div>


            </div>
          </> : <></>}

          {tabs == 'whatsapp' ? <>
            <h4 className="mb-3 text-primary">Whatsapp Counselling</h4>
            <div className="row mb-4">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Users identity verification</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <div className='legends mb-2'>
                      <div><div className='color' style={{ backgroundColor: '#197d9f' }}></div> Verified</div>
                      <div><div className='color' style={{ backgroundColor: '#a10027' }}></div> Non-verified</div>
                    </div>
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      data: [{
                        type: "doughnut",
                        startAngle: 60,
                        //innerRadius: 60,
                        indexLabelFontSize: 17,
                        indexLabel: "{label} - #percent%",
                        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                        dataPoints: [
                          { y: userStatus.verified, label: "Verified", color: '#197d9f' },
                          { y: userStatus.nonVerified, label: "Non-verified", color: '#a10027' },
                        ]
                      }]
                    }}
                    /></>}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5 className='mb-2'>Click rate of ‘Reach out through Whatsapp' Button</h5>
                  {cousellorActivity.whatsappxlength}
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      theme: "light2", // "light1", "light2", "dark1", "dark2"
                      toolTip: {
                        shared: true
                      },
                      axisX: {
                        ...xAxis,
                        interval: cousellorActivity.whatsappxlength < 7 ? 1 : 0,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date'
                      },
                      axisY: {
                        minimum: 0,
                        valueFormatString: "#0#"
                      },
                      data: [...whatsappAnalitcs]
                    }} />
                  </>}
                </div>

              </div>
            </div>
          </> : <></>}

          {tabs == 'counsellor' ? <>
            <h4 className="mb-3 text-primary">Counsellors</h4>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Total Accounts created</h5>
                  {loader ? <div className='shine shineChart'></div> :
                    <CanvasJSChart options={{
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(createdCounsellor),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate(),
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      indexLabel: "{label1}",
                      data: [
                        {
                          type: "line",
                          color: "#197D9F",
                          xValueFormatString: typFormate(),
                          yValueFormatString: "#,##0.## Users",
                          dataPoints: createdCounsellor
                        }
                      ]
                    }} />}
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Total Active Counsellors</h5>
                  {loader ? <div className='shine shineChart'></div> :
                    <CanvasJSChart options={{
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(activeCounsellor),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate()
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      data: [
                        {
                          type: "line",
                          color: "#197D9F",
                          xValueFormatString: typFormate(),
                          yValueFormatString: "#,##0.## Users",
                          dataPoints: activeCounsellor
                        }
                      ]
                    }} />}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Number of Counsellors</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends array={counsellorLegends} />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: cousellorActivity.xlength < 7 ? 1 : 0,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        valueFormatString: typFormate(),
                        title: 'Counsellor Activities'
                      },
                      axisY: {
                        minimum: 0,
                        interval: cousellorActivity.ylength > 15 ? 0 : 1,
                        valueFormatString: "#0#"
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [{
                        name: "Reschedule Appointment",
                        color: 'rgb(189, 195, 199)',
                        type: "line",
                        yValueFormatString: "#0#",
                        dataPoints: [...cousellorActivity.counsellorResceduleAppointments]
                      },
                      {
                        name: "Cancel Appointment",
                        color: 'rgb(231, 76, 60)',
                        type: "line",
                        yValueFormatString: "#0#",
                        dataPoints: [...cousellorActivity.counsellorCancelledAppointments]
                      },
                      {
                        name: "Book Appointment For Users",
                        color: 'rgb(243, 156, 18)',
                        type: "line",
                        yValueFormatString: "#0#",
                        dataPoints: [...cousellorActivity.appointmentAddedByCounsellor]
                      },
                      {
                        name: "Edit Availabilities",
                        color: 'rgb(241, 196, 15)',
                        type: "line",
                        yValueFormatString: "#0#",
                        dataPoints: [...cousellorActivity.editScheduleCounsellor]
                      },
                      {
                        name: "Add Case Notes",
                        color: 'rgb(46, 204, 113)',
                        type: "line",
                        yValueFormatString: "#0#",
                        dataPoints: [...cousellorActivity.totalCaseNotesAnalytics]
                      },
                      {
                        name: "View/Edit User Profile",
                        color: 'rgb(25, 125, 159)',
                        type: "line",
                        yValueFormatString: "#0#",
                        dataPoints: [...cousellorActivity.viewUserByCounsellor]
                      },
                      {
                        name: "View/Edit Counsellor Profile",
                        color: 'rgb(161, 0, 39)',
                        type: "line",
                        yValueFormatString: "#0#",
                        dataPoints: [...cousellorActivity.viewCounsellorByCounsellor]
                      }
                      ]
                    }} />
                  </>}
                </div>
              </div>
            </div>
          </> : <></>}

          {tabs == 'ca' ? <>
            <h4 className="mb-3 text-primary">Clinic Admin</h4>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Total Accounts created</h5>
                  {loader ? <div className='shine shineChart'></div> :
                    <CanvasJSChart options={{
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(createdCA),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate()
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      data: [
                        {
                          type: "line",
                          color: "#197D9F",
                          xValueFormatString: typFormate(),
                          yValueFormatString: "#,##0.## Users",
                          dataPoints: createdCA
                        }
                      ]
                    }} />}
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Total Active Clinic Admin</h5>
                  {loader ? <div className='shine shineChart'></div> :
                    <CanvasJSChart options={{
                      theme: "light2",
                      animationEnabled: true,
                      exportEnabled: false,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(activeCA),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate()
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      data: [
                        {
                          type: "line",
                          color: "#197D9F",
                          xValueFormatString: typFormate(),
                          yValueFormatString: "#,##0.## Users",
                          dataPoints: activeCA
                        }
                      ]
                    }} />}
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Number of Clinic Admin</h5>
                  {/* {caActivity.xlength} */}
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends array={caLegends} />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: caActivity.xlength < 7 ? 1 : 0,
                        intervalType: filters.type == 'week' ? '' : 'day',
                        valueFormatString: typFormate(),
                        title: 'Clinic Admin Activities'
                      },
                      axisY: {
                        minimum: 0,
                        interval: 1,
                        valueFormatString: "#0#"
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [{
                        name: "Reschedule Appointment",
                        color: 'rgb(189, 195, 199)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...caActivity.caResceduleAppointments]
                      },
                      {
                        name: "Cancel Appointment",
                        color: 'rgb(231, 76, 60)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...caActivity.caCancelledAppointments]
                      },
                      {
                        name: "Book Appointment For Users",
                        color: 'rgb(243, 156, 18)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...caActivity.appointmentAddedByCa]
                      },
                      {
                        name: "Edit Availabilities",
                        color: 'rgb(241, 196, 15)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...caActivity.editScheduleCa]
                      },
                      {
                        name: "Add Case Notes",
                        color: 'rgb(46, 204, 113)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...cousellorActivity.totalCaseNotesAnalytics]
                      },
                      {
                        name: "View/Edit User Profile",
                        color: 'rgb(25, 125, 159)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...caActivity.viewUserByCa]
                      },
                      {
                        name: "View/Edit Counsellor Profile",
                        color: 'rgb(161, 0, 39)',
                        type: "line",
                        yValueFormatString: "#0##",
                        dataPoints: [...caActivity.viewCounsellorByCa]
                      }
                      ]
                    }} />
                  </>}
                </div>
              </div>

            </div>
          </> : <></>}

          {tabs == 'casenote' ? <>
            <h4 className="mb-3 text-primary">Case Notes</h4>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Case note added</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <LevelLegends type="casenote" />
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      axisX: {
                        ...xAxis,
                        interval: isInterval(caseNotes),
                        intervalType: filters.type == 'week' ? '' : 'day',
                        title: 'Date',
                        valueFormatString: typFormate(),
                      },
                      axisY: {
                        suffix: "",
                        valueFormatString: "#0#",
                        minimum: 0
                      },
                      toolTip: {
                        shared: true
                      },
                      data: [...caseNotes]
                    }} />
                  </>}
                </div>

              </div>
              <div className="col-md-6 mb-4">
                <div className="shadow p-3">
                  <h5>Type of Case note</h5>
                  {loader ? <div className='shine shineChart'></div> : <>
                    <div className='legends mb-2'>
                      <div><div className='color' style={{ backgroundColor: '#197d9f' }}></div> Clinical</div>
                      <div><div className='color' style={{ backgroundColor: '#a10027' }}></div> Non-clinical</div>
                    </div>
                    <CanvasJSChart options={{
                      animationEnabled: true,
                      data: [{
                        type: "doughnut",
                        startAngle: 60,
                        //innerRadius: 60,
                        indexLabelFontSize: 17,
                        indexLabel: "{label} - #percent%",
                        toolTipContent: "<b>{label}:</b> {y} (#percent%)",
                        dataPoints: [
                          { y: casenoteType.clinical, label: "Clinical", color: '#197d9f' },
                          { y: casenoteType.nonClinical, label: "Non-clinical", color: '#a10027' },
                        ]
                      }]
                    }}
                    />
                  </>}
                </div>
              </div>
            </div>
          </> : <></>}

        </> : <></>
      }

    </Layout >


  );
};

export default Dashboard;
