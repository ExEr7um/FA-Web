class TodoApp extends React.Component {
  constructor(props) {
    super();
    this.state = {
      items: [],
      term: "",
    };
  }

  handleChange = (event) => {
    this.setState({ term: event.target.value });
  };

  handleItemClick = ({ id, value, checked }) => {
    this.setState({
      items: this.state.items.map((item) => (item.id === id ? { id, value, checked: !checked } : item)),
    });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.state.term.length > 0) {
      this.setState({
        term: "",
        items: [...this.state.items, { id: new Date(), value: this.state.term, checked: false }],
      });
    }
  };

  render() {
    return (
      <div className="px-6 py-8 border-b">
        <div className="flex items-center mb-4 gap-x-2">
          <Icon title={this.props.title} />
          <h1 className="font-medium text-2xl">{this.props.title}</h1>
        </div>
        <div className="">
          <TodoList onTodoClick={this.handleItemClick} onDelete={this.handleDelete} todos={this.state.items} />
          <form onSubmit={this.onSubmit} className="flex flex-col">
            <input placeholder="Новая задача" value={this.state.term} onChange={this.handleChange} className="bg-gray-50 border-gray-200 rounded-md text-gray-900 mt-2 py-2 px-4 w-max placeholder:text-gray-400" />
            <button className="w-max bg-lime-50 text-lime-900 px-4 py-2 rounded-md mt-4 hover:bg-lime-100">Добавить</button>
          </form>
        </div>
      </div>
    );
  }
}

const Icon = (props) => {
  switch (props.title) {
    case "Личные":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    case "Работа":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "Учеба":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      );
    case "Отдых":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      );
    default:
      return <div></div>;
  }
};

class TodoList extends React.Component {
  render() {
    const { todos, onTodoClick, onDelete } = this.props;
    return (
      <ul className="list-style flex flex-col gap-y-2">
        {todos.map((item, index) => (
          <li key={index} className="flex gap-x-2 items-center">
            <input type="checkbox" checked={item.checked} onChange={() => onTodoClick(item)} className="bg-gray-50 border-gray-200 rounded-md w-5 h-5" />
            <span className={item.checked ? "text-gray-400" : "text-gray-900"}>{item.value}</span>
          </li>
        ))}
      </ul>
    );
  }
}

function checkboxStyle(checked) {
  return {
    textDecoration: checked ? "line-through" : "none",
  };
}

ReactDOM.render(
  <div>
    <TodoApp title="Личные" />
    <TodoApp title="Работа" />
    <TodoApp title="Учеба" />
    <TodoApp title="Отдых" />
  </div>,
  document.getElementById("app")
);
