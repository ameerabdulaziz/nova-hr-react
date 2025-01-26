import Loading from 'enl-components/Loading';
import React from 'react';
import loadable from '../../../../utils/loadable';

const SimpleTable = loadable(() => import('../../../Tables/BasicTable'), {
  fallback: <Loading />,
});

const AdvancedTable = loadable(() => import('../../../Tables/AdvancedTable'), {
  fallback: <Loading />,
});

const EditableCell = loadable(() => import('../../../Tables/EditableCell'), {
  fallback: <Loading />,
});

const TreeTable = loadable(() => import('../../../Tables/TreeTable'), {
  fallback: <Loading />,
});

const TablePlayground = loadable(
  () => import('../../../Tables/TablePlayground'),
  {
    fallback: <Loading />,
  }
);

// Forms
const ReduxForm = loadable(() => import('../../../Forms/ReduxForm'), {
  fallback: <Loading />,
});

const DateTimePicker = loadable(() => import('../../../Forms/DateTimePicker'), {
  fallback: <Loading />,
});

const CheckboxRadio = loadable(() => import('../../../Forms/CheckboxRadio'), {
  fallback: <Loading />,
});

const Switches = loadable(() => import('../../../Forms/Switches'), {
  fallback: <Loading />,
});

const Selectbox = loadable(() => import('../../../Forms/Selectbox'), {
  fallback: <Loading />,
});

const SliderRange = loadable(() => import('../../../Forms/SliderRange'), {
  fallback: <Loading />,
});

const Buttons = loadable(() => import('../../../Forms/Buttons'), {
  fallback: <Loading />,
});

const ToggleButton = loadable(() => import('../../../Forms/ToggleButton'), {
  fallback: <Loading />,
});

const Textbox = loadable(() => import('../../../Forms/Textbox'), {
  fallback: <Loading />,
});

const Autocomplete = loadable(() => import('../../../Forms/Autocomplete'), {
  fallback: <Loading />,
});

const TextEditor = loadable(() => import('../../../Forms/TextEditor'), {
  fallback: <Loading />,
});

const Upload = loadable(() => import('../../../Forms/Upload'), {
  fallback: <Loading />,
});

const DialButton = loadable(() => import('../../../Forms/DialButton'), {
  fallback: <Loading />,
});

const Parent = loadable(() => import('../../../Parent'), {
  fallback: <Loading />,
});

const themeComponents = {
  SimpleTable,
  AdvancedTable,
  EditableCell,
  TreeTable,
  TablePlayground,
  ReduxForm,
  DateTimePicker,
  CheckboxRadio,
  Switches,
  Selectbox,
  SliderRange,
  Buttons,
  ToggleButton,
  Textbox,
  Autocomplete,
  TextEditor,
  Upload,
  DialButton,
  Parent,
};

export default themeComponents;
