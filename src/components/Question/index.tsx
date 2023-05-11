import { useEffect, useState } from "react";
import { countryType } from "../../types/question";
import { api } from "../../services/api";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ResultQuiz } from "../Result";
import "./style.scss";
import React from "react";

export const Question = () => {
  const [countries, setCountries] = useState<countryType[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [pointQuestion, setPointQuestion] = useState(0);

  const [options, setOptions] = useState<string[]>([]);
  const [answers, setAnswers] = useState("");
  const [selectedOption, setSelectedOption] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const requestCountry = async () => {
    const data = await api.getCountry();
    if (data) {
      setCountries(data);
    }
  };
  const generateQuestion = (countries: countryType[]) => {
    setDisabled(false);
    if (countries.length !== 0) {
      const index = Math.floor(Math.random() * countries.length);
      const country = countries[index];
      const question = `
       Qual a capital de ${country.name.common}?
       `;
      const answer = country.capital[0];

      const options = generateOptions(answer, countries);

      setQuestion(question);
      setAnswers(answer);
      setOptions(options.sort());
    }
  };

  const generateOptions = (answer: string, countries: countryType[]) => {
    const options: string[] = [answer];

    while (options.length < 4) {
      const index = Math.floor(Math.random() * countries.length);
      const country = countries[index];
      if (!options.includes(country.capital)) {
        options.push(country.capital);
      }
    }
    return options;
  };

  const handleQuiz = (option: string) => {
    if (answers === option) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(true);
      setShowNextButton(true);
      setDisabled(true);
    } else {
      setSelectedOption(true);
      setDisabled(true);
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    setPointQuestion(pointQuestion + 1);
    setSelectedOption(false);
    setShowNextButton(false);
    generateQuestion(countries);
  };

  const goToQuizStart = () => {
    setCurrentQuestion(0);
    setPointQuestion(0);
    setSelectedOption(false);
    setShowNextButton(false);
    requestCountry();
    generateQuestion(countries);
  };
  useEffect(() => {
    requestCountry();
    generateQuestion(countries);
  }, []);

  return (
    <div className="container__question">
      {pointQuestion <= 5 && <h2 className="question-title">{question}</h2>}
      {pointQuestion <= 5 ? (
        options.map((item, index) => (
          <div key={index}>

            <button
              disabled={disabled}
              className={`answer-option ${
                answers === item && selectedOption ? "correct" : ""
              }
            ${answers !== item && selectedOption ? "error" : ""}

              `}
              onClick={() => handleQuiz(item)}
            >
              <span className="option-text">{item}</span>

              <div className={`icon`}>
                <i>
                  {answers === item && selectedOption ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="icon-change"
                    />
                  ) : (
                    ""
                  )}
                </i>
                <i>
                  {answers !== item && selectedOption ? (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="icon-change"
                    />
                  ) : (
                    ""
                  )}
                </i>
              </div>
            </button>
          </div>
        ))
      ) : (
        <ResultQuiz result={currentQuestion} onGoToQuiz={goToQuizStart} />
      )}

      {showNextButton && (
        <button className="next-button" onClick={handleNextQuestion}>
          Next
        </button>
      )}
    </div>
  );
};
