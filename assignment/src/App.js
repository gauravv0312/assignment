import Form from "./component/form";

function App() {
  const fields = [
    {
      type: 'text',
      label: 'Hello',
      validation: 'number',
      min: 0,
      max: 100
    },
    {
      type: 'checkbox',
      mode: 'single',
      label: 'Gender'
    },
    {
      type: 'checkbox',
      mode: 'group',
      groupLabel: ['Male', 'Female'],
      label: 'Gender'
    },
    {
      type: 'select',
      options: ['Bangalore', 'Jaipur', 'Delhi'],
      label: 'City'
    }
  ];
  return (
    <div className="App">
      <Form fields={fields}/>
    </div>
  );
}

export default App;
