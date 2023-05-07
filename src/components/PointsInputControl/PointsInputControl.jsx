import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './PointsInputControl.css';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { STRING_CONSTANTS } from '../../consts';
import { Chip } from '@mui/material';

export const PointsInputControlType = {
  Attribute: "Attribute",
  Skill: "Skill"
} 

const PointsInputControl = props => {
  const { name, type, value, minValue, maxValue, onChange } = props
  const [modifier, setModifier] = useState(0)
  const modifierLabel = type === PointsInputControlType.Attribute ? `${STRING_CONSTANTS.Modifier}: ${modifier}` : 
  `+${modifier} ${STRING_CONSTANTS.Modifier}` 

  const handleIncreaseValue = () => {
    if (value < maxValue) {
      const newValue = value + 1;
      onChange(newValue);
    }
  }

  const handleDecreaseValue = () => {
    if (value > minValue) {
      const newValue = value - 1;
      onChange(newValue);
    }
  }
  return (
    <div className="PointsInputControl">{name}
      <IconButton disabled={value <= minValue} size="small" color={"primary"} aria-label="remove points" component="label" onClick={handleDecreaseValue}>
        <RemoveCircleOutlineIcon />
      </IconButton>
      {value}
      <IconButton disabled={value >= maxValue} size="small" color="primary" aria-label="add points" component="label" onClick={handleIncreaseValue}>
        <AddCircleOutlineIcon />
      </IconButton>
      {modifier ? <Chip color="secondary" label={modifierLabel}/> : null}
    </div>
  )
}

PointsInputControl.defaultProps = {
  minValue: 0,
  maxValue: Infinity
}

PointsInputControl.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(PointsInputControlType)).isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func
}

export default PointsInputControl