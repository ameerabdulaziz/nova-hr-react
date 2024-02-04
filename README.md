
# Payroll App

## Get Start 🚀

### Prerequisites

Make sure you have the following software installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Using Git (recommended)

```bash
# clone it with git version control:
git clone https://github.com/dynamicTech123/PayrollWebApp.git

# change directory:
cd PayrollWebApp

# Install dependencies:
npm install

# Build Webpack DLL dependencies(If necessary)
npm run build:dll
```

## Available Scripts 🤖

### Development

> Run npm install again if you have new module dependencies

```bash
# To start the development server:
# The application will be available at
# http://localhost:3000/
npm run start
```

### Production

```bash
# To create a production build:
npm run build

# To start the production server:
npm run start:prod
```

## BUGS 🐛

- [ ] Exclude the **profile page** from appearing in the master data menu.
- [ ] Exclude the **JobApplicationPreview page** from appearing in the Recruitment menu.
- [ ] Eliminate the **debugger** from the project codebase.
- [ ] Error occurring when attempting to add multiple rows in the **editable table** component.
- [ ] Ensure that the **MUI-table** is properly translated into Arabic.
- [ ] **Notification** still not work
- [ ] Implement error handling for API responses, especially when data is not returned. For example, `login page`
- [ ] Integrate dark mode support for the **loader** component
- [ ] Complete the implementation of the **Calculate Attendance** page
- [ ] Integrate the Leave **Balance** page with the API
- [ ] Dark mode not work correctly on most components
- [ ] Implement a global loader when fetching menu data
- [ ] Search in navbar still search on old dashboard components

### TODO

- [ ] Integrate a cancel button into the **editable** table component
- [x] Create a global component for **MUI-table** that allows for customization of printed data.
- [ ] Create docs for **MUI-table**

## Pages

### Complaint & Explanation

### Main Data

- [x] **company document**: delete popup show `id` instead of `name`
- [ ] **Documents**: can't change `Check Expire Date` column value
- [x] **Company Data**: not contain loader
- [x] **Job**: duplicated page title
- [x] **JobEdit**: get error on `medicalInsuranceStartDay` is empty
- [x] **JobCreate**: not contain loader

### Employee Data

- [x] **personal**: delete popup show `id` instead of `name`
- [ ] **personal**: delete success but not delete employee

### Recruitment

- [x] **JobApplicationPreview**: image not get in the right format
- [x] **JobApplicationPreview**: `computerSkills` show it's id not name
- [x] **JobVacation/Application**: still need auth for api
- [x] **public/JobVacation**: logo, how to change (add input field to company data page)
- [x] **RecEvaluation**: `Element Job` get as id not name

### Medical Insurance

- [x] **Minsurance/StopMedicalInsurance**: on edit, the employee not get in employee list
- [x] **Transaction - MedicalInsuranceSubscriptionCreate**: get error on save `You must complete the establishment of subscription items
`

### Social Insurance

- [x] **/insurance/StopInsurance**: on edit, the employee not get in employee list

### Human Resources

- [ ] **Code - Course**: error on create
- [ ] **PenaltyTransCreate**: need workflow to test
- [ ] **HR/ExplanationEdit**: what should do & how to create
- [ ] **HR/ResignTrxImport**: how to test
- [ ] **Transaction - Explanation**: filter not work
- [ ] **HR/EmpCourse**: not test because of **Code - Course** not get data

### Vacation

#### Codes

- [ ] **VacationsTypes**: delete api return 500 error

#### Transactions

- [x] **LeaveOpenBalance**: can't save, api get error
- [x] **OpeningClosingTheYearForLeaves**: can't open month, api get error
- [ ] **ReplaceAnnualLeaveBalanceCreate**: element autocomplete is required but contain no data
- [ ] **LeaveTrxCreate**: need workflow to be work
- [ ] **LeaveTrxCreate**: alternativeStaff is not required but api get error as null is not accepted
- [ ] **GovernmentSickLeave**: need workflow to be work
- [ ] **GovernmentSickLeave**: alternativeStaff is not required but api get error as null is not accepted
- [ ] **ImportVacations**: get error on upload (save)
