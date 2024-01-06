import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import EmployeeData from '../../Component/EmployeeData';
import PayRollLoader from '../../Component/PayRollLoader';
import GeneralListApis from '../../api/GeneralListApis';
import payrollMessages from '../../messages';
import api from '../api/PaymentSlipData';
import PaymentReportItem from '../components/PaymentSlip/PaymentReportItem';
import messages from '../messages';

// TODO
// 1. find why arabic styles not apply
// 2. why api not has all fields like job title

const dummy = [
  {
    allownace: [
      {
        elementId: 125,
        elementName: 'Topicshots',
        elemVal: 902.7,
        elemValCalc: 826.8,
      },
      {
        elementId: 675,
        elementName: 'Flipstorm',
        elemVal: 210.9,
        elemValCalc: 177.9,
      },
    ],
    deductions: [
      {
        elementId: 645,
        elementName: 'Tanoodle',
        elemVal: 689.7,
        elemValCalc: 639.7,
      },
      {
        elementId: 873,
        elementName: 'Meevee',
        elemVal: 723.7,
        elemValCalc: 646.2,
      },
      {
        elementId: 970,
        elementName: 'Skyndu',
        elemVal: 941.6,
        elemValCalc: 925.6,
      },
      {
        elementId: 526,
        elementName: 'Jetwire',
        elemVal: 343.0,
        elemValCalc: 21.9,
      },
      {
        elementId: 730,
        elementName: 'Rhybox',
        elemVal: 749.6,
        elemValCalc: 339.7,
      },
    ],
    refElements: [
      {
        elementId: 288,
        elementName: 'Bubbletube',
        elemVal: 498.8,
        elemValCalc: 259.5,
      },
      {
        elementId: 10,
        elementName: 'Dynazzy',
        elemVal: 273.3,
        elemValCalc: 325.4,
      },
    ],
    employeeId: 771,
    employeeName: 'Wendall Alvarado',
    organizationId: 814,
    organizationName: 'Yoveo',
    templateId: 556,
    templateName: 'Nalchik Airport',
    currenyId: 'Wordify',
    currenyName: 'Tazz',
    monthId: 677,
    monthName: 'Tekfly',
    yearId: 506,
    yearName: 'Bubblebox',
    notes: 'Brainbox',
    totalAllownace: 345.8,
    totalDeduction: 487.6,
    net: 25.5,
  },
  {
    allownace: [
      {
        elementId: 838,
        elementName: 'Skalith',
        elemVal: 954.2,
        elemValCalc: 419.4,
      },
      {
        elementId: 269,
        elementName: 'Zooveo',
        elemVal: 437.3,
        elemValCalc: 695.1,
      },
      {
        elementId: 44,
        elementName: 'Realbuzz',
        elemVal: 766.4,
        elemValCalc: 437.6,
      },
      {
        elementId: 447,
        elementName: 'Kazu',
        elemVal: 210.6,
        elemValCalc: 690.0,
      },
      {
        elementId: 532,
        elementName: 'Jabberbean',
        elemVal: 344.4,
        elemValCalc: 887.5,
      },
    ],
    deductions: [
      {
        elementId: 248,
        elementName: 'Demivee',
        elemVal: 15.4,
        elemValCalc: 145.9,
      },
      {
        elementId: 666,
        elementName: 'Oyoloo',
        elemVal: 994.3,
        elemValCalc: 809.7,
      },
      {
        elementId: 786,
        elementName: 'Kanoodle',
        elemVal: 164.8,
        elemValCalc: 165.6,
      },
    ],
    refElements: [
      {
        elementId: 308,
        elementName: 'Gabtune',
        elemVal: 432.3,
        elemValCalc: 13.5,
      },
      {
        elementId: 919,
        elementName: 'Zoomzone',
        elemVal: 475.4,
        elemValCalc: 989.7,
      },
      {
        elementId: 375,
        elementName: 'Plajo',
        elemVal: 730.9,
        elemValCalc: 54.3,
      },
      {
        elementId: 926,
        elementName: 'Linkbridge',
        elemVal: 622.1,
        elemValCalc: 601.2,
      },
      {
        elementId: 544,
        elementName: 'Mymm',
        elemVal: 198.4,
        elemValCalc: 470.6,
      },
    ],
    employeeId: 657,
    employeeName: 'Joan Chesher',
    organizationId: 620,
    organizationName: 'Zoonder',
    templateId: 823,
    templateName: 'Captain Jack Thomas El Dorado Airport',
    currenyId: 'Oyoloo',
    currenyName: 'Kayveo',
    monthId: 938,
    monthName: 'Twiyo',
    yearId: 689,
    yearName: 'Babbleopia',
    notes: 'Meedoo',
    totalAllownace: 79.6,
    totalDeduction: 44.4,
    net: 656.1,
  },
  {
    allownace: [
      {
        elementId: 521,
        elementName: 'Topdrive',
        elemVal: 813.5,
        elemValCalc: 126.5,
      },
      {
        elementId: 200,
        elementName: 'Browsezoom',
        elemVal: 494.1,
        elemValCalc: 49.4,
      },
    ],
    deductions: [
      {
        elementId: 416,
        elementName: 'Vidoo',
        elemVal: 53.8,
        elemValCalc: 609.9,
      },
      {
        elementId: 626,
        elementName: 'Meembee',
        elemVal: 176.3,
        elemValCalc: 290.8,
      },
    ],
    refElements: [
      {
        elementId: 901,
        elementName: 'Realcube',
        elemVal: 829.1,
        elemValCalc: 80.1,
      },
      {
        elementId: 783,
        elementName: 'Rooxo',
        elemVal: 964.2,
        elemValCalc: 192.0,
      },
      {
        elementId: 716,
        elementName: 'Jatri',
        elemVal: 257.3,
        elemValCalc: 229.2,
      },
      {
        elementId: 591,
        elementName: 'Gabspot',
        elemVal: 932.6,
        elemValCalc: 963.4,
      },
      {
        elementId: 638,
        elementName: 'Jaloo',
        elemVal: 607.4,
        elemValCalc: 867.7,
      },
    ],
    employeeId: 120,
    employeeName: 'Guinna Swidenbank',
    organizationId: 40,
    organizationName: 'Mymm',
    templateId: 635,
    templateName: 'Prešov Air Base',
    currenyId: 'Voonyx',
    currenyName: 'Centidel',
    monthId: 703,
    monthName: 'Skibox',
    yearId: 444,
    yearName: 'Thoughtblab',
    notes: 'Brightbean',
    totalAllownace: 851.3,
    totalDeduction: 798.4,
    net: 485.3,
  },
  {
    allownace: [
      {
        elementId: 140,
        elementName: 'Thoughtsphere',
        elemVal: 424.7,
        elemValCalc: 224.6,
      },
      {
        elementId: 766,
        elementName: 'Rhyloo',
        elemVal: 928.3,
        elemValCalc: 161.2,
      },
      {
        elementId: 36,
        elementName: 'Jaxworks',
        elemVal: 229.6,
        elemValCalc: 252.8,
      },
      {
        elementId: 86,
        elementName: 'Eabox',
        elemVal: 760.0,
        elemValCalc: 241.1,
      },
    ],
    deductions: [
      {
        elementId: 956,
        elementName: 'Jaxnation',
        elemVal: 703.4,
        elemValCalc: 831.4,
      },
      {
        elementId: 154,
        elementName: 'Mynte',
        elemVal: 507.7,
        elemValCalc: 522.8,
      },
    ],
    refElements: [
      {
        elementId: 936,
        elementName: 'Flashspan',
        elemVal: 230.3,
        elemValCalc: 686.7,
      },
      {
        elementId: 838,
        elementName: 'Linkbridge',
        elemVal: 184.2,
        elemValCalc: 219.4,
      },
      {
        elementId: 951,
        elementName: 'Skippad',
        elemVal: 716.6,
        elemValCalc: 951.6,
      },
      {
        elementId: 515,
        elementName: 'Wikido',
        elemVal: 565.2,
        elemValCalc: 850.8,
      },
      {
        elementId: 396,
        elementName: 'Centidel',
        elemVal: 697.2,
        elemValCalc: 814.2,
      },
    ],
    employeeId: 982,
    employeeName: 'Sheila Dumblton',
    organizationId: 719,
    organizationName: 'Topicblab',
    templateId: 759,
    templateName: 'Yining Airport',
    currenyId: 'Browsecat',
    currenyName: 'Edgeify',
    monthId: 562,
    monthName: 'Topicshots',
    yearId: 463,
    yearName: 'Eidel',
    notes: 'Shufflester',
    totalAllownace: 299.1,
    totalDeduction: 311.4,
    net: 581.7,
  },
  {
    allownace: [
      {
        elementId: 172,
        elementName: 'Skinix',
        elemVal: 838.9,
        elemValCalc: 404.6,
      },
      {
        elementId: 184,
        elementName: 'Fanoodle',
        elemVal: 164.6,
        elemValCalc: 622.9,
      },
    ],
    deductions: [
      {
        elementId: 440,
        elementName: 'Jabbercube',
        elemVal: 796.5,
        elemValCalc: 206.0,
      },
      {
        elementId: 132,
        elementName: 'Twinder',
        elemVal: 159.0,
        elemValCalc: 544.6,
      },
      {
        elementId: 822,
        elementName: 'Browsedrive',
        elemVal: 273.3,
        elemValCalc: 706.5,
      },
    ],
    refElements: [
      {
        elementId: 608,
        elementName: 'Yakijo',
        elemVal: 429.4,
        elemValCalc: 810.8,
      },
      {
        elementId: 678,
        elementName: 'Tekfly',
        elemVal: 394.9,
        elemValCalc: 579.3,
      },
      {
        elementId: 678,
        elementName: 'Devcast',
        elemVal: 136.1,
        elemValCalc: 437.1,
      },
      {
        elementId: 818,
        elementName: 'Flashspan',
        elemVal: 769.9,
        elemValCalc: 111.1,
      },
    ],
    employeeId: 734,
    employeeName: 'Bibby Tait',
    organizationId: 269,
    organizationName: 'Mynte',
    templateId: 253,
    templateName: 'Tucumcari Municipal Airport',
    currenyId: 'Agivu',
    currenyName: 'Plambee',
    monthId: 732,
    monthName: 'Twitterwire',
    yearId: 812,
    yearName: 'Zoomzone',
    notes: 'Avaveo',
    totalAllownace: 319.3,
    totalDeduction: 267.0,
    net: 880.0,
  },
  {
    allownace: [
      {
        elementId: 352,
        elementName: 'Bluejam',
        elemVal: 778.1,
        elemValCalc: 316.4,
      },
      {
        elementId: 761,
        elementName: 'Zoonder',
        elemVal: 323.5,
        elemValCalc: 821.2,
      },
      {
        elementId: 912,
        elementName: 'Feedmix',
        elemVal: 576.2,
        elemValCalc: 311.8,
      },
    ],
    deductions: [
      {
        elementId: 790,
        elementName: 'Jabbertype',
        elemVal: 896.4,
        elemValCalc: 872.1,
      },
      {
        elementId: 816,
        elementName: 'Yombu',
        elemVal: 553.7,
        elemValCalc: 258.4,
      },
      {
        elementId: 430,
        elementName: 'Yakijo',
        elemVal: 765.2,
        elemValCalc: 723.1,
      },
      {
        elementId: 506,
        elementName: 'Tagopia',
        elemVal: 465.1,
        elemValCalc: 530.3,
      },
    ],
    refElements: [
      {
        elementId: 136,
        elementName: 'Youfeed',
        elemVal: 645.7,
        elemValCalc: 529.5,
      },
      {
        elementId: 767,
        elementName: 'Gigabox',
        elemVal: 99.1,
        elemValCalc: 108.5,
      },
    ],
    employeeId: 378,
    employeeName: 'Odelia Bardnam',
    organizationId: 434,
    organizationName: 'Leenti',
    templateId: 601,
    templateName: 'Mount Pleasant Municipal Airport',
    currenyId: 'Chatterbridge',
    currenyName: 'Gabcube',
    monthId: 592,
    monthName: 'Gabvine',
    yearId: 635,
    yearName: 'Vipe',
    notes: 'Divape',
    totalAllownace: 537.3,
    totalDeduction: 178.8,
    net: 479.3,
  },
  {
    allownace: [
      {
        elementId: 248,
        elementName: 'Topicshots',
        elemVal: 686.4,
        elemValCalc: 167.1,
      },
      {
        elementId: 540,
        elementName: 'Voolith',
        elemVal: 64.0,
        elemValCalc: 349.0,
      },
      {
        elementId: 987,
        elementName: 'Devbug',
        elemVal: 804.0,
        elemValCalc: 777.8,
      },
      {
        elementId: 130,
        elementName: 'Oyonder',
        elemVal: 971.2,
        elemValCalc: 536.9,
      },
      {
        elementId: 309,
        elementName: 'Gigazoom',
        elemVal: 350.7,
        elemValCalc: 217.1,
      },
    ],
    deductions: [
      {
        elementId: 629,
        elementName: 'Linklinks',
        elemVal: 933.3,
        elemValCalc: 310.5,
      },
      {
        elementId: 987,
        elementName: 'Meemm',
        elemVal: 767.7,
        elemValCalc: 234.5,
      },
      {
        elementId: 794,
        elementName: 'Camido',
        elemVal: 151.1,
        elemValCalc: 848.7,
      },
      {
        elementId: 297,
        elementName: 'DabZ',
        elemVal: 226.8,
        elemValCalc: 952.5,
      },
      {
        elementId: 879,
        elementName: 'Youfeed',
        elemVal: 236.4,
        elemValCalc: 404.9,
      },
    ],
    refElements: [
      {
        elementId: 681,
        elementName: 'Photojam',
        elemVal: 495.8,
        elemValCalc: 560.9,
      },
      {
        elementId: 580,
        elementName: 'Lazzy',
        elemVal: 529.6,
        elemValCalc: 105.8,
      },
      {
        elementId: 341,
        elementName: 'Midel',
        elemVal: 671.6,
        elemValCalc: 146.6,
      },
    ],
    employeeId: 352,
    employeeName: 'Rosy Trayes',
    organizationId: 751,
    organizationName: 'Devify',
    templateId: 340,
    templateName: 'Sandspit Airport',
    currenyId: 'Yamia',
    currenyName: 'Buzzster',
    monthId: 897,
    monthName: 'Edgeblab',
    yearId: 541,
    yearName: 'Oyonder',
    notes: 'Kare',
    totalAllownace: 837.3,
    totalDeduction: 853.5,
    net: 970.9,
  },
  {
    allownace: [
      {
        elementId: 897,
        elementName: 'Babbleset',
        elemVal: 709.5,
        elemValCalc: 883.4,
      },
      {
        elementId: 297,
        elementName: 'Dabfeed',
        elemVal: 851.9,
        elemValCalc: 916.4,
      },
      {
        elementId: 89,
        elementName: 'Fiveclub',
        elemVal: 839.3,
        elemValCalc: 55.9,
      },
    ],
    deductions: [
      {
        elementId: 233,
        elementName: 'Youopia',
        elemVal: 354.6,
        elemValCalc: 197.9,
      },
      {
        elementId: 432,
        elementName: 'Linkbuzz',
        elemVal: 361.4,
        elemValCalc: 267.5,
      },
    ],
    refElements: [
      {
        elementId: 322,
        elementName: 'Twitterlist',
        elemVal: 98.0,
        elemValCalc: 550.5,
      },
      {
        elementId: 921,
        elementName: 'Twitterlist',
        elemVal: 144.0,
        elemValCalc: 662.1,
      },
      {
        elementId: 738,
        elementName: 'Dynabox',
        elemVal: 447.5,
        elemValCalc: 945.3,
      },
      {
        elementId: 850,
        elementName: 'Quimba',
        elemVal: 337.9,
        elemValCalc: 473.2,
      },
    ],
    employeeId: 507,
    employeeName: 'Petronia Hurdis',
    organizationId: 884,
    organizationName: 'Dynazzy',
    templateId: 990,
    templateName: 'Tau Airport',
    currenyId: 'Oyondu',
    currenyName: 'Omba',
    monthId: 519,
    monthName: 'Thoughtsphere',
    yearId: 338,
    yearName: 'Skippad',
    notes: 'Muxo',
    totalAllownace: 19.9,
    totalDeduction: 384.7,
    net: 200.3,
  },
  {
    allownace: [
      {
        elementId: 455,
        elementName: 'Mita',
        elemVal: 298.8,
        elemValCalc: 359.9,
      },
      {
        elementId: 337,
        elementName: 'Yadel',
        elemVal: 989.0,
        elemValCalc: 314.5,
      },
      {
        elementId: 487,
        elementName: 'Livetube',
        elemVal: 727.0,
        elemValCalc: 778.4,
      },
      {
        elementId: 708,
        elementName: 'Digitube',
        elemVal: 790.0,
        elemValCalc: 902.8,
      },
    ],
    deductions: [
      {
        elementId: 432,
        elementName: 'Edgepulse',
        elemVal: 167.8,
        elemValCalc: 490.7,
      },
      {
        elementId: 619,
        elementName: 'Edgeify',
        elemVal: 593.7,
        elemValCalc: 708.1,
      },
      {
        elementId: 742,
        elementName: 'Yabox',
        elemVal: 587.0,
        elemValCalc: 812.1,
      },
    ],
    refElements: [
      {
        elementId: 307,
        elementName: 'Jabberstorm',
        elemVal: 726.6,
        elemValCalc: 936.9,
      },
      {
        elementId: 790,
        elementName: 'Skibox',
        elemVal: 899.9,
        elemValCalc: 82.2,
      },
      {
        elementId: 824,
        elementName: 'Reallinks',
        elemVal: 103.6,
        elemValCalc: 384.6,
      },
      {
        elementId: 369,
        elementName: 'Realbridge',
        elemVal: 619.8,
        elemValCalc: 707.9,
      },
      {
        elementId: 348,
        elementName: 'Centidel',
        elemVal: 360.1,
        elemValCalc: 345.0,
      },
    ],
    employeeId: 121,
    employeeName: 'Jacky Hamsson',
    organizationId: 108,
    organizationName: 'JumpXS',
    templateId: 827,
    templateName: 'Nzérékoré Airport',
    currenyId: 'Skyndu',
    currenyName: 'Camido',
    monthId: 376,
    monthName: 'Jabberbean',
    yearId: 588,
    yearName: 'Kwideo',
    notes: 'Zoomcast',
    totalAllownace: 202.9,
    totalDeduction: 417.9,
    net: 506.3,
  },
  {
    allownace: [
      {
        elementId: 988,
        elementName: 'Eayo',
        elemVal: 761.8,
        elemValCalc: 795.5,
      },
      {
        elementId: 318,
        elementName: 'Wordify',
        elemVal: 845.5,
        elemValCalc: 501.2,
      },
      {
        elementId: 641,
        elementName: 'Kwimbee',
        elemVal: 508.3,
        elemValCalc: 111.8,
      },
    ],
    deductions: [
      {
        elementId: 73,
        elementName: 'Tagcat',
        elemVal: 438.9,
        elemValCalc: 466.8,
      },
      {
        elementId: 918,
        elementName: 'Skipfire',
        elemVal: 594.0,
        elemValCalc: 880.1,
      },
      {
        elementId: 428,
        elementName: 'Feedfire',
        elemVal: 172.9,
        elemValCalc: 524.0,
      },
    ],
    refElements: [
      {
        elementId: 529,
        elementName: 'Yata',
        elemVal: 730.1,
        elemValCalc: 844.0,
      },
      {
        elementId: 543,
        elementName: 'Tazz',
        elemVal: 413.7,
        elemValCalc: 299.1,
      },
      {
        elementId: 840,
        elementName: 'Flashdog',
        elemVal: 176.3,
        elemValCalc: 366.0,
      },
      {
        elementId: 179,
        elementName: 'Skimia',
        elemVal: 838.2,
        elemValCalc: 406.7,
      },
      {
        elementId: 819,
        elementName: 'Yambee',
        elemVal: 782.0,
        elemValCalc: 382.6,
      },
    ],
    employeeId: 844,
    employeeName: 'Irv McBlain',
    organizationId: 694,
    organizationName: 'Muxo',
    templateId: 961,
    templateName: 'Kenora Airport',
    currenyId: 'Devpulse',
    currenyName: 'Zazio',
    monthId: 625,
    monthName: 'Talane',
    yearId: 612,
    yearName: 'LiveZ',
    notes: 'Tagchat',
    totalAllownace: 289.1,
    totalDeduction: 524.0,
    net: 292.6,
  },
  {
    allownace: [
      {
        elementId: 951,
        elementName: 'Vipe',
        elemVal: 812.1,
        elemValCalc: 793.5,
      },
      {
        elementId: 75,
        elementName: 'Zava',
        elemVal: 50.7,
        elemValCalc: 970.6,
      },
    ],
    deductions: [
      {
        elementId: 756,
        elementName: 'Bluejam',
        elemVal: 303.9,
        elemValCalc: 493.8,
      },
      {
        elementId: 82,
        elementName: 'Feedfish',
        elemVal: 147.5,
        elemValCalc: 740.9,
      },
      {
        elementId: 87,
        elementName: 'Feednation',
        elemVal: 177.8,
        elemValCalc: 801.0,
      },
    ],
    refElements: [
      {
        elementId: 473,
        elementName: 'Fivebridge',
        elemVal: 413.3,
        elemValCalc: 22.0,
      },
      {
        elementId: 203,
        elementName: 'Teklist',
        elemVal: 594.6,
        elemValCalc: 864.5,
      },
      {
        elementId: 486,
        elementName: 'Miboo',
        elemVal: 490.4,
        elemValCalc: 691.2,
      },
      {
        elementId: 288,
        elementName: 'Thoughtstorm',
        elemVal: 880.5,
        elemValCalc: 322.6,
      },
    ],
    employeeId: 77,
    employeeName: 'Melvin Shapland',
    organizationId: 389,
    organizationName: 'Jaxspan',
    templateId: 821,
    templateName: 'Wilkes Barre Wyoming Valley Airport',
    currenyId: 'Trunyx',
    currenyName: 'Lajo',
    monthId: 821,
    monthName: 'Thoughtblab',
    yearId: 167,
    yearName: 'Dabvine',
    notes: 'Centidel',
    totalAllownace: 601.8,
    totalDeduction: 659.1,
    net: 506.1,
  },
  {
    allownace: [
      {
        elementId: 483,
        elementName: 'Ntag',
        elemVal: 453.7,
        elemValCalc: 685.9,
      },
      {
        elementId: 630,
        elementName: 'Trilia',
        elemVal: 982.1,
        elemValCalc: 451.9,
      },
    ],
    deductions: [
      {
        elementId: 847,
        elementName: 'Skinder',
        elemVal: 869.6,
        elemValCalc: 407.5,
      },
      {
        elementId: 713,
        elementName: 'Brainverse',
        elemVal: 56.9,
        elemValCalc: 239.1,
      },
      {
        elementId: 520,
        elementName: 'Browsecat',
        elemVal: 972.6,
        elemValCalc: 660.7,
      },
      {
        elementId: 954,
        elementName: 'Kazio',
        elemVal: 986.1,
        elemValCalc: 78.1,
      },
    ],
    refElements: [
      {
        elementId: 846,
        elementName: 'Vitz',
        elemVal: 636.5,
        elemValCalc: 183.2,
      },
      {
        elementId: 804,
        elementName: 'Rhybox',
        elemVal: 771.8,
        elemValCalc: 511.9,
      },
      {
        elementId: 139,
        elementName: 'Fivespan',
        elemVal: 666.5,
        elemValCalc: 36.9,
      },
      {
        elementId: 808,
        elementName: 'Youbridge',
        elemVal: 325.5,
        elemValCalc: 708.0,
      },
    ],
    employeeId: 736,
    employeeName: 'Sherilyn Goldsworthy',
    organizationId: 702,
    organizationName: 'Twitterbeat',
    templateId: 825,
    templateName: 'General José Antonio Anzoategui International Airport',
    currenyId: 'Ooba',
    currenyName: 'Skyndu',
    monthId: 857,
    monthName: 'Shuffledrive',
    yearId: 347,
    yearName: 'Kamba',
    notes: 'Dabfeed',
    totalAllownace: 135.2,
    totalDeduction: 862.7,
    net: 759.3,
  },
  {
    allownace: [
      {
        elementId: 545,
        elementName: 'Lajo',
        elemVal: 16.3,
        elemValCalc: 700.0,
      },
      {
        elementId: 578,
        elementName: 'Digitube',
        elemVal: 217.1,
        elemValCalc: 98.7,
      },
    ],
    deductions: [
      {
        elementId: 458,
        elementName: 'Yotz',
        elemVal: 394.0,
        elemValCalc: 374.7,
      },
      {
        elementId: 717,
        elementName: 'Realbuzz',
        elemVal: 495.4,
        elemValCalc: 326.7,
      },
      {
        elementId: 113,
        elementName: 'Youfeed',
        elemVal: 428.6,
        elemValCalc: 904.5,
      },
      {
        elementId: 181,
        elementName: 'Oloo',
        elemVal: 965.7,
        elemValCalc: 77.4,
      },
      {
        elementId: 743,
        elementName: 'Topdrive',
        elemVal: 164.1,
        elemValCalc: 940.2,
      },
    ],
    refElements: [
      {
        elementId: 615,
        elementName: 'Eayo',
        elemVal: 642.8,
        elemValCalc: 770.3,
      },
      {
        elementId: 265,
        elementName: 'Myworks',
        elemVal: 874.9,
        elemValCalc: 951.7,
      },
      {
        elementId: 250,
        elementName: 'Voomm',
        elemVal: 376.5,
        elemValCalc: 343.6,
      },
      {
        elementId: 316,
        elementName: 'Flashdog',
        elemVal: 970.7,
        elemValCalc: 891.5,
      },
    ],
    employeeId: 590,
    employeeName: 'Norri Deavall',
    organizationId: 347,
    organizationName: 'Devpoint',
    templateId: 426,
    templateName: 'Norwich International Airport',
    currenyId: 'Vipe',
    currenyName: 'Katz',
    monthId: 198,
    monthName: 'Twinder',
    yearId: 646,
    yearName: 'Jabbertype',
    notes: 'Dynabox',
    totalAllownace: 139.2,
    totalDeduction: 887.3,
    net: 731.8,
  },
  {
    allownace: [
      {
        elementId: 193,
        elementName: 'Skyvu',
        elemVal: 23.0,
        elemValCalc: 640.4,
      },
      {
        elementId: 67,
        elementName: 'Avaveo',
        elemVal: 715.5,
        elemValCalc: 375.2,
      },
      {
        elementId: 183,
        elementName: 'Vinder',
        elemVal: 260.9,
        elemValCalc: 468.9,
      },
      {
        elementId: 543,
        elementName: 'Brainbox',
        elemVal: 127.7,
        elemValCalc: 169.8,
      },
      {
        elementId: 66,
        elementName: 'Edgeify',
        elemVal: 499.3,
        elemValCalc: 626.1,
      },
    ],
    deductions: [
      {
        elementId: 153,
        elementName: 'Gigabox',
        elemVal: 138.3,
        elemValCalc: 116.2,
      },
      {
        elementId: 626,
        elementName: 'Realbridge',
        elemVal: 183.0,
        elemValCalc: 464.8,
      },
      {
        elementId: 489,
        elementName: 'Ainyx',
        elemVal: 802.7,
        elemValCalc: 487.3,
      },
    ],
    refElements: [
      {
        elementId: 267,
        elementName: 'Voolia',
        elemVal: 727.2,
        elemValCalc: 144.2,
      },
      {
        elementId: 269,
        elementName: 'Dabtype',
        elemVal: 596.4,
        elemValCalc: 209.3,
      },
      {
        elementId: 492,
        elementName: 'Photobean',
        elemVal: 972.2,
        elemValCalc: 641.5,
      },
      {
        elementId: 874,
        elementName: 'Jetwire',
        elemVal: 17.8,
        elemValCalc: 738.4,
      },
    ],
    employeeId: 225,
    employeeName: 'Robby Georgeson',
    organizationId: 314,
    organizationName: 'Brainsphere',
    templateId: 629,
    templateName: 'Hardy-Anders Field / Natchez-Adams County Airport',
    currenyId: 'Skyvu',
    currenyName: 'Gigashots',
    monthId: 859,
    monthName: 'Eire',
    yearId: 196,
    yearName: 'Trilith',
    notes: 'Photofeed',
    totalAllownace: 10.4,
    totalDeduction: 670.0,
    net: 140.3,
  },
  {
    allownace: [
      {
        elementId: 488,
        elementName: 'Topiclounge',
        elemVal: 553.5,
        elemValCalc: 600.1,
      },
      {
        elementId: 679,
        elementName: 'Flashdog',
        elemVal: 913.0,
        elemValCalc: 110.9,
      },
      {
        elementId: 688,
        elementName: 'Flipstorm',
        elemVal: 75.7,
        elemValCalc: 142.1,
      },
    ],
    deductions: [
      {
        elementId: 349,
        elementName: 'Wordify',
        elemVal: 801.1,
        elemValCalc: 723.3,
      },
      {
        elementId: 160,
        elementName: 'Blogspan',
        elemVal: 208.6,
        elemValCalc: 75.5,
      },
      {
        elementId: 649,
        elementName: 'Gevee',
        elemVal: 207.3,
        elemValCalc: 178.3,
      },
      {
        elementId: 624,
        elementName: 'Skivee',
        elemVal: 697.4,
        elemValCalc: 8.1,
      },
      {
        elementId: 789,
        elementName: 'Jabbercube',
        elemVal: 715.3,
        elemValCalc: 36.9,
      },
    ],
    refElements: [
      {
        elementId: 885,
        elementName: 'Gigabox',
        elemVal: 28.8,
        elemValCalc: 474.3,
      },
      {
        elementId: 237,
        elementName: 'Twitternation',
        elemVal: 565.2,
        elemValCalc: 682.0,
      },
    ],
    employeeId: 543,
    employeeName: 'Oneida Spowart',
    organizationId: 976,
    organizationName: 'LiveZ',
    templateId: 128,
    templateName: 'Namibe Airport',
    currenyId: 'Latz',
    currenyName: 'Trilia',
    monthId: 402,
    monthName: 'Youtags',
    yearId: 423,
    yearName: 'Vinte',
    notes: 'Gigazoom',
    totalAllownace: 484.6,
    totalDeduction: 796.4,
    net: 337.8,
  },
  {
    allownace: [
      {
        elementId: 958,
        elementName: 'Topiclounge',
        elemVal: 347.4,
        elemValCalc: 105.9,
      },
      {
        elementId: 140,
        elementName: 'Yoveo',
        elemVal: 264.0,
        elemValCalc: 470.7,
      },
    ],
    deductions: [
      {
        elementId: 769,
        elementName: 'Nlounge',
        elemVal: 501.3,
        elemValCalc: 33.1,
      },
      {
        elementId: 729,
        elementName: 'Shufflester',
        elemVal: 225.6,
        elemValCalc: 43.6,
      },
      {
        elementId: 180,
        elementName: 'Zoovu',
        elemVal: 750.5,
        elemValCalc: 304.6,
      },
      {
        elementId: 523,
        elementName: 'Ooba',
        elemVal: 44.2,
        elemValCalc: 309.7,
      },
      {
        elementId: 39,
        elementName: 'Oyonder',
        elemVal: 93.7,
        elemValCalc: 579.8,
      },
    ],
    refElements: [
      {
        elementId: 157,
        elementName: 'Tambee',
        elemVal: 103.9,
        elemValCalc: 681.9,
      },
      {
        elementId: 979,
        elementName: 'Jetwire',
        elemVal: 886.6,
        elemValCalc: 418.6,
      },
      {
        elementId: 651,
        elementName: 'Mynte',
        elemVal: 987.7,
        elemValCalc: 244.2,
      },
    ],
    employeeId: 665,
    employeeName: 'Tiffy Thorburn',
    organizationId: 353,
    organizationName: 'Abatz',
    templateId: 824,
    templateName: 'Puerto Barrios Airport',
    currenyId: 'Topiczoom',
    currenyName: 'Tekfly',
    monthId: 259,
    monthName: 'Buzzshare',
    yearId: 664,
    yearName: 'Flashdog',
    notes: 'Flashdog',
    totalAllownace: 681.2,
    totalDeduction: 958.2,
    net: 303.8,
  },
  {
    allownace: [
      {
        elementId: 80,
        elementName: 'Viva',
        elemVal: 286.4,
        elemValCalc: 660.4,
      },
      {
        elementId: 784,
        elementName: 'Skiptube',
        elemVal: 484.9,
        elemValCalc: 349.2,
      },
      {
        elementId: 7,
        elementName: 'Topicstorm',
        elemVal: 280.6,
        elemValCalc: 26.1,
      },
      {
        elementId: 873,
        elementName: 'Gigaclub',
        elemVal: 239.8,
        elemValCalc: 751.8,
      },
    ],
    deductions: [
      {
        elementId: 178,
        elementName: 'Jabberstorm',
        elemVal: 79.1,
        elemValCalc: 858.0,
      },
      {
        elementId: 497,
        elementName: 'Rooxo',
        elemVal: 946.6,
        elemValCalc: 164.2,
      },
      {
        elementId: 530,
        elementName: 'Flipbug',
        elemVal: 1.8,
        elemValCalc: 10.8,
      },
    ],
    refElements: [
      {
        elementId: 631,
        elementName: 'Realblab',
        elemVal: 591.8,
        elemValCalc: 112.2,
      },
      {
        elementId: 27,
        elementName: 'Skyble',
        elemVal: 875.8,
        elemValCalc: 930.7,
      },
      {
        elementId: 524,
        elementName: 'Quaxo',
        elemVal: 734.2,
        elemValCalc: 113.9,
      },
    ],
    employeeId: 348,
    employeeName: 'Thacher Diano',
    organizationId: 880,
    organizationName: 'Podcat',
    templateId: 371,
    templateName: 'Bewani Airport',
    currenyId: 'Blogtags',
    currenyName: 'Realcube',
    monthId: 887,
    monthName: 'Latz',
    yearId: 530,
    yearName: 'Cogibox',
    notes: 'Talane',
    totalAllownace: 867.3,
    totalDeduction: 35.5,
    net: 739.1,
  },
  {
    allownace: [
      {
        elementId: 713,
        elementName: 'Quimm',
        elemVal: 474.5,
        elemValCalc: 444.0,
      },
      {
        elementId: 41,
        elementName: 'Browseblab',
        elemVal: 935.9,
        elemValCalc: 543.6,
      },
      {
        elementId: 552,
        elementName: 'Buzzbean',
        elemVal: 332.1,
        elemValCalc: 135.0,
      },
      {
        elementId: 437,
        elementName: 'Twitterlist',
        elemVal: 229.4,
        elemValCalc: 934.1,
      },
      {
        elementId: 296,
        elementName: 'Edgeblab',
        elemVal: 139.4,
        elemValCalc: 419.8,
      },
    ],
    deductions: [
      {
        elementId: 120,
        elementName: 'Aimbu',
        elemVal: 675.7,
        elemValCalc: 340.2,
      },
      {
        elementId: 922,
        elementName: 'Roombo',
        elemVal: 735.7,
        elemValCalc: 635.4,
      },
      {
        elementId: 146,
        elementName: 'Ainyx',
        elemVal: 804.1,
        elemValCalc: 532.8,
      },
    ],
    refElements: [
      {
        elementId: 742,
        elementName: 'Brightdog',
        elemVal: 114.3,
        elemValCalc: 40.6,
      },
      {
        elementId: 938,
        elementName: 'Pixonyx',
        elemVal: 903.6,
        elemValCalc: 712.7,
      },
      {
        elementId: 249,
        elementName: 'Yadel',
        elemVal: 909.0,
        elemValCalc: 696.4,
      },
      {
        elementId: 641,
        elementName: 'Roodel',
        elemVal: 741.8,
        elemValCalc: 90.3,
      },
      {
        elementId: 875,
        elementName: 'Skipfire',
        elemVal: 518.5,
        elemValCalc: 927.5,
      },
    ],
    employeeId: 24,
    employeeName: 'Cordie Santon',
    organizationId: 992,
    organizationName: 'Skiba',
    templateId: 420,
    templateName: 'Trieste–Friuli Venezia Giulia Airport',
    currenyId: 'Voomm',
    currenyName: 'Blogtag',
    monthId: 312,
    monthName: 'Photolist',
    yearId: 458,
    yearName: 'Jabberstorm',
    notes: 'Tambee',
    totalAllownace: 517.9,
    totalDeduction: 527.7,
    net: 227.6,
  },
  {
    allownace: [
      {
        elementId: 806,
        elementName: 'Feednation',
        elemVal: 173.9,
        elemValCalc: 4.7,
      },
      {
        elementId: 160,
        elementName: 'Meevee',
        elemVal: 863.7,
        elemValCalc: 427.8,
      },
      {
        elementId: 171,
        elementName: 'Wordware',
        elemVal: 994.9,
        elemValCalc: 900.1,
      },
    ],
    deductions: [
      {
        elementId: 315,
        elementName: 'Mynte',
        elemVal: 132.4,
        elemValCalc: 319.3,
      },
      {
        elementId: 574,
        elementName: 'Kimia',
        elemVal: 449.6,
        elemValCalc: 662.5,
      },
      {
        elementId: 151,
        elementName: 'Myworks',
        elemVal: 581.5,
        elemValCalc: 474.6,
      },
    ],
    refElements: [
      {
        elementId: 182,
        elementName: 'Vinte',
        elemVal: 36.5,
        elemValCalc: 772.5,
      },
      {
        elementId: 32,
        elementName: 'Leenti',
        elemVal: 250.1,
        elemValCalc: 580.6,
      },
      {
        elementId: 362,
        elementName: 'Zooxo',
        elemVal: 84.7,
        elemValCalc: 356.2,
      },
      {
        elementId: 646,
        elementName: 'Yotz',
        elemVal: 831.3,
        elemValCalc: 176.5,
      },
    ],
    employeeId: 958,
    employeeName: 'Roze Blasik',
    organizationId: 578,
    organizationName: 'Tagfeed',
    templateId: 502,
    templateName: 'Columbia Regional Airport',
    currenyId: 'Youopia',
    currenyName: 'Meejo',
    monthId: 978,
    monthName: 'Browsecat',
    yearId: 535,
    yearName: 'Yakitri',
    notes: 'Yakitri',
    totalAllownace: 623.5,
    totalDeduction: 895.2,
    net: 614.6,
  },
  {
    allownace: [
      {
        elementId: 100,
        elementName: 'Demivee',
        elemVal: 462.9,
        elemValCalc: 854.5,
      },
      {
        elementId: 886,
        elementName: 'Realcube',
        elemVal: 685.6,
        elemValCalc: 997.1,
      },
    ],
    deductions: [
      {
        elementId: 256,
        elementName: 'Yacero',
        elemVal: 56.6,
        elemValCalc: 263.5,
      },
      {
        elementId: 699,
        elementName: 'Flipopia',
        elemVal: 735.3,
        elemValCalc: 30.5,
      },
      {
        elementId: 343,
        elementName: 'Mynte',
        elemVal: 318.2,
        elemValCalc: 707.1,
      },
      {
        elementId: 63,
        elementName: 'Rooxo',
        elemVal: 972.8,
        elemValCalc: 871.9,
      },
    ],
    refElements: [
      {
        elementId: 27,
        elementName: 'Edgewire',
        elemVal: 862.1,
        elemValCalc: 200.2,
      },
      {
        elementId: 752,
        elementName: 'Photobean',
        elemVal: 493.1,
        elemValCalc: 877.3,
      },
      {
        elementId: 892,
        elementName: 'Tagfeed',
        elemVal: 558.2,
        elemValCalc: 635.7,
      },
      {
        elementId: 677,
        elementName: 'Bubblebox',
        elemVal: 526.4,
        elemValCalc: 428.7,
      },
    ],
    employeeId: 107,
    employeeName: 'Travis Kerton',
    organizationId: 782,
    organizationName: 'Aivee',
    templateId: 466,
    templateName: 'Lübeck Blankensee Airport',
    currenyId: 'Realbuzz',
    currenyName: 'Avavee',
    monthId: 292,
    monthName: 'Viva',
    yearId: 724,
    yearName: 'Flashspan',
    notes: 'Kwilith',
    totalAllownace: 940.3,
    totalDeduction: 76.5,
    net: 566.5,
  },
];

function PaymentSlip(props) {
  const { intl } = props;

  const title = localStorage.getItem('MenuName');
  const DOCUMENT_TITLE = 'Payment Slip - ' + format(new Date(), 'yyyy-MM-dd hh_mm_ss');

  const locale = useSelector((state) => state.language.locale);

  const [isLoading, setIsLoading] = useState(true);

  const printDivRef = useRef(null);

  const onBeforeGetContent = () => {
    setIsLoading(true);
  };

  const onAfterPrint = () => {
    setIsLoading(false);
  };

  const onPrintError = () => {
    setIsLoading(false);
  };

  const printJS = useReactToPrint({
    content: () => printDivRef?.current,
    onBeforeGetContent,
    onAfterPrint,
    onPrintError,
    documentTitle: DOCUMENT_TITLE,
  });

  const [companyList, setCompanyList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [payTemplateList, setPayTemplateList] = useState([]);
  const [paymentSlipReport, setPaymentSlipReport] = useState(dummy);

  const insuranceList = [
    {
      id: 1,
      name: intl.formatMessage(messages.insured),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.unInsured),
    },
  ];

  const salaryValuesList = [
    {
      id: 1,
      name: intl.formatMessage(messages.positive),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.negative),
    },
  ];

  const salaryTypesList = [
    {
      id: 1,
      name: intl.formatMessage(messages.bank),
    },
    {
      id: 0,
      name: intl.formatMessage(messages.cash),
    },
  ];

  const [formInfo, setFormInfo] = useState({
    templateId: null,
    branchId: null,
    currenyId: null,
    yearId: null,
    monthId: null,
    isShowStopedEmp: false,
    isInsured: null,
    isBankTransfere: null,
    isPostiveVal: null,
    isShowCompInsurance: false,
    isShowEffectElements: false,
    notes: '',

    employeeId: null,
    EmpStatusId: 1,
    OrganizationId: '',
  });

  async function fetchNeededData() {
    setIsLoading(true);

    try {
      const company = await GeneralListApis(locale).GetBranchList();
      setCompanyList(company);

      const payTemplate = await GeneralListApis(locale).GetPayTemplateList();
      setPayTemplateList(payTemplate);

      const months = await GeneralListApis(locale).GetMonths();
      setMonthList(months);

      const years = await GeneralListApis(locale).GetYears();
      setYearList(years);
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchReportInfo() {
    setIsLoading(true);

    try {
      const response = await api(locale).GetPaymentSlipReport(formInfo);
      setPaymentSlipReport(response);
      printJS();
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNeededData();
  }, []);

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    fetchReportInfo();
  };

  const onCheckboxChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.checked,
    }));
  };

  const onAutoCompleteChange = (value, name) => {
    setFormInfo((prev) => ({
      ...prev,
      [name]: value !== null ? value.id : null,
    }));
  };

  const onInputChange = (evt) => {
    setFormInfo((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  };

  const handleEmpChange = useCallback(async (id, name) => {
    if (name === 'employeeId') {
      setFormInfo((prev) => ({
        ...prev,
        employeeId: id,
      }));
    }
  }, []);

  const getAutoCompleteValue = (list, key) => list.find((item) => item.id === key) ?? null;

  return (
    <PayRollLoader isLoading={isLoading}>
      <form onSubmit={onFormSubmit}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: '16px!important' }}>
            <Typography variant='h6'>{title}</Typography>

            <Grid container mt={0} spacing={3}>
              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={companyList}
                  value={getAutoCompleteValue(companyList, formInfo.branchId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'branchId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.company)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={payTemplateList}
                  value={getAutoCompleteValue(
                    payTemplateList,
                    formInfo.templateId
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'templateId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.template)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={yearList}
                  value={getAutoCompleteValue(yearList, formInfo.yearId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'yearId')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label={intl.formatMessage(messages.year)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={monthList}
                  value={getAutoCompleteValue(monthList, formInfo.monthId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'monthId')
                  }
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label={intl.formatMessage(messages.month)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={insuranceList}
                  value={getAutoCompleteValue(
                    insuranceList,
                    formInfo.isInsured
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'isInsured')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.insurance)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={salaryTypesList}
                  value={getAutoCompleteValue(
                    salaryTypesList,
                    formInfo.isBankTransfere
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'isBankTransfere')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.salaryType)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={salaryValuesList}
                  value={getAutoCompleteValue(
                    salaryValuesList,
                    formInfo.isPostiveVal
                  )}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'isPostiveVal')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.salaryValue)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Autocomplete
                  options={currencyList}
                  value={getAutoCompleteValue(currencyList, formInfo.currenyId)}
                  isOptionEqualToValue={(option, value) => option.id === value.id
                  }
                  getOptionLabel={(option) => (option ? option.name : '')}
                  renderOption={(propsOption, option) => (
                    <li {...propsOption} key={option.id}>
                      {option.name}
                    </li>
                  )}
                  onChange={(_, value) => onAutoCompleteChange(value, 'currenyId')
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={intl.formatMessage(messages.currency)}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formInfo.isShowCompInsurance}
                      name='isShowCompInsurance'
                      onChange={onCheckboxChange}
                    />
                  }
                  label={intl.formatMessage(messages.showSICompanyShare)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formInfo.isShowStopedEmp}
                      name='isShowStopedEmp'
                      onChange={onCheckboxChange}
                    />
                  }
                  label={intl.formatMessage(messages.showStopped)}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={formInfo.isShowEffectElements}
                      name='isShowEffectElements'
                      onChange={onCheckboxChange}
                    />
                  }
                  label={intl.formatMessage(messages.displayReferenceElements)}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <EmployeeData
                  handleEmpChange={handleEmpChange}
                  id={formInfo.employeeId}
                  branchId={formInfo.branchId}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name='notes'
                  value={formInfo.notes}
                  label={intl.formatMessage(payrollMessages.notes)}
                  onChange={onInputChange}
                  fullWidth
                  variant='outlined'
                  rows={1}
                  multiline
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant='contained' color='primary' type='submit'>
                  <FormattedMessage {...payrollMessages.Print} />
                </Button>

                <Button variant='contained' color='primary' onClick={printJS}>
                  <FormattedMessage {...payrollMessages.Print} />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>

      <Box
        ref={printDivRef}
        sx={{
          // display: 'none',
          p: 4,
          direction: locale === 'en' ? 'ltr' : 'rtl',
          textAlign: locale === 'en' ? 'left' : 'right',
          fontFamily: "'Cairo', 'sans-serif'",
          '@media print': {
            display: 'block',
          },
          'p.MuiTypography-root': {
            fontSize: '10px',
          },
          '.MuiTypography-root': {
            fontFamily: "'Cairo', 'sans-serif'",
          },
          '.MuiTableCell-root': {
            fontFamily: "'Cairo', 'sans-serif'",
            fontSize: '10px',
          },
        }}
      >
        {paymentSlipReport.map((item, index) => (
          <Box
            key={index}
            sx={{
              pageBreakInside: 'avoid',
            }}
          >
            <PaymentReportItem
              item={item}
              notes={formInfo.notes}
              showReferenceElements={formInfo.isShowEffectElements}
            />
          </Box>
        ))}
      </Box>
    </PayRollLoader>
  );
}

PaymentSlip.propTypes = {
  intl: PropTypes.object.isRequired,
};

export default injectIntl(PaymentSlip);
