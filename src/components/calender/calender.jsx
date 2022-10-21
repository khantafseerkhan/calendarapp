import { JsonCalendar } from "json-calendar";
import { useEffect, useState } from "react";
import "./style.css";

export const Calender = (props) => {

  

    let [calendar, setCalendar] = useState(new JsonCalendar({
        options: { showToday: true }
    }));

    let monthsNames = calendar.monthNames;

    let [headDays, setHeadDays] = useState([]);
    let [dateCounter, setDateCounter] = useState(0);
    let [currentData, setCurrentData] = useState({
        year: calendar.options.year,
        month: monthsNames[calendar.options.monthIndex],
        startDate:calendar.today,
        endDate: calendar.today,
        startId:"",
        endId:""
    });


  


    useEffect(() => {
        console.log("child component" + typeof calendar)
        console.log(calendar.weeks)
        setHeadDays(calendar.dayNames)
       // let temp={...currentData};
        //temp.startDate
       // temp.endDate
       // temp.month=monthsNames[calendar.options.monthIndex]
       // temp.year=[calendar.options.year]
       // setCurrentData(temp)
       // getvalue();


    }, [currentData]);




    const handleClick = (type, index) => {
        console.log(index)
        console.log("here is    " + monthsNames[index + 1])
        if (type === 'next') {
            let currentdata = { ...currentData };
            currentdata.month = monthsNames[index + 1];
            setCurrentData(currentdata)
            console.log(currentData.month)
            let test = calendar;
           
            test.changeMonth(2022, index + 1)

          
            // console.log(test.options.)

         
            setCalendar(test)
        } else if (type === 'pre') {
            let currentdata = { ...currentData };

            currentdata.month = monthsNames[index - 1];
            setCurrentData(currentdata)

            let test = calendar;
            test.changeMonth(2022, index - 1)



            setCalendar(test)

        }

    }

    const getvalue = () => {
        console.log(calendar.weeks.map(w => w.map(d => d.day)))

    }


    const selectDate = (inputdate) => {
        console.log(inputdate)
        if (dateCounter < 2) {

            if (dateCounter == 0) {
                let temp = { ...currentData }
                temp.startDate = inputdate.date;
                temp.startId=inputdate.id
                setCurrentData(temp)
            } else {
                let temp = { ...currentData }
                temp.endDate = inputdate.date;
                temp.endId=inputdate.id

                setCurrentData(temp)

            }
            setDateCounter(dateCounter + 1)


        } else {

            let temp = { ...currentData }
            temp.startDate = inputdate.date;
            temp.startId=inputdate.id

            setCurrentData(temp)
            setDateCounter(1)
        }





    }


    return (
        <div style={{margin:"10px 100px 0px 100px"}}>


            <div className="month">
                <ul>
                    
                    {
                        calendar.options.monthIndex>0 && (
<li className="prev" onClick={() => handleClick('pre', calendar.options.monthIndex)}> &#10094;</li>
                        )
                    }
                    
                    
                 {   calendar.options.monthIndex<11  && (
                      
<li className="next" onClick={() => handleClick('next', calendar.options.monthIndex)}>&#10095;</li>

                        )
                    }
                    
                    <li>

                        {currentData.month}<br />
                        <span style={{ fontSize: '18px' }}>{currentData.year}</span>
                    </li>
                </ul>
            </div>

            <ul className="weekdays">
                {
                    headDays.map(element => {
                        return (<li >{element.abbr}</li>)
                    })
                }
            </ul>

            <ul className="days">


                {calendar && (calendar.weeks.slice(Math.max(calendar.weeks.length - 6, 0)).
                    map(w => {
                        return (
                            w.map(d => {
                                return (
                                    <li onClick={(e) => selectDate(d)}  
                                    className={d.id==currentData.startId?'active':
                                    (d.id==currentData.endId?'active':'')
                                    
                                    
                                
                                }
                                    >{d.day}</li>

                                )
                            })
                        )
                    }))

                }

            </ul>


            <div style={{margin:"15px 0px 0px 0px"}}>

                <table className="table">
                    <tr>
                        <td>Year</td>
                        <td>{currentData.year}</td>
                    </tr>
                    <tr>
                        <td>Month</td>
                        <td>{currentData.month}</td>
                    </tr>
                    <tr>

                        <td>Start Date</td>
                        <td>{currentData.startDate.toString()}</td>
                    </tr>
                    <tr>

                        <td>End Date</td>
                        <td>{currentData.endDate.toString()}</td>


                    </tr>

                </table>


            </div>
        </div>
    )
}