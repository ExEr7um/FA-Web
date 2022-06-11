class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: "",
      password: "",
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      email: "",
      password: "",
      loggedIn: !this.state.loggedIn,
    });
  };

  render() {
    return (
      <div className="flex flex-col p-4">
        <h1>{this.state.loggedIn ? "Logged In" : "Logged Out"}</h1>
        <form onSubmit={this.onSubmit} className="flex flex-col mt-8">
          <label htmlFor="email">Email</label>
          <input id="email" placeholder="you@example.com" type="email" onChange={this.handleChange} className=" mb-4 bg-gray-50 border-gray-200 rounded-md text-gray-900 mt-2 py-2 px-4 w-max placeholder:text-gray-400" />
          <label htmlFor="password">Пароль</label>
          <input id="password" placeholder="Не менее 8 символов" type="password" onChange={this.handleChange} className="bg-gray-50 border-gray-200 rounded-md text-gray-900 mt-2 py-2 px-4 w-max placeholder:text-gray-400" />
          <button className="w-max bg-lime-50 text-lime-900 px-4 py-2 rounded-md mt-4 hover:bg-lime-100">{this.state.loggedIn ? "Log Out" : "Log In"}</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <LoginForm />
  </div>,
  document.getElementById("app")
);
