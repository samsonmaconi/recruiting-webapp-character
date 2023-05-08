import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './PointsInputControl.css';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { ABILITY_MODIFIER_POINTS_BASE, ABILITY_MODIFIER_POINTS_COUNT, STRING_CONSTANTS } from '../../consts';
import { Chip } from '@mui/material';

export const PointsInputControlType = {
  Attribute: "Attribute",
  Skill: "Skill"
}

const PointsInputControl = props => {
  const { name, type, value, minValue, maxValue, modifierValue, onChange, onIncrease, onDecrease } = props
  const [modifier, setModifier] = useState(modifierValue)
  const isAttributeControl = type === PointsInputControlType.Attribute;
  const modifierLabel = isAttributeControl ? `${STRING_CONSTANTS.Modifier}: ${modifier}` :
    `${modifier > 0 ? "+" : ""}${modifier} ${STRING_CONSTANTS.Modifier}`

  const totalPointsValue = isAttributeControl ? value : value + modifier;

  useEffect(() => {
    updateModifier(value)
  })
  
  const handleIncreaseValue = () => {
    if (totalPointsValue < maxValue) {
      const newValue = value + 1;
      onChange(newValue);
      onIncrease && onIncrease();
      isAttributeControl && updateModifier(newValue);
    }
  }

  const handleDecreaseValue = () => {
  console.log('minValue', minValue)
  console.log('value', totalPointsValue)
    if (totalPointsValue > minValue) {
      const newValue = value - 1;
      onChange(newValue);
      onDecrease && onDecrease();
      isAttributeControl && updateModifier(newValue);
    }
  }

  const updateModifier = (value) => {
    if (isAttributeControl) {
      setModifier(Math.floor((value - ABILITY_MODIFIER_POINTS_BASE) / ABILITY_MODIFIER_POINTS_COUNT))
    } else{
      setModifier(modifierValue)
    }
  }

  return (
    <div className="PointsInputControl">{name}
      <IconButton disabled={totalPointsValue <= minValue} size="small" color={"primary"} aria-label="remove points" component="label" onClick={handleDecreaseValue}>
        <RemoveCircleOutlineIcon />
      </IconButton>
      { totalPointsValue }
      <IconButton disabled={totalPointsValue >= maxValue} size="small" color="primary" aria-label="add points" component="label" onClick={handleIncreaseValue}>
        <AddCircleOutlineIcon />
      </IconButton>
      {modifier ? <Chip color="secondary" label={modifierLabel} /> : null}
    </div>
  )
}

PointsInputControl.defaultProps = {
  modifierValue: 0,
  minValue: 0,
  maxValue: Infinity
}

PointsInputControl.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.keys(PointsInputControlType)).isRequired,
  modifierValue: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
}

export default PointsInputControl