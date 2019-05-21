import React from 'react';
import PropTypes from 'prop-types';

const MistakesBar = ({mistakes}) => {
  const mistakesList = new Array(mistakes).fill(true);
  return (
    <div className="game__mistakes">
      {mistakesList.map((it, i) => <div key={i} className="wrong"/>)}
    </div>
  );
};

export default MistakesBar;

MistakesBar.propTypes = {
  mistakes: PropTypes.number.isRequired,
};
