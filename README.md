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

- [ ] Eliminate the **debugger** from the project codebase.
- [ ] Error occurring when attempting to add multiple rows in the **editable table** component.
- [ ] **Notification** still not work (on click **view** button the notification still appear)
- [ ] Implement error handling for API responses, especially when data is not returned. For example, **login page**
- [ ] Integrate the **LeavesBalance** page with the API
- [ ] Integrate a cancel button into the **editable** table component
- [ ] Improve **React-to-print** package the need state before print
  - [generate-printable-document](https://blog.logrocket.com/using-react-to-print-generate-printable-document/)
  - [html2pdf](https://github.com/airarrazaval/html2pdf)
- [ ] Fix selection column in **editable** table (use id instead of name)
- [ ] Implement "react-window" or similar package for the **payroll** table
- [ ] **Recruitment** - add pdf download instead of open in new tab
- [ ] What is `apiKey` in **TrainingCenter** page
- [ ] **Employee Component**: show search input with selected rows
- [ ] Use preview pdf component instead of open in new tab

# Docs 📖

## API Base URL

During to SaaS development, we replace the reading of the API base URL from **.env** to a global variable in **window object**. this will make it easier to change any variable without the need to build the project again.

The API base URL is configured in [**index.html**](app/index.html), if any change is made, you should restart the server to take effect.

It can be configured in the following way:

```js
window.config = {
  apiUrl: "http://92.205.178.113:801/",
};
```

The code above will add a new property in the window object called **config** and set **apiUrl** to `http://92.205.178.113:801/`.

## Date Picker Replacement

### Import Date Picker

```jsx
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
```

### State Date Picker

```jsx
const [dateError, setDateError] = useState({});
```

### On Submit

```jsx
if (Object.values(dateError).includes(true)) {
  toast.error(intl.formatMessage(payrollMessages.DateNotValid));
  return;
}
```

### Date Picker Body

```jsx
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label={intl.formatMessage(messages.endDate)}
    value={formInfo.trxDate ? dayjs(formInfo.trxDate) : null}
    sx={{ width: "100%" }}
    onChange={(date) => onDatePickerChange(date, "trxDate")}
    onError={(error) => {
      setDateError((prevState) => ({
        ...prevState,
        trxDate: error !== null,
      }));
    }}
    slotProps={{
      textField: {
        required: true,
      },
    }}
  />
</LocalizationProvider>
```

## Organization Tree Component

Provide a tree component to display the organization structure. with ability to select and deselect the organization. also if any organization is selected, then all its children will be selected.

### Usage

#### Add OrganizationTree component import

```jsx
import OrgTree from "../../../Component/OrganizationTree/Tree";
import TreePopup from "../../../Component/OrganizationTree/TreePopup";
```

#### Set OrganizationTree component state

```jsx
const [organizationData, setOrganizationData] = useState(null);
const [isTreeOpen, setIsTreeOpen] = useState(false);
const [tree, setTree] = useState(OrgTree.buildTreeFromArray(null));
```

#### Get organization data from API

```jsx
const chartInfo = await GeneralListApis(locale).GetSimpleOrganizationChart();
setOrganizationData(chartInfo);
setTree(OrgTree.buildTreeFromArray(chartInfo));
```

#### Add selected organization

```jsx
const tempTree = OrgTree.buildTreeFromArray(chartInfo);
arrayOfIds.forEach((id) => {
  tempTree.addIsCheckProperty(id, true);
});
setTree(tempTree);
```

#### Create onSave callback

```jsx
const onTreePopupSave = (changedTree) => {
  setOrganizationTree(changedTree.clone());
  console.log(changedTree.getCheckedLeafNodes());
};
```

#### Add Tree Popup

```jsx
{
  organizationData && Object.keys(organizationData).length > 0 && (
    <OrganizationTreePopup
      isOpen={isTreeOpen}
      tree={tree.clone()}
      chartData={organizationData}
      setIsOpen={setIsTreeOpen}
      onSave={onTreePopupSave}
    />
  );
}
```

#### Open The Tree

```jsx
<Button
  variant='contained'
  disabled={!(organizationData && Object.keys(organizationData).length > 0)}
  onClick={() => setIsTreeOpen(true)}
>
  Open Tree
</Button>
```

### TreePopup Props

| Prop Name   | Type       | Default | Description                                                             |
| ----------- | ---------- | ------- | ----------------------------------------------------------------------- |
| `isOpen`    | `bool`     | `-`     | A boolean flag indicating whether the popup is open.                    |
| `setIsOpen` | `function` | `-`     | A function to close/open the popup.                                     |
| `onSave`    | `function` | `-`     | A callback function fire when the save button is clicked.               |
| `chartData` | `array`    | `-`     | An array of objects representing the data to be displayed in the popup. |
| `tree`      | `Tree`     | `-`     | An tree object representing the organization structure.                 |

### Tree Data Structure

- `preOrderTraversal()`

  Performs pre-order traversal of the tree and returns an array of nodes.

- `postOrderTraversal()`

  Performs post-order traversal of the tree and returns an array of nodes.

- `remove(id)`

  Removes the node with the given id from the tree.

- `find(id)`

  Finds and returns the first node with the specified id.

- `addIsCheckProperty(id, isCheck)`

  Adds an `isCheck` property to the specified node and disables its children based on the `isCheck` value.

  Example: `tree.addIsCheckProperty(1, true);`

- `clone()`

  Creates a deep copy of the tree. very useful when you want to modify the tree without modifying the original tree.

  for example select new organization and set it into the state

- `insert(parentNodeId, id, value)`

  Inserts a new node with the given id and optional value under the specified parent node.

- `getCheckedLeafNodes()`

  Retrieves checked leaf nodes (nodes without children) without the parent property.

- `buildTreeFromArray([])`

  Static Method to Build Tree from Array, if pass a `null` it will create empty tree.

## PayrollTable Component

The `PayrollTable` component is a React component designed to display and manage payroll data in a tabular format. It provides features such as printing, adding, editing, and deleting rows.

> Date format: `YYYY-MM-DD` by default for each column ending with **Date** word, and also change filter input to be **from** and **to** date.
>
> Also to make all words in the column in the same line, each column value wrapped in `<pre>` tag. So to ignore it use **noWrap** option in column config.

### Usage

```jsx
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { useSelector } from "react-redux";
import PayrollTable from "../../Component/PayrollTable";
import { formateDate } from "../../helpers";
import api from "../api/ExamplePageData";
import messages from "../messages";

function ExamplePage(props) {
  // Destructure props
  const { intl } = props;

  // Get locale from Redux state
  const locale = useSelector((state) => state.language.locale);

  // Retrieve title from local storage
  const Title = localStorage.getItem("MenuName");

  // State for loading status and table data
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  // Function to fetch data from the API
  const fetchTableData = async () => {
    setIsLoading(true);

    try {
      // Fetch data from the API based on the locale
      const response = await api(locale).GetList();
      setTableData(response);
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchTableData();
  }, []);

  // Function to delete a row
  const deleteRow = async (id) => {
    setIsLoading(true);

    try {
      // Call the API to delete the row
      await api(locale).delete(id);

      // Refetch data after deletion
      fetchTableData();
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  // Define columns for the PayrollTable
  const columns = [
    {
      name: "id",
      label: intl.formatMessage(messages.id),
      options: {
        filter: false,
        // Will hide the column on print
        print: false,
      },
    },
    {
      name: "departmentName",
      label: intl.formatMessage(messages.department),
    },
    {
      name: "insDate",
      label: intl.formatMessage(messages.insertDate),
      options: {
        // Custom rendering for date column
        customBodyRender: (value) => <pre>{formateDate(value)}</pre>,
      },
    },
    {
      name: "jobName",
      label: intl.formatMessage(messages.position),
    },
  ];

  // Define actions for the PayrollTable
  const actions = {
    add: {
      url: "/Recruitment/ExamplePageCreate",
    },
    edit: {
      url: "/Recruitment/ExamplePageEdit",
    },
    delete: {
      api: deleteRow,
    },
  };

  // Render the PayrollTable component with provided props
  return (
    <PayrollTable
      isLoading={isLoading}
      showLoader
      title={Title}
      data={tableData}
      columns={columns}
      actions={actions}
    />
  );
}

// Prop types for ExamplePage component
ExamplePage.propTypes = {
  intl: PropTypes.object.isRequired,
};

// Inject internationalization into the component
export default injectIntl(ExamplePage);
```

### Props

| Prop Name    | Type     | Default | Description                                                                              |
| ------------ | -------- | ------- | ---------------------------------------------------------------------------------------- |
| `isLoading`  | `bool`   | `false` | A boolean flag indicating whether data is still loading.                                 |
| `showLoader` | `bool`   | `false` | A boolean flag to conditionally render a loader.                                         |
| `title`      | `string` | `''`    | A string representing the title of the table.                                            |
| `data`       | `array`  | `[]`    | An array of objects representing the data to be displayed in the table.                  |
| `columns`    | `array`  | `[]`    | An array of column configurations for the table.                                         |
| `actions`    | `object` | `null`  | An object containing configurations for actions like adding, editing, and deleting rows. |

### Actions

In the provided `ExamplePage` example, the actions object is used to configure actions associated with the `PayrollTable`. These actions typically represent operations that can be performed on the data displayed in the table. The actions object has three properties: **add**, **edit**, and **delete**, each specifying the configuration for the corresponding action.

> If the corresponding configuration is not provided, the button icon will not be displayed

- **Add Action** (add property):
  - `url`: Specifies the URL to navigate to when the "Add" action is triggered.
  - `disabled`: Specifies whether the "Add" action should be disabled or not, can be boolean or function that take row data and returns a boolean.
- **Edit Action** (edit property):
  - `url`: Specifies the URL to navigate to when the "Edit" action is triggered.
  - `disabled`: Specifies whether the "Add" action should be disabled or not, can be boolean or function that take row data and returns a boolean.
- **Delete Action** (delete property):
  - `api`: Specifies a function that will be called when the "Delete" action is triggered.
  - `disabled`: Specifies whether the "Add" action should be disabled or not, can be boolean or function that take row data and returns a boolean.

### Extra Actions

If you need to add extra actions, you can do so by adding them to the `actions` object within the `extraActions` property which a function that take row data and returns a JSX element.

> Note: The extra actions will be displayed as the first item of actions column. and it will be a child of the **Stack** component.

```jsx
const actions = {
  // ...
  extraActions: (row) => (
    <Tooltip
      placement='bottom'
      title={intl.formatMessage(payrollMessages.details)}
    >
      <span>
        <IconButton onClick={() => onExecutionBtnClick(row.id)}>
          <List sx={{ fontSize: "1.2rem" }} />
        </IconButton>
      </span>
    </Tooltip>
  ),
};
```

### Columns

The `columns` prop in the `PayrollTable` component is an array of objects, where each object represents a column in the table. The configuration of each column is specified using the following properties:

- **name** (string): The key or property name in the data object.

  Represents the key or property name in the data object. It specifies which property from the data array should be displayed in this column.

- **label** (string): The display label for the column header.

  Used as the display label for the column header. It defines what text should be shown at the top of the column.

- **options** (object, optional): Additional options for configuring the column.

  An object containing additional configuration options for the column. It includes settings such as:

  - **filter** (boolean, default: true): Enable or disable filtering for this column.
  - **print** (boolean, default: true): Enable or disable printing for this column.
  - **customBodyRender** (function, optional): A custom rendering function for the cell content. This function allows you to customize how the data in the column is displayed.

### Options

The `options` prop in the `PayrollTable` component is an object containing settings for configuring the table. It includes settings such as:

- **viewColumns** (boolean, default: true): Enable or disable viewColumns for the table.
- **print** (boolean, default: true): Enable or disable printing for the table.
- **download** (boolean, default: true): Enable or disable downloading for the table.
- **customToolbar** : A custom toolbar function for the table. This function allows you to add custom controls or buttons to the table.

### Data

The `data` prop in the `PayrollTable` component represents the actual data that you want to display in the table. It expects an array of objects, where each object corresponds to a row in the table, and the properties of the object represent the values for each column.

Here's an example of how the data array might look like:

```jsx
const data = [
  {
    id: 1,
    departmentName: "Finance",
    insDate: "2022-02-14T12:30:00Z",
    jobName: "Financial Analyst",
  },
  {
    id: 2,
    departmentName: "Human Resources",
    insDate: "2022-02-15T09:45:00Z",
    jobName: "HR Manager",
  },
  // Add more rows as needed
];
```

In this example, each object in the data array represents a row in the table. The properties of each object (id, departmentName, insDate, jobName) correspond to the name properties specified in the columns array. The PayrollTable component uses this data to populate the cells in the table.

Adjust the structure of the data array based on the actual data you want to display in your table. Each property in the objects should match the name property in the corresponding column configuration within the columns array.

### Override the options

If you need to override the default `options` for the `PayrollTable` component

```jsx
// .....

// Define your custom options
const options = {
  selectableRows: "multiple",
  customToolbarSelect: (selectedRows) => (
    <IconButton
      sx={{ mx: 2 }}
      onClick={() => onToolBarIconClick(selectedRows.data)}
    >
      <ManageAccountsIcon sx={{ fontSize: "25px" }} />
    </IconButton>
  ),
};

// ....

// Pass the custom options to the PayrollTable component
<PayrollTable
  isLoading={isLoading}
  data={tableData}
  columns={columns}
  options={customOptions}
  actions={actions}
/>;
```

### Add Custom Column

If you want to add a custom `column` to your `PayrollTable` component and ensure that the **print** option for this column is set to `false`, you can include the options object within the column configuration.

**Example**

```jsx
const columns = [
  // ... your existing columns

  {
    name: '',
    label: '',
    options: {
      filter: false,
      print: false,
      customBodyRender: (_, tableMeta) => {
        const row = tableData[tableMeta.rowIndex];

        return (
          // .....
        );
      },
    },
  },
];
```

In this example, the **options** object is added to the custom `column` configuration, and `print: false` is explicitly set to ensure that this column is excluded when printing the table.

Adjust the name and label properties based on your specific requirements for this custom column. The `customBodyRender` function allows you to define the custom rendering logic for the content of this column.

### Filter Highlights

If you want to add filter as table header, you can include the options object within the column configuration.

> Note: Table column count is 2 by default, you can change it using **filterHighlightsColumn** props.

```jsx
// Set filter highlights
const [filterHighlights, setFilterHighlights] = useState([]);

// Add filter highlights
const result = [];
const employee = getAutoCompleteValue(employeeList, formInfo.employeeId);

if (employee) {
  result.push({
    label: intl.formatMessage(messages.employeeName),
    value: employee.name,
  });
}
setFilterHighlights(result);

// Pass the highlights to the PayrollTable component
<PayrollTable
  isLoading={isLoading}
  title=''
  data={tableData}
  columns={columns}
  filterHighlights={filterHighlights}
/>
```

# Reference

- [GitHub Repository](https://github.com/dynamicTech123/PayrollWebApp)
- [Enlite Theme](https://enlite-static.netlify.app/app)
- [Live Demo](http://92.205.178.113:800/)
- [Translation Sheet](https://docs.google.com/spreadsheets/d/1awXuzp98m95AK7r2OFL6sZUr7re9vSWQ4kcED7wk2bA/edit?gid=0#gid=0)
- [Notes Sheet](https://docs.google.com/spreadsheets/d/1snOtgHJi_S-vnWDtJ3j3T7np_olPVu_KikgDqAZb1m4/edit#gid=0)
