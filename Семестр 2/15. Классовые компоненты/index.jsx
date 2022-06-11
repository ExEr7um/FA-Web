const { useState, useEffect } = React;

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setInterval(() => setSeconds(seconds + 1), 1000);
  });

  return <div>Seconds: {seconds}</div>;
};

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate = (date) => date.toLocaleDateString();
  render() {
    return (
      <div className="flex gap-y-4 flex-col">
        <div className="flex items-center gap-x-2">
          <img className="w-16 h-16 rounded-full object-cover" src={this.props.author.avatarUrl} alt={this.props.author.name} />
          <div className="UserInfo-name">{this.props.author.name}</div>
        </div>
        <div className="Comment-text">{this.props.text}</div>
        <div className="Comment-date">{this.formatDate(this.props.date)}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Timer />
    <Comment author={{ avatarUrl: "https://www.newshub.co.nz/home/lifestyle/2019/11/dog-years-are-a-myth-2-year-old-dogs-already-middle-aged-scientists/_jcr_content/par/video/image.dynimg.1280.q75.jpg/v1574572358818/GETTY-labrador-puppy-1120.jpg", name: "Имя" }} text="Lorem Ipsum" date={new Date()} />
  </div>,
  document.getElementById("app")
);
