import React from "react";
type ResulquizType = {
  result: number;
  onGoToQuiz: () => void;
};
export const ResultQuiz = ({ result, onGoToQuiz }: ResulquizType) => {
  return (
    <div className="container__question">
      {result < 5 ? (
        <>
          <img
            src="https://media2.giphy.com/media/IpXPcJpZZvpW5G9KH2/giphy.gif"
            alt="tente novamente"
          />
          <p>Que pena Voce acertou apenas {result} questões,tente novamente.</p>
        </>
      ) : (
        <>
          <img
            src="https://media.tenor.com/whjcR9BnKHYAAAAM/obama-birthday.gif"
            alt="parabéns"
          />
          <p>Parabéns você acertou {result} questões.</p>
        </>
      )}

      <button className="next-button" onClick={onGoToQuiz}>
        Reiniciar
      </button>
    </div>
  );
};
