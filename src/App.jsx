import "./assets/styles/main.style/main.scss";
import { ReactComponent as RefreshIcons } from "./assets/icons/available_updates.svg";
import { ReactComponent as QuoteIcons } from "./assets/icons/quote_left.svg";
import { useState, useEffect, memo } from "react";
const ContainerTextQuote = (props) => {
  return <p className="quote-text">{props.text}</p>;
};

const fecthRandomQuote = (setQoutes) => {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      setQoutes(data);
      return data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};
const TextNameAuthor = (props) => {
  return <p className="quote-author">{props.author}</p>;
};
const ButtonRefreshQuote = ({
  currentIndex,
  totalQoutes,
  setIndexCurrentQuote,
}) => {
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  }
  function changeBackgroundColor() {
    const rootElement = document.getElementById("root");
    const linearColor = `linear-gradient(${getRandomColor()}, ${getRandomColor()})`;
    rootElement.style.background = linearColor;
  }
  const handlerChangeQoutes = (
    currentIndex,
    totalQoutes,
    setIndexCurrentQuote
  ) => {
    if (currentIndex < totalQoutes - 1) {
      setIndexCurrentQuote(currentIndex + 1);
    } else {
      setIndexCurrentQuote(0);
    }
    changeBackgroundColor();
  };
  return (
    <button
      className="btn-refresh"
      onClick={() => {
        handlerChangeQoutes(currentIndex, totalQoutes, setIndexCurrentQuote);
      }}
    >
      <RefreshIcons />
    </button>
  );
};
function App() {
  const [loading, setLoading] = useState(true);
  const [qoutes, setQoutes] = useState([]);
  const [currentQoute, setCurrentQoute] = useState({
    author: null,
    text: null,
  });
  const [indexCurrentQuote, setIndexCurrentQuote] = useState(0);

  useEffect(() => {
    fecthRandomQuote(setQoutes);
  }, []);

  useEffect(() => {
    if (qoutes.length > 0) {
      setLoading(false);
      setCurrentQoute({
        author: qoutes[indexCurrentQuote].author,
        text: qoutes[indexCurrentQuote].text,
      });
    }
  }, [qoutes, indexCurrentQuote]);

  return (
    <div className="App">
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="container__app">
          <QuoteIcons className="icons-quotes"></QuoteIcons>
          <ContainerTextQuote text={currentQoute.text} />
          <TextNameAuthor author={"- " + currentQoute.author} />
          <ButtonRefreshQuote
            currentIndex={indexCurrentQuote}
            totalQoutes={qoutes.length}
            setIndexCurrentQuote={setIndexCurrentQuote}
          />
        </div>
      )}
    </div>
  );
}

export default memo(App);
