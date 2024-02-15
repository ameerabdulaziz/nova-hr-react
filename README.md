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
- [ ] **Notification** still not work
- [ ] Implement error handling for API responses, especially when data is not returned. For example, **login page**
- [ ] Complete the implementation of the **Calculate Attendance** page
- [ ] Integrate the **LeaveBalance** page with the API
- [ ] Integrate a cancel button into the **editable** table component
- [ ] Implement expire date for card in **personal page**
- [ ] Implement a solution to add spacing between **menu** levels in the sidebar
- [ ] Replace **Attendance** collection with new payroll table
- [ ] Find a way to include images & web.config in **build**

## Docs 📖

### PayrollTable Component

The `PayrollTable` component is a React component designed to display and manage payroll data in a tabular format. It provides features such as printing, adding, editing, and deleting rows.

#### Usage

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
      url: "/app/Pages/Recruitment/ExamplePageCreate",
    },
    edit: {
      url: "/app/Pages/Recruitment/ExamplePageEdit",
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

#### Props

| Prop Name    | Type     | Default | Description                                                                              |
| ------------ | -------- | ------- | ---------------------------------------------------------------------------------------- |
| `isLoading`  | `bool`   | `false` | A boolean flag indicating whether data is still loading.                                 |
| `showLoader` | `bool`   | `false` | A boolean flag to conditionally render a loader.                                         |
| `title`      | `string` | `''`    | A string representing the title of the table.                                            |
| `data`       | `array`  | `[]`    | An array of objects representing the data to be displayed in the table.                  |
| `columns`    | `array`  | `[]`    | An array of column configurations for the table.                                         |
| `actions`    | `object` | `null`  | An object containing configurations for actions like adding, editing, and deleting rows. |

#### Actions

In the provided `ExamplePage` example, the actions object is used to configure actions associated with the `PayrollTable`. These actions typically represent operations that can be performed on the data displayed in the table. The actions object has three properties: **add**, **edit**, and **delete**, each specifying the configuration for the corresponding action.

> If the corresponding configuration is not provided, the button icon will not be displayed

- **Add Action** (add property):
  - `url`: Specifies the URL to navigate to when the "Add" action is triggered.
- **Edit Action** (edit property):
  - `url`: Specifies the URL to navigate to when the "Edit" action is triggered.
- **Delete Action** (delete property):
  - `api`: Specifies a function that will be called when the "Delete" action is triggered.

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
