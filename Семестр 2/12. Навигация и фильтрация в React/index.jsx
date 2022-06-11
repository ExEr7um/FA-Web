const Block = ({ HeaderTag = "h2", headerText, className = "", children }) => (
  <div className={className}>
    <HeaderTag>{headerText}</HeaderTag>
    {children}
  </div>
);

const CountryFilter = ({ value, onChange, countries }) => (
  <Block headerText="Country">
    <select onChange={onChange} value={value} className="bg-gray-50 border-gray-200 rounded-md text-gray-900 mt-2">
      <option value="">-- Country --</option>
      {countries.map((n) => (
        <option key={n}>{n}</option>
      ))}
    </select>
  </Block>
);

const SizeFilter = ({ value, onChange, sizes }) => (
  <Block headerText="Size">
    <div className="flex flex-col gap-y-2 mt-2">
      {sizes.map((n) => (
        <label className="flex gap-x-2 items-center" key={n}>
          <input type="checkbox" value={n} checked={value.includes(n)} onChange={onChange} className="bg-gray-50 border-gray-200 rounded-md w-5 h-5" />
          {n}
        </label>
      ))}
    </div>
  </Block>
);

const PriceInput = ({ index, ...props }) => <input className="bg-gray-50 py-2 px-4 w-16 border-gray-200 rounded-md placeholder:text-gray-300" data-index={index} {...props} />;

const PriceFilter = ({ value, onChange }) => (
  <Block headerText="Price">
    <div className="flex gap-x-2 mt-2 items-center">
      <PriceInput value={value[0]} onChange={onChange} index="0" placeholder="min" />
      <span className="text-gray-500">—</span>
      <PriceInput value={value[1]} onChange={onChange} index="1" placeholder="max" />
      <span className="text-gray-500">₽</span>
    </div>
  </Block>
);

const GoodsList = ({ goods }) => (
  <div className="grid grid-cols-4 col-span-4 gap-x-8 gap-y-16 p-4">
    {goods.map((n) => (
      <div className="flex flex-col" key={n.id}>
        <div className="rounded-xl overflow-hidden bg-gray-50 aspect-square p-4 flex items-center justify-center mb-4 relative">
          <div className="absolute bg-lime-50 py-1 px-2 top-2 left-2 rounded-md text-sm uppercase text-lime-700">size {n.size}</div>
          <img className="h-full" src={n.image} />
        </div>
        <h3 className="text-gray-500 mb-2">{n.name}</h3>
        <p className="font-medium text-xl">{n.cost} ₽</p>
        <button data-art={n.name} className="flex items-center justify-center py-2 px-4 bg-lime-50 text-lime-900 w-max rounded-md mt-4 hover:bg-lime-100">
          Купить
        </button>
      </div>
    ))}
  </div>
);

const App = ({ goods }) => {
  const countries = React.useMemo(() => [...new Set(goods.map((n) => n.country))], [goods]);
  const sizes = React.useMemo(() => [...new Set(goods.map((n) => n.size))], [goods]);

  const [country, setCountry] = React.useState("");
  const [size, setSize] = React.useState([]);
  const [price, setPrice] = React.useState(["", ""]);

  const onCountryChange = (e) => setCountry(e.target.value);
  const onSizeChange = ({ target: { checked, value } }) => {
    setSize(!size.includes(value) && checked ? [...size, value] : size.filter((n) => n !== value));
  };
  const onPriceChange = ({
    target: {
      value,
      dataset: { index },
    },
  }) => {
    setPrice(price.map((n, i) => (i === +index ? value : n)));
  };

  const filteredGoods = goods.filter((n) => (!country || n.country === country) && (!size.length || size.includes(n.size)) && (!price[0] || price[0] <= n.cost) && (!price[1] || price[1] >= n.cost));

  return (
    <div>
      <header className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-medium">Магазин</h1>
        <input className="bg-gray-50 py-2 px-4 border-gray-200 w-[450px] rounded-md placeholder:text-gray-300" placeholder="Search" />
        <div className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </header>
      <div className="w-full h-96 bg-lime-50 p-16 flex flex-col justify-center">
        <h2 className="text-lime-800 text-5xl font-medium mb-6">Какое-то спецпредложение</h2>
        <p className="w-1/3 text-lime-800/70 leading-loose">Veritatis et rem atque. Qui qui rem quasi et voluptatem rerum modi. A rerum quia autem. Eius est voluptatem cumque quasi molestiae nesciunt.</p>
        <button className="flex items-center justify-center py-2 px-4 bg-lime-600 text-lime-50 w-max rounded-md mt-4 hover:bg-lime-700 mt-10">Открыть</button>
      </div>
      <div className="grid grid-cols-5 gap-x-8">
        <div className="flex flex-col gap-y-8 border-r border-gray-200 h-screen p-4 sticky top-0">
          <CountryFilter value={country} onChange={onCountryChange} countries={countries} />
          <SizeFilter value={size} onChange={onSizeChange} sizes={sizes} />
          <PriceFilter value={price} onChange={onPriceChange} />
        </div>
        <GoodsList goods={filteredGoods} />
      </div>
    </div>
  );
};

const DATA = [
  {
    sex: "male",
    name: "Рубашка №1",
    cost: 1000,
    country: "France",
    image: "https://purepng.com/public/uploads/large/purepng.com-pinapplepinapplepen-pinapple-apple-penfruitvegetableheathlyfoodcliparttropical-331522772242aurac.png",
    size: "S",
  },
  {
    sex: "male",
    name: "Рубашка №2",
    cost: 1200,
    country: "Turkey",
    image: "https://pngimg.com/uploads/cow/cow_PNG50553.png",
    size: "M",
  },
  {
    sex: "male",
    name: "Рубашка №3",
    cost: 1700,
    country: "China",
    image: "https://pngimg.com/uploads/artichoke/artichoke_PNG20.png",
    size: "L",
  },
  {
    sex: "male",
    name: "Рубашка №4",
    cost: 2000,
    country: "Turkey",
    image: "https://freepngimg.com/thumb/camel/4-camel-png-image.png",
    size: "XL",
  },
  {
    sex: "male",
    name: "Рубашка №5",
    cost: 2345,
    country: "Turkey",
    image: "https://pngimg.com/uploads/rose/rose_PNG66733.png",
    size: "XXL",
  },
  {
    sex: "male",
    name: "Рубашка №6",
    cost: 2355,
    country: "Turkey",
    image: "https://purepng.com/public/uploads/large/purepng.com-giraffeanimal-giraffe-981524651491cbe8h.png",
    size: "XL",
  },
  {
    sex: "male",
    name: "Рубашка №7",
    cost: 4736,
    country: "Russia",
    image: "https://pngimg.com/uploads/cat/cat_PNG50425.png",
    size: "L",
  },
  {
    sex: "male",
    name: "Рубашка №8",
    cost: 5730,
    country: "France",
    image: "https://pngimg.com/uploads/gorilla/gorilla_PNG18715.png",
    size: "S",
  },
  {
    sex: "male",
    name: "Рубашка №9",
    cost: 5623,
    country: "Turkey",
    image: "https://pngimg.com/uploads/burger_sandwich/burger_sandwich_PNG96712.png",
    size: "M",
  },
  {
    sex: "male",
    name: "Рубашка №10",
    cost: 3058,
    country: "China",
    image: "https://pngimg.com/uploads/vodka/vodka_PNG73842.png",
    size: "L",
  },
  {
    sex: "male",
    name: "Рубашка №11",
    cost: 5830,
    country: "Turkey",
    image: "https://pngimg.com/uploads/wolverine/wolverine_PNG44.png",
    size: "XL",
  },
  {
    sex: "male",
    name: "Рубашка №12",
    cost: 2540,
    country: "Turkey",
    image: "https://purepng.com/public/uploads/large/lion-fqv.png",
    size: "XXL",
  },
  {
    sex: "male",
    name: "Рубашка №13",
    cost: 2057,
    country: "Turkey",
    image: "https://www.freepngimg.com/thumb/tree/26-tree-png-image-download-picture.png",
    size: "XL",
  },
  {
    sex: "male",
    name: "Рубашка №14",
    cost: 5634,
    country: "Russia",
    image: "https://pngimg.com/uploads/dog/dog_PNG50294.png",
    size: "L",
  },
  {
    sex: "male",
    name: "Рубашка №15",
    cost: 9562,
    country: "Turkey",
    image: "https://pluspng.com/img-png/chicken-png-chicken-png-transparent-image-1890.png",
    size: "XL",
  },
  {
    sex: "male",
    name: "Рубашка №16",
    cost: 5028,
    country: "Turkey",
    image: "https://3.bp.blogspot.com/-PWc4Q-R9KFU/TzTtMQbZ2EI/AAAAAAAAIwo/s7S7NwWf6dQ/s1600/clipartmadagacar+(21).png",
    size: "XXL",
  },
  {
    sex: "male",
    name: "Рубашка №17",
    cost: 5027,
    country: "Turkey",
    image: "https://a1png.com/wp-content/uploads/2020/09/vin-diesel-3-1.png",
    size: "XL",
  },
  {
    sex: "male",
    name: "Рубашка №18",
    cost: 4860,
    country: "Russia",
    image: "https://3.bp.blogspot.com/-bD5_hjbCmPo/T-xWiq5r6EI/AAAAAAAARCc/1_UtmxQgDkg/s1600/imagens+png+shrek+(18).png",
    size: "L",
  },
  {
    sex: "male",
    name: "Рубашка №19",
    cost: 9473,
    country: "Turkey",
    image: "https://pngimg.com/uploads/cocktail/cocktail_PNG51.png",
    size: "M",
  },
  {
    sex: "male",
    name: "Рубашка №20",
    cost: 4058,
    country: "China",
    image: "http://2.bp.blogspot.com/-qgH-KoPfIIM/UBZwfPQcrsI/AAAAAAAAS6s/uGh6Y9xCKwo/s1600/27.png",
    size: "L",
  },
].map((n, i) => ({ ...n, id: i + 1 }));

ReactDOM.render(<App goods={DATA} />, document.getElementById("app"));
