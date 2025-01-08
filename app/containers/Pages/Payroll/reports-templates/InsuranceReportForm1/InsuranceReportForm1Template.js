import {
    Box, Grid, Stack,  Typography
  } from '@mui/material';
  import PropTypes from 'prop-types';
  import React from 'react';
  import nationalInsuranceLogo from '../assets/national-social-insurance-logo.png';
  import lineImg from '../../../../../../public/images/lineImg.png';
  import style from '../../../../../styles/pagesStyle/Form1InsuranceSty.scss';
  import { format } from 'date-fns';
  
  function InsuranceReportForm1Template({data}) {
    // const { organizationId, organizationName } = props;

    console.log("data =", data);



    const dateFun = (date,type) => {
      
      let year = format(new Date(date), 'yyyy')
      let month = format(new Date(date), 'MM')
      let day = format(new Date(date), 'dd')
      let array 

      // reverse string before convert it into array
      year = year.split('').reverse().join('')
      month = month.split('').reverse().join('')
      day = day.split('').reverse().join('')

      if(type === "year")
      {
        array = year.split("");
      }
      else if(type === "month")
      {
        array = month.split("");
      }
      else if(type === "day")
      {
        array = day.split("");
      }
      

     return array
     
    }




    const convertStringNumFun = (num,maxLenght) => {


console.log("number =", num);


      let reverseString = num.split('').reverse().join('')

      console.log("reverseString =", reverseString);
      

      // const array = num.split("");
      const array = reverseString.split("");
      while (array.length < maxLenght) {
        array.push("");
      }

      return array.slice(0, maxLenght);
      
    }

    console.log("convertStringNumFun =",data && data.identityNumber ? convertStringNumFun(data.identityNumber) : "no data");
    console.log("convertStringNumFun =",data && data.socialInsuranceID ? convertStringNumFun(data.socialInsuranceID,9) : "no data");
    console.log("convertStringNum3Fun =",data && data.socialInsuranceID ? convertStringNumFun(data.socialInsuranceID,9).reverse() : "no data");
    



    const salaryFun = (num,type) => {

      let integerPart = Math.floor(num); // Get the integer part
      let fractionalPart = num - integerPart; // Get the fractional part

      // Convert the fractional part to an integer by multiplying by 100
      let fractionalAsInteger = Math.round(fractionalPart * 100); 

      console.log("integerPart =", integerPart);
      console.log("fractionalAsInteger =", fractionalAsInteger);

      if(type === "pound")
      {
        return convertStringNumFun(integerPart.toString(),5)
      }
      else if(type === "penny")
      {
        return convertStringNumFun(fractionalAsInteger.toString().padStart(2, '0'),2)
      }
      
    }


    console.log("salaryFun =",  salaryFun(123.454,"pound"));
    console.log("salaryFun2 =", salaryFun(123.466,"penny"));
    
  
    return (
      <>
        <Grid container justifyContent='center'>
          <Grid item xs={12}>
            <div className={style.mainContainer}>

            <Grid
              container
              justifyContent='space-between'
              sx={{
                borderBottom: '1.5px solid black',
                pb: 1,
                mb: 1,
                paddingTop:"0px"
              }}>

                <Grid item xs={4}>
                  <Typography fontWeight='bold' mb={1}>
                    الهيئة القومية للتأمين الاجتماعي
                  </Typography>

                  <Typography>
                    مكتب 
                    
                    &nbsp;
                    {data.insuOffice ? 
                      data.insuOffice
                    : 
                      "......................"
                    }
                    
                    </Typography>
                </Grid>
        
                <Grid item xs={3}>
                  <Box textAlign='center'>
                    <img
                      alt='الهيئة القومية للتأمين الاجتماعي'
                      src={nationalInsuranceLogo}
                      width={38}
                    />
                  </Box>
                </Grid>
        
                <Grid item xs={5} sx={{display:"flex", justifyContent:"end"}}>
                  <Typography >
                  نموذج رقم (١)
                  </Typography>
                </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography fontWeight='bold' textAlign='center' style={{fontSize:"15px", paddingBottom:"5px"}}>
                طلب أشتراك مؤمن عليه
              </Typography>
            </Grid>

            <table>
              <tbody>
              <tr className={style.row1Sty}>
                <td>
                  <span>الفئة :</span>
                </td>
                <td>
                    <div>
                      <div>
                          <div>١</div>
                      </div>

                      <div>
                          عاملين لدى الغير
                      </div>
                    </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div>
                      <div>
                          <div>٢</div>
                      </div>

                      <div>
                          <div>
                            أصحاب أعمال
                          </div>
                      </div>
                  </div>
                </td>
                <td>
                  <div></div>
                </td>
              </tr>
              <tr className={style.row2Sty}>
                <td></td>
                <td>
                  <div>
                        <div>
                            <div>٣</div>
                        </div>

                        <div>
                            <div>المصريين بالخارج</div>
                        </div>
                    </div>
                </td>
                <td>
                  <div></div>
                </td>
                <td>
                  <div>
                        <div>
                            <div>٤</div>
                        </div>

                        <div>
                            <div>عمالة غير منتظمة</div>
                        </div>
                    </div>
                </td>
                <td>
                  <div></div>
                </td>
              </tr>
            
              <tr className={style.row3Sty}>
                <td colSpan="4">
                  <div>
                    <span>
                      رقم المنشأة:
                    </span>

                    {data.orgnizationInsuranceNumber ? 
                    
                    convertStringNumFun(data.orgnizationInsuranceNumber,8).map((boxData,index)=>(
                         <div key={index}>{boxData}</div>
                    ))
                    :
                    <>
                      <div ></div>
                      <div ></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </>
                    }
                  </div>
                </td>
                <td colSpan="1">
                  <div></div>
                  <div></div>
                </td>
              </tr>
              <tr className={style.row4Sty}>
                <td colSpan="5">
                  <span>
                    اسم المنشأة: 
                    &nbsp;
                    {data.insuranceOrgnization ? 
                      data.insuranceOrgnization
                    : 
                     ".........................................................................................................................................................."
                    }
                  </span>
                </td>
              </tr>
              <tr className={style.row5Sty}>
                <td colSpan="5">
                  <div>
                    <hr/>
                    <span>
                        بيانات المؤمن عليه
                    </span>
                    <hr/>
                  </div>
                </td>
              </tr>
              <tr className={style.row6Sty}>
                <td colSpan="5">
                  <div>
                    <span>
                      الرقم التأميني:
                    </span>
                    {data.socialInsuranceID ? 
                    
                      convertStringNumFun(data.socialInsuranceID,9).map((boxData,index)=>(
                           <div key={index}>{boxData}</div>
                      )) 
                
                    : 
                    (  <>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </>  )
                  }
                  </div>
                </td>
              </tr>
              <tr className={style.row7Sty}>
                <td colSpan="5">
                  <div>
                    <span>
                      الرقم القومي:
                    </span>
                    {data.identityNumber ? 
                    
                      convertStringNumFun(data.identityNumber,14).map((boxData,index)=>(
                        // console.log("boxData =",  <div key={index}>{boxData}</div>),
                        
                          <div key={index}>{boxData}</div>
                      )) 
              
                  : 
                  (  <>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                  </>  )
                }
                  </div>
                </td>
              </tr>
              <tr className={style.row8Sty}>
                <td colSpan="5">
                  <span>
                    اسم المؤمن عليه: 
                    &nbsp;
                    {data.employeeName ? 
                      data.employeeName
                    : 
                      "..........................................."
                    }
                  </span>
                    &nbsp;
                    &nbsp;
                  <span>
                    الجنسية: 
                    &nbsp;
                    {data.nationality ? 
                      data.nationality
                    : 
                      "................................."
                    }
                  </span>
                </td>
              </tr>
              <tr className={style.row9Sty}>
                <td colSpan="5">
                  <span>
                    المؤهل: ................
                  </span>
                    &nbsp;
                    &nbsp;
                  <span>
                    كود المهنة: 
                  </span>
                   &nbsp;
                  <div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                      <img src={lineImg} alt="lineImg" />
                  <div>
                      <div></div>
                      <div></div>
                      <div></div>
                  </div>
                  <span>
                    المسمى: 
                    &nbsp;
                    {data.insuJobName ? 
                      data.insuJobName
                    : 
                     "................................."
                    }
                  </span>
                </td>
              </tr>
              <tr className={style.row10Sty}>
                <td colSpan="5">
                  <span>
                    تاريخ بدء الاشتراك: 
                  </span>
                  &nbsp;
                  <div>
                  {data.insuranceDate ? 
                      dateFun(data.insuranceDate,"day").map((boxData,index) => (
                        <div key={index}>{boxData}</div>
                      )) 
                    : 
                    <>
                      <div></div>
                      <div></div>
                    </>
                  }
                  </div>
                    <img src={lineImg} alt="lineImg"/>
                  <div>
                  {data.insuranceDate ? 
                      dateFun(data.insuranceDate,"month").map((boxData,index) => (
                        <div key={index}>{boxData}</div>
                      )) 
                    : 
                    <>
                      <div></div>
                      <div></div>
                      </>
                  }
                  </div>
                    <img src={lineImg} alt="lineImg" />
                  <div>
                      {/* <div></div>
                      <div></div>
                      <div></div>
                      <div></div> */}

                    {data.insuranceDate ? 
                      dateFun(data.insuranceDate,"year").map((boxData,index) => (
                        <div key={index}>{boxData}</div>
                      )) 
                    : 
                    <>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </>
                    }
                  </div>
                </td>
              </tr>
              <tr className={style.row11Sty}>
                <td colSpan="5">
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div>
                            نوع المدة
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div></div>
                            <div></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                      &nbsp;
                      &nbsp;
                      &nbsp;
                    <span>
                      المسمى: .................................
                    </span>
                      &nbsp;
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div>
                                كود الاشتراك
                            </div>
                          </td>
                        </tr>
                        <tr>
                        <td>
                            <div></div>
                            <div></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    &nbsp;
                    &nbsp;
                    <div>
                      <span>
                        المسمى: .............
                      </span>
                      <span>
                        القطاع: .............
                      </span>
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
              <tr className={style.row12Sty}>
                 <td colSpan="5">
                  <div>
                    <span>* أجر اساسي :</span>
                      &nbsp;
                      <table>
                          <tbody>
                            <tr>
                              <td>
                                <div>
                                    قرش
                                </div>
                              </td>
                              <td>
                                <div>
                                    جنيه
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div>
                                  {data.mainSalaryNew ? 
                                        salaryFun(data.mainSalaryNew,"penny").map((boxData,index) => (
                                          <div key={index}>{boxData}</div>
                                        )) 
                                      : 
                                      <>
                                        <div></div>
                                        <div></div>
                                      </>
                                    }
                                </div>
                              </td>
                              <td >
                                <div>
                                  {data.mainSalaryNew ? 
                                        salaryFun(data.mainSalaryNew,"pound").map((boxData,index) => (
                                          <div key={index}>{boxData}</div>
                                        )) 
                                      : 
                                      <>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                      </>
                                      }
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                          &nbsp;
                          &nbsp;

                        <span>*أجر /دخل الاشتراك :</span>
                         &nbsp;
                        <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div>
                                      قرش
                                  </div>
                                </td>
                                <td>
                                  <div>
                                      جنيه
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>
                                  {data.mainSalary ? 
                                      salaryFun(data.mainSalary,"penny").map((boxData,index) => (
                                        <div key={index}>{boxData}</div>
                                      )) 
                                    : 
                                    <>
                                      <div></div>
                                      <div></div>
                                    </>
                                  }
                                  </div>
                                </td>
                                <td>
                                  <div>
                                  {/* salaryFun(123.454,"pound")
                                  salaryFun(123.466,"penny") */}

                                    {data.mainSalary ? 
                                      salaryFun(data.mainSalary,"pound").map((boxData,index) => (
                                        <div key={index}>{boxData}</div>
                                      )) 
                                    : 
                                    <>
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                      <div></div>
                                    </>
                                    }
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                            &nbsp;
                            &nbsp;
                           <span>*الأجر الشامل :</span>
                            &nbsp;
                          <table>
                            <tbody>
                              <tr>
                                <td>
                                  <div>
                                      قرش
                                  </div>
                                </td>
                                <td>
                                  <div>
                                      جنيه
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div>
                                    {data.insGrossSalary ? 
                                        salaryFun(data.insGrossSalary,"penny").map((boxData,index) => (
                                          <div key={index}>{boxData}</div>
                                        )) 
                                      : 
                                      <>
                                        <div></div>
                                        <div></div>
                                      </>
                                    }
                                  </div>
                                </td>
                                <td>
                                  <div>
                                    {data.insGrossSalary ? 
                                        salaryFun(data.insGrossSalary,"pound").map((boxData,index) => (
                                          <div key={index}>{boxData}</div>
                                        )) 
                                      : 
                                      <>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                      </>
                                      }
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                    </div>
                </td>
              </tr>
              <tr className={style.row13Sty}>
                 <td colSpan="3">
                    <span>
                      (لحساب 7%وفقا لقانون العمل)
                    </span>
                 </td>
                 <td colSpan="2">
                    <span>
                      (لحساب اشتراك التأمين الصحي الشامل)
                    </span>
                 </td>
              </tr>
              <tr className={style.row14Sty}>
                <td colSpan="5">
                  <div>
                      <div>
                          صلة القرابة بصاحب العمل :
                      </div>
                      &nbsp;
                      <div></div>
                        &nbsp;
                        &nbsp;
                      <span>
                        .................................
                      </span>

                      <span>
                        *تستوفى للأقارب حتى الدرجة الثانية بالمنشآت الفردية.
                      </span>
                  </div>
                </td>
              </tr>
              <tr className={style.row15Sty}>
                  <td colSpan="5">
                    <span>
                        بيانات العجز إن وجدت:تاريخ بداية العجز:
                    </span>
                    <div>
                      <div></div>
                      <div></div>
                    </div>
                      <img src={lineImg} alt="lineImg" />
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                      <img src={lineImg} alt="lineImg"/>
                    <div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>

                  <span>
                    نسبة العجز:...............%
                  </span>
                </td>
            </tr>
            <tr className={style.row16Sty}>
              <td colSpan="5">
                <div>
                  <hr />
                  <span>
                      بيانات محل إقامة المؤمن عليه
                  </span>
                  <hr />
                </div>
              </td>
            </tr>
            <tr className={style.row17Sty}>
              <td colSpan="3">
                <div>
                  <span>
                    العنوان داخل مصر
                  </span>
                </div>
              </td>
              <td colSpan="2">
                <div>
                  <span>
                    العنوان خارج مصر
                  </span>
                </div>
              </td>
            </tr>
              <tr className={style.row18Sty}>
                <td colSpan="3">
                  <div>
                    <span>
                      عقار رقم :
                    </span>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </td>

                <td colSpan="2">
                  <div>
                    <span>
                        الدولة : .....................
                    </span>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>
              <tr className={style.row19Sty}>
                <td colSpan="3">
                  <div>
                    <span>
                      شياخة / قرية :
                    </span>
                    <div></div>
                    <div></div>
                  </div>
                </td>

                <td colSpan="2">
                  <div>
                    <span>
                        المدينة : ....................
                    </span>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>

              <tr className={style.row20Sty}>
                <td colSpan="3">
                  <div>
                    <span>
                      شارع / حارة : ..................................................................
                    </span>
                  </div>
                </td>

                <td colSpan="2">
                  <div>
                    <span>
                        جهة العمل : ..............................
                    </span>
                  </div>
                </td>
              </tr>

              <tr className={style.row21Sty}>
                <td colSpan="5">
                  <div>
                    <span>
                      قسم / مركز :
                    </span>
                    <div></div>
                    <div></div>
                      &nbsp;
                      &nbsp;
                      &nbsp;
                      &nbsp;
                    <span>
                        محافظة :
                    </span>
                    <div></div>
                    <div></div>
                  </div>
                </td>
              </tr>

              <tr className={style.row22Sty}>
                <td colSpan="3">
                  <div>
                    <span>
                      توقيع المؤمن عليه : ..............................................
                    </span>
                    
                  </div>
                </td>

                <td colSpan="2">
                  <div>
                    <span>
                        توقيع المدير المسؤل : ..........................
                    </span>
                    
                  </div>
                </td>
              </tr>

              <tr className={style.row23Sty}>
                <td colSpan="5">
                  <div>
                    <span>
                      رقم التليفون : ............................
                    </span>
                  </div>
                </td>
              </tr>

              <tr className={style.row24Sty}>
                <td colSpan="5">
                  <div>
                    <span>
                      البريد الإلكتروني : ............................
                    </span>
                  </div>
                </td>
              </tr>

              <tr className={style.row25Sty}>
                <td colSpan="5">
                  <div>
                    <span>
                      تحريرا في:  &nbsp; &nbsp; / &nbsp; / &nbsp; &nbsp;
                    </span>
                  </div>
                </td>
              </tr>

              <tr className={style.row26Sty}>
                <td colSpan="3"></td>

                <td colSpan="2">
                  <div>
                    <span>
                        تم مطابقة التوقيع بمعرفتي : ..........................
                    </span>
                  </div>
                </td>
              </tr>
              <tr className={style.row27Sty}>
                <td colSpan="5">
                  <table>
                    <thead>
                      <tr>
                        <th>
                            البيان
                        </th>
                        <th>
                          مستلم الطلب
                        </th>
                        <th>
                          المراجـــع
                        </th>
                        <th>
                            سجل آليا بمعرفة
                        </th>
                        <th>
                          روجـع آليا بمعرفة
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          الاســـم
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          التوقيــع
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          التاريــخ
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <span>
                    ملحوظة: على صاحب العمل والعامل الإطلاع على التوجيهات الموضحة خلف النموذج مع التوقيع على الإقرار.  (أنظر خلفه)
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
            </div>

            <div className={style.mainContainer2}>
              <p>
                   إرشـــــادات
              </p>
              <p>
              ١. 
                                على صاحب العمل بالقطاع الخاص آن يرسل هذا النموذج من أصل وصورتين بالنسبة لكل مــن العاملين
                  لديه مع طلب اشتراكه فى الهيئة لأول مرة وخلال أسبوعين على الاكثر من تاريخ التحاق أي عامل جديد
                  بالعمل لديه سواءً كان التحاقا نهائيا أو تحت الاختبار
                  .
              </p>
              <p>
                  ٢.
                                يرفق بالنموذج لدى اشتراك المؤمن عليه لأول مرة بالهيئة صورة شهادة الميلاد المميكنة وصورة بطاقة الرقم
                  القومي أو صورة جواز السغر يتـــم مطابقتها على الأصل بمعرفة الموظف المختص
                  .
              </p>
              <p>
                  ٣.
                  التوقيع على هذا النموذج بما يفيد الإطلاع والمواققة على جميع البيانات الواردة به ولا يجوز لمــــن وقع
                  عليه آن يعارض في تلك البيانات آمام الهيئة وله آن يلجاً إلى مكتب علاقات العمل المختص أو القضاء
                  .
              </p>
              <p>
                  ٤.
                  يستخدم هذا النموذج كطلب اشتراك في تأمين إصابات العمل فقط بالنسبة للغئات التالية:
              </p>
              <p>

              </p>
              <p>
                (أ) 
                 من تجاوز سن الشيخوخة وأوقف انتفاعه بتأمين الشيخوخة والعجز والوفاة.
              </p>
              <p>
                (ب)
                 العاملون الذين يخضعون لأحكام قانون العمل ممن تقل أعمارهم عن ١٨ سنة.
              </p>
              <p>
                (ج)
                  العاملون المتدرجون والتلاميذ الصناعيون والطلاب المشتغلون في مشروعات التشغيل الصيفي والخدمة 
                  العامة، ويشترط أعتمادالنموذج المحرر لهم من المدير المسئول بالهيئة التي تشرفعلى التلمذة الصناعية،
                  والتدريب مع ختمها بخاتم هذه الجهة مع إرفاق نسخة من عقد عمل المتدرب أو المستند المثبت لنوع
                  العمل فى جميع هذه الحالات.
              </p>
              <p>
                (د)
                   يقتصر استيفاء الأجر على الفئات التي يتقاضى فيها المؤمن عليه أجرا من صاحب العمل.
              </p>
              <p>
                  إقــــــــرار
              </p>
              <div>
                  <span>
                    اسم المنشأة: 
                    &nbsp;
                    {data.insuranceOrgnization ? 
                      data.insuranceOrgnization
                    : 
                      "........................................................................................................................"
                    }
                  </span>
                    &nbsp;
                  <span>
                    رقمها التأميني: 
                    &nbsp;
                    {data.orgnizationInsuranceNumber ? 
                      data.orgnizationInsuranceNumber
                    : 
                     "..........................................."
                    }
                  </span>
              </div>
              <div>
                  <span>
                    العنــوان: 
                    &nbsp;
                    {data.insuranceOrgnizationAddress ? 
                      data.insuranceOrgnizationAddress
                    : 
                       "....................................................................................................................................................................................................."
                    }
                  </span>
              </div>
              <p>
              أقر أنا الموقع علــى هـذا النمـوذج بــالالتزام بعرض المـؤمن عليـه علـى اللجنـة الطبيـة المختصـة بالهيئـة
              المعنيةبالتأمين الصحى أو الجهة الطبية المختصة لإجراء الفحص الطبي الأولى وإثبات حالته الصحية وقت
              توقيع الكشف الطبي مع الالتزام بموافاة مكتب الهيئة التابع له المشأة بتقرير اللياقة الطبية الصادر من الجهة
              الطبية المختصة عن حالته الصحية خلالأسبوعين على الأكثر من تاريخ التحاقه بالعمل تطبيقالأحكام قانون
              العمل.
              </p>
              <p>
                توقيع (صاحب العمل / المدير المسئول)
              </p>
              <p>
                (&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;)
              </p>
              <p>
              ١ ـ 
              أقر أنا 
              &nbsp;
              {data.employeeName ? 
                      data.employeeName
                    : 
                      "......................................................."
                    }
                &nbsp;
              العامل بالمنشأة عاليه بأن أثبت حالتي الصحية أمام
                            اللجنة الطبية المختصة بالهيئة المعنية بالتأمين الصحي أو الجهة الطبية المختصة وموافاة مكتب الهيئة
              التابع له المنشـــأة بالتقرير الطبي عن حالتي الصحية خلال أسبوعين من تاريخ التحاقي بالعمل وفي حالة
              عـدم قيامي بذالك فـإن الهيئة القومية للتأمين الاجتماعي ليس عليها آدنــى التزام قانونــي بصرف أيـة 
              مستحقات تأمينية تترتب على العجز أيا كان نوعه السابق أو المعاصر لتاريخ الالتحاق بالعمل
             .
              </p>
              <p>
                  توقيع المؤمن عليه
              </p>
              <p>
                (&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;)
              </p>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
  
  
  export default InsuranceReportForm1Template;
  